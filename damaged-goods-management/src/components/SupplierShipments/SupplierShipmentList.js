import React, { useState, useEffect } from "react";
import { Typography, Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { getAllSupplierShipment, deleteSupplierShipment, uploadSupplierShipmentPhoto } from "./SupplierShipmentService";
import { useNavigate } from "react-router-dom";

const SupplierShipmentList = () => {
    const [supplierShipment, setSupplierShipment] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("inspectorName");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedSupplierShipment, setSelectedSupplierShipment] = useState(null);   
    const navigate = useNavigate();

    useEffect(() => {
        fetchSupplierShipment();
    }, []);

    const fetchSupplierShipment = async () => {
        try{
            const response = await getAllSupplierShipment();
            setSupplierShipment(response.data);
        }catch(error){
            console.log("Error fetching supplierShipment:",error);
        }        
    };

    const handleDelete = (supplierShipment) => {
        setSelectedSupplierShipment(supplierShipment);
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

    const filteredSupplierhipment = supplierShipment.filter((supplierShipment) =>
        supplierShipment.supplierName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>                
                <TextField
                    label="Search by Inspector Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: "74%" }}
                    onChange={handleSearch}
                />
                <Button
                sx={{width:"23%"}}
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => navigate("/supplier-shipment-report/add")}
                >
                    Add SupplierShipmentConfirmation
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["shipmentId ", "supplierName ", "shipmentDate ", "trackingNumber ", "shipmentStatus ", "AdditionalComments"].map((col) => (
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
                        {filteredSupplierhipment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplierShipment) => (
                            <TableRow key={supplierShipment.shipmentId}>
                                <TableCell>{supplierShipment.supplierName}</TableCell>
                                <TableCell>{supplierShipment.shipmentDate}</TableCell>
                                <TableCell>{supplierShipment.trackingNumber}</TableCell>
                                <TableCell>{supplierShipment.shipmentStatus}</TableCell>
                                <TableCell>{supplierShipment.additionalComments}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/supplier-shipment-report/edit/${supplierShipment.id}`)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(supplierShipment.id)}>
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
        count={filteredSupplierhipment.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      /> 
       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
        <Typography>Are you sure you want to delete this warehouseIncident?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
        </Paper>
    );
};

export default SupplierShipmentList;