import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { getAllIncidents, deleteIncident } from "./IncidentService";
import { useNavigate } from "react-router-dom";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("driverName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await getAllIncidents();
      console.log("Incidents fetched:", response.data); // Log the full incident response
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const handleDeleteConfirm = (incident) => {
    setSelectedIncident(incident);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedIncident) {
      await deleteIncident(selectedIncident.id);
      fetchIncidents(); // Refresh the incident list after deletion
      setDeleteDialogOpen(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredIncidents = incidents.filter((incident) =>
    incident.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ padding: 2 }}>
      {/* ✅ Search Bar and Add Button in Single Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
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
          onClick={() => navigate("/incidents/add")}
        >
          Add Incident
        </Button>
      </Box>
      
      {/* <TextField label="Search by Driver Name" variant="outlined" fullWidth margin="dense" onChange={handleSearch} /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Driver Name",
                "Truck ID",
                "Shipment Reference",
                "Type of Damage",
                "Severity",
                "Goods Affected",
                "Cause of Damage",
                "Witnesses",
                "Photos",
                "Additional Comments",
                "Actions",
              ].map((col) => (
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
            {filteredIncidents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.driverName}</TableCell>
                <TableCell>{incident.truckId}</TableCell>
                <TableCell>{incident.shipmentReference}</TableCell>
                <TableCell>{incident.typeOfDamage}</TableCell>
                <TableCell>{incident.severity}</TableCell>
                <TableCell>{incident.goodsAffected}</TableCell>
                <TableCell>{incident.causeOfDamage}</TableCell>
                <TableCell>{incident.witnesses}</TableCell>
                <TableCell>
                  {incident.photos ? (
                    incident.photos.split(",").map((photo, index) => (
                      <a key={index} href={`${photo}`} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    ))
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{incident.additionalComments}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/incidents/edit/${incident.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(incident)}>
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
        count={filteredIncidents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this incident?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default IncidentList;
