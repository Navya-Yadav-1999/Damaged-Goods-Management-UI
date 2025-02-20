import React, { useState, useEffect, useRef } from "react";
import { Typography, Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add, CameraAlt, UploadFile } from "@mui/icons-material";
import { getAllShipperClaim, deleteShipperClaim, uploadInspectionsPhoto, uploadShipperClaimPhoto } from "./ShipperClaimService";
import { useNavigate } from "react-router-dom";

const ShipperClaimList = () => {
    const [shipperClaim, setShipperClaim] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("claimType");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedShipperClaim, setSelectedShipperClaim] = useState(null);    
    const navigate = useNavigate();

    useEffect(() => {
        fetchShipperClaim();
    }, []);

    const fetchShipperClaim = async () => {
        try{
            const response = await getAllShipperClaim();
            setShipperClaim(response.data);
        }catch(error){
            console.log("Error fetching shipperClaim:",error);
        }       
    };

    const handleDelete = (shipperClaim) => {
       setSelectedShipperClaim(shipperClaim);
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

    const filteredShipperClaim = shipperClaim.filter((shipperClaim) =>
        shipperClaim.claimType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>                
                <TextField
                    label="Search by Inspector Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: "82%" }}
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
       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
        <Typography>Are you sure you want to delete this shipperClaim?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
        </Paper>
    );
};

export default ShipperClaimList;