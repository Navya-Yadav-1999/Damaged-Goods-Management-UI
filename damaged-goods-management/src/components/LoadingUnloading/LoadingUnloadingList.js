import React, { useState, useEffect, useRef } from "react";
import {  Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add, CameraAlt, UploadFile } from "@mui/icons-material";
import { getAllLoadingUnloading, deleteLoadingUnloading, uploadLoadingUnloadingPhoto } from "./LoadingUnloadingService";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const LoadingUnloadingList = () => {
  const [loadingUnloading, setLoadingUnloading] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("driverName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLoadingUnloading, setSelectedLoadingUnloading] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoadingUnloadingReport();
  }, []);

  const fetchLoadingUnloadingReport = async () => {
    const response = await getAllLoadingUnloading();
    setLoadingUnloading(response.data);
  };

  const handleDelete = async (id) => {
    await deleteLoadingUnloading(id);
    fetchLoadingUnloadingReport(); // Refresh list
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleUploadDialog = (loadingUnloading) => {
    setSelectedLoadingUnloading(loadingUnloading);
    setOpenDialog(true);
  };

  // const handleFileChange = (e) => {
  //   setPhotoFile(e.target.files[0]);
  // };
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleCapturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
  };

  // const handleUploadPhoto = async () => {
  //   if (!photoFile && !capturedPhoto) {
  //     alert("Please select or capture a photo.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("reportId", selectedIncident.id);

  //   if (photoFile) {
  //     formData.append("file", photoFile);
  //   } else if (capturedPhoto) {
  //     const blob = await fetch(capturedPhoto).then(res => res.blob());
  //     formData.append("file", blob, "captured_photo.jpg");
  //   }

  //   await uploadIncidentPhoto(formData);
  //   fetchIncidents();
  //   setOpenDialog(false);
  // };

  const handleUploadPhoto = async () => {
    if (!photoFile && !capturedPhoto) {
      alert("Please select or capture a photo.");
      return;
    }
  
    const formData = new FormData();
    formData.append("reportId", selectedLoadingUnloading?.id);
  
    if (photoFile) {
      formData.append("file", photoFile);
    } else if (capturedPhoto) {
      const blob = await fetch(capturedPhoto).then(res => res.blob());
      formData.append("file", blob, "captured_photo.jpg");
    }
  
    try {
      await uploadLoadingUnloadingPhoto(formData);
      alert("Photo uploaded successfully.");
      fetchLoadingUnloadingReport();
      setOpenDialog(false);
      setPhotoFile(null);
      setCapturedPhoto(null);
    } catch (error) {
      alert("Error uploading photo.");
      console.error(error);
    }
  };
  

  const filteredLoadingUnloading = loadingUnloading.filter((loadingUnloading) =>
    loadingUnloading.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ padding: 2 }}>
        {/* ✅ Search Bar and Add Button in Single Row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        {/* Upload Photo */}
        <Box sx={{ flex: 1, textAlign: "center", padding: 2 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-photo"
            type="file"
            onChange={handleUploadPhoto}
          />
          <label htmlFor="upload-photo">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "100%" }}
            >
              Upload a Photo
            </Button>
          </label>
        </Box>

        {/* Take Photo */}
        <Box sx={{ flex: 1, textAlign: "center", padding: 2 }}>
          <Button
            variant="contained"
            startIcon={<CameraAltIcon />}
            onClick={handleCapturePhoto}
            sx={{ width: "100%" }}
          >
            Take a Photo
          </Button>
        </Box>
        
        <TextField
          label="Search by Driver Name"
          variant="outlined"
          size="small"
          sx={{ width: "60%" }}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate("/loading-unloading-incident-report/add")}
        >
          Add LoadingUnloading 
        </Button>
      </Box>

      {/* <TextField label="Search by Driver Name" variant="outlined" fullWidth margin="dense" onChange={handleSearch} /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["Driver Name", "Truck ID", "Shipment Reference Number", "loadingLocation", "unloadingLocation", " incidentType", "incidentDescription", "severity", "Witnesses", "Photos", "Additional Comments", "Actions"].map((col) => (
                <TableCell key={col}>
                  <TableSortLabel
                    active={orderBy === col.toLowerCase()}
                    direction={orderBy === col.toLowerCase() ? order : "asc"}
                    onClick={() => handleSort(col.toLowerCase())}
                  >
                    {col}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLoadingUnloading.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((loadingUnloading) => (
              <TableRow key={loadingUnloading.id}>
                <TableCell>{loadingUnloading.driverName}</TableCell>
                <TableCell>{loadingUnloading.truckId}</TableCell>
                <TableCell>{loadingUnloading.shipmentReferenceNumber}</TableCell>
                <TableCell>{loadingUnloading.loadingLocation}</TableCell>
                <TableCell>{loadingUnloading.unloadingLocation}</TableCell>
                <TableCell>{loadingUnloading.incidentType}</TableCell>
                <TableCell>{loadingUnloading.incidentDescription}</TableCell>
                <TableCell>{loadingUnloading.severity}</TableCell>
                <TableCell>{loadingUnloading.witnesses}</TableCell>
                <TableCell>
                  {loadingUnloading.photos ? <a href={loadingUnloading.photos} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
                </TableCell>
                <TableCell>{loadingUnloading.additionalComments}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/loading-unloading-incident-report/edit/${loadingUnloading.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(loadingUnloading.id)}>
                    <Delete />
                  </IconButton>
                  {/* <IconButton color="secondary" onClick={() => handleUploadDialog(incident)}>
                    <CameraAlt />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredLoadingUnloading.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />      
      {/* Upload Photo Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Upload or Capture Photo</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: "100%", marginTop: "10px" }} />
          <Button variant="contained" color="primary" startIcon={<CameraAlt />} onClick={handleCapturePhoto}>
            Capture Photo
          </Button>
          {capturedPhoto && <img src={capturedPhoto} alt="Captured" style={{ width: "100%", marginTop: "10px" }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUploadPhoto} variant="contained" color="primary">Upload</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LoadingUnloadingList;
