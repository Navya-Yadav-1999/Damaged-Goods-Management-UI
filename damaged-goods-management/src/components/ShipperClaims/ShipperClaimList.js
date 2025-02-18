import React, { useState, useEffect, useRef } from "react";
import { Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add, CameraAlt, UploadFile } from "@mui/icons-material";
import { getAllShipperClaim, deleteShipperClaim, uploadInspectionsPhoto, uploadShipperClaimPhoto } from "./ShipperClaimService";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ShipperClaimList = () => {
    const [shipperClaim, setShipperClaim] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("claimType");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedShipperClaim, setSelectedShipperClaim] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchShipperClaim();
    }, []);

    const fetchShipperClaim = async () => {
        const response = await getAllShipperClaim();
        setShipperClaim(response.data);
    };

    const handleDelete = async (id) => {
        await deleteShipperClaim(id);
        fetchShipperClaim();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleUploadDialog = (shipperClaim) => {
        setSelectedShipperClaim(shipperClaim);
        setOpenDialog(true);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setPhotoFile(e.target.files[0]);
        }
    };

    const handleCapturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedPhoto(imageSrc);
    };

    const handleUploadPhoto = async () => {
        if (!photoFile && !capturedPhoto) {
            alert("Please select or capture a photo.");
            return;
        }

        const formData = new FormData();
        formData.append("reportId", selectedShipperClaim?.id);

        if (photoFile) {
            formData.append("file", photoFile);
        } else if (capturedPhoto) {
            const blob = await fetch(capturedPhoto).then(res => res.blob());
            formData.append("file", blob, "captured_photo.jpg");
        }

        try {
            await uploadShipperClaimPhoto(formData);
            alert("Photo uploaded successfully.");
            fetchShipperClaim();
            setOpenDialog(false);
            setPhotoFile(null);
            setCapturedPhoto(null);
        } catch (error) {
            alert("Error uploading photo.");
            console.error(error);
        }
    };

    const filteredShipperClaim = shipperClaim.filter((shipperClaim) =>
        shipperClaim.claimType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
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
                    label="Search by Inspector Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: "60%" }}
                    onChange={handleSearch}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => navigate("/shipper-claim-report/add")}
                >
                    Add ShipperClaim
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["ClaimType ", "description ", "ClaimAmount ", "ClaimDate ", "SupportingDocuments ","AdditionalComments"].map((col) => (
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
                        {filteredShipperClaim.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((shipperClaim) => (
                            <TableRow key={shipperClaim.id}>
                                <TableCell>{shipperClaim.claimType}</TableCell>
                                <TableCell>{shipperClaim.description}</TableCell>
                                <TableCell>{shipperClaim.claimAmount}</TableCell>
                                <TableCell>{shipperClaim.claimDate}</TableCell>
                                <TableCell>{shipperClaim.supportingDocuments}</TableCell>                                
                                <TableCell>{shipperClaim.additionalComments}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/shipper-claim-report/edit/${shipperClaim.id}`)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(shipperClaim.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredShipperClaim.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      /> 
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

export default ShipperClaimList;