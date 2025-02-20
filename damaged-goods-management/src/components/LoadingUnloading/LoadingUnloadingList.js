import React, { useState, useEffect, useRef } from "react";
import { Typography, Table, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { getAllLoadingUnloading, deleteLoadingUnloading } from "./LoadingUnloadingService";
import { useNavigate } from "react-router-dom";

const LoadingUnloadingList = () => {
  const [loadingUnloading, setLoadingUnloading] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("driverName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLoadingUnloading, setSelectedLoadingUnloading] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoadingUnloadingReport();
  }, []);

  const fetchLoadingUnloadingReport = async () => {
    try{
      const response = await getAllLoadingUnloading();
      setLoadingUnloading(response.data);
    }catch(error){
      console.log("Error fetching loadingUnloadingReport:",error);
    }   
  };

  const handleDelete = (loadingUnloading) => {
   setSelectedLoadingUnloading(loadingUnloading);
   setDeleteDialogOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredLoadingUnloading = loadingUnloading.filter((loadingUnloading) =>
    loadingUnloading.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ padding: 2 }}>
        {/* ✅ Search Bar and Add Button in Single Row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>             
        <TextField
          label="Search by Driver Name"
          variant="outlined"
          size="small"
          sx={{ width: "79%" }}
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
                  {loadingUnloading.photos ? (
                    loadingUnloading.photos.split(",").map((photo, index) => (
                      <a key={index} href={`${photo}`} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    ))
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{loadingUnloading.additionalComments}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/loading-unloading-incident-report/edit/${loadingUnloading.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(loadingUnloading)}>
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
        count={filteredLoadingUnloading.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />      
      {/* Upload Photo Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this loadingUnloadingReport?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LoadingUnloadingList;
