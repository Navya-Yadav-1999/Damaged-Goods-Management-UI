import React, { useState, useEffect } from "react";
import { Typography, Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { getAllWarehouseIncident, deleteWarehouseIncident } from "./WarehouseIncidentService";
import { useNavigate } from "react-router-dom";

const WarehouseIncidentList = () => {
    const [warehouseIncident, setWarehouseIncident] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("staffName");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedWarehouseIncident, setSelectedWarehouseIncident] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWarehouseIncident();
    }, []);

    const fetchWarehouseIncident = async () => {
        try {
            const response = await getAllWarehouseIncident();
            setWarehouseIncident(response.data);
        } catch (error) {
            console.log("Error fetching warehouseIncidents:", error);
        }
    };

    const handleDelete = (warehouseIncident) => {
        setSelectedWarehouseIncident(warehouseIncident);
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

    const filteredWarehouseIncident = warehouseIncident.filter((warehouseIncident) =>
        warehouseIncident.staffName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <TextField
                    label="Search by Staff Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: "78%" }}
                    onChange={handleSearch}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => navigate("/warehouse-incident-report/add")}
                >
                    Add WarehouseIncident
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["staffName ", "shiftHours ", "incidentType ", "incidentDescription ", "Action Taken ", "Photos ", "AdditionalComments"].map((col) => (
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
                        {filteredWarehouseIncident.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((warehouseIncident) => (
                            <TableRow key={warehouseIncident.id}>
                                <TableCell>{warehouseIncident.staffName}</TableCell>
                                <TableCell>{warehouseIncident.shiftHours}</TableCell>
                                <TableCell>{warehouseIncident.incidentType}</TableCell>
                                <TableCell>{warehouseIncident.incidentDescription}</TableCell>
                                <TableCell>{warehouseIncident.actionTaken}</TableCell>
                                <TableCell>
                                    {warehouseIncident.photos ? (
                                        warehouseIncident.photos.split(",").map((photo, index) => (
                                            <a key={index} href={`${photo}`} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        ))
                                    ) : (
                                        "N/A"
                                    )}
                                </TableCell>
                                <TableCell>{warehouseIncident.additionalComments}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/warehouse-incident-report/edit/${warehouseIncident.id}`)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(warehouseIncident.id)}>
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
                count={filteredWarehouseIncident.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this incident?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Upload</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default WarehouseIncidentList;