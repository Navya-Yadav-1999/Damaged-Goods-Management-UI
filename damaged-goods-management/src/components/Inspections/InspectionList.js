import React, { useState, useEffect, useRef } from "react";
import { Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add, CameraAlt, UploadFile } from "@mui/icons-material";
import { getAllInspections, deleteInspections, uploadInspectionsPhoto } from "./InspectionService";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const InspectionList = () => {
    const [inspection, setInspection] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("inspectorName");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInspection();
    }, []);

    const fetchInspection = async () => {
        const response = await getAllInspections();
        setInspection(response.data);
    };

    const handleDelete = async (id) => {
        await deleteInspections(id);
        fetchInspection();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleUploadDialog = (inspections) => {
        setSelectedInspection(inspections);
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
        formData.append("reportId", selectedInspection?.id);

        if (photoFile) {
            formData.append("file", photoFile);
        } else if (capturedPhoto) {
            const blob = await fetch(capturedPhoto).then(res => res.blob());
            formData.append("file", blob, "captured_photo.jpg");
        }

        try {
            await uploadInspectionsPhoto(formData);
            alert("Photo uploaded successfully.");
            fetchInspection();
            setOpenDialog(false);
            setPhotoFile(null);
            setCapturedPhoto(null);
        } catch (error) {
            alert("Error uploading photo.");
            console.error(error);
        }
    };

    const filteredInspections = inspection.filter((inspection) =>
        inspection.inspectorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredInspections, "data");

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
                    onClick={() => navigate("/inspections/add")}
                >
                    Add Inspection
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["claimType ", "Description ", "claimAmount ", "claimDate ", "supportingDocuments ", "AdditionalComments"].map((col) => (
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
                        {filteredInspections.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inspection) => (
                            <TableRow key={inspection.Id}>
                                <TableCell>{inspection.inspectorName}</TableCell>
                                <TableCell>{inspection.inspectionDate}</TableCell>
                                <TableCell>{inspection.location}</TableCell>
                                <TableCell>{inspection.findings}</TableCell>
                                <TableCell>{inspection.severity}</TableCell>
                                <TableCell>{inspection.actionTaken}</TableCell>
                                <TableCell>
                                    {inspection.photos ? <a href={inspection.photos} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
                                </TableCell>
                                <TableCell>{inspection.additionalComments}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/inspections/edit/${inspection.id}`)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(inspection.id)}>
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
                count={filteredInspections.length}
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

export default InspectionList;