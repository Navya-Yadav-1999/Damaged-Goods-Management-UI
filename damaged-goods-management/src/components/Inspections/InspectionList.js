import React, { useState, useEffect } from "react";
import { Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { getAllInspections, deleteInspections } from "./InspectionService";
import { useNavigate } from "react-router-dom";

const InspectionList = () => {
    const [inspection, setInspection] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("inspectorName");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInspection();
    }, []);

    const fetchInspection = async () => {
        try {
            const response = await getAllInspections();
            setInspection(response.data);
        } catch (error) {
            console.error("Error fetching inspections:", error);
        }
    };

    const handleDelete = (inspection) => {
        setSelectedInspection(inspection);
        setDeleteDialogOpen(true);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const filteredInspections = inspection.filter((inspection) =>
        inspection.inspectorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <TextField
                    label="Search by Inspector Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: "84%" }}
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
                                    {inspection.photos ? (
                                        inspection.photos.split(",").map((photo, index) => (
                                            <a key={index} href={`${photo}`} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        ))
                                    ) : (
                                        "N/A"
                                    )}
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
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
          <Typography>Are you sure you want to delete this inspection?</Typography>
        </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Upload</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default InspectionList;