// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Grid, Typography, Container } from '@mui/material';

// const WarehouseIncidentForm = () => {
//   const [formData, setFormData] = useState({
//     staffName: '',
//     shiftHours: '',
//     incidentType: '',
//     incidentDescription: '',
//     actionTaken: '',
//     photos: '',
//     comments: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/warehouseincident/submit', formData);
//       alert(response.data);
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom>Warehouse Incident Report</Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Staff Name"
//               name="staffName"
//               value={formData.staffName}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Shift Hours"
//               name="shiftHours"
//               value={formData.shiftHours}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Incident Type"
//               name="incidentType"
//               value={formData.incidentType}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Incident Description"
//               name="incidentDescription"
//               value={formData.incidentDescription}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Action Taken"
//               name="actionTaken"
//               value={formData.actionTaken}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={3}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Photos (URLs or Base64)"
//               name="photos"
//               value={formData.photos}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Additional Comments"
//               name="comments"
//               value={formData.comments}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={3}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit" fullWidth>Submit Report</Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default WarehouseIncidentForm;


import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Container, Box } from "@mui/material";
import { addWarehouseIncident, updateWarehouseIncident, getWarehouseIncidentById } from "./WarehouseIncidentService";
import { useNavigate, useParams } from "react-router-dom";

const WarehouseIncidentForm = () => {
  const [warehouseIncident, setWarehouseIncident] = useState({
    staffName: '',
    shiftHours: '',
    incidentType: '',
    incidentDescription: '',
    actionTaken: '',
    photos: '',
    comments: '',
  });
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      fetchWarehouseIncidentDetails(id);
    }
  },[id]);

  const fetchWarehouseIncidentDetails = async (warehouseIncidentId) => {
    try {
      const response = await getWarehouseIncidentById(warehouseIncidentId);
      setWarehouseIncident(response.data);
    }catch(error){
      console.log("Failed to fetch warehouseIncident details",error);
    }
  };

  const handleChange = (e) => {
    setWarehouseIncident({...warehouseIncident, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const warehouseIncidentData = {
      ...warehouseIncident,
      dateAndTime: new Date().toISOString(),
    };
    try {
      const response = id ? await updateWarehouseIncident(id, warehouseIncidentData) : await addWarehouseIncident(warehouseIncidentData);
      if (response.status === 200) {
        navigate("/warehouse-incident-report");
      } else {
        console.error("Error submitting the warehouseIncident report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add WarehouseIncident
        </Typography>
        <Grid container spacing={2}>
          {["staffName", "shiftHours", "incidentType", "incidentDescription", "actionTaken", "photos"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={warehouseIncident[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          ))}

          {["comments"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={warehouseIncident[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={field === "comments" ? 4 : 2}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Report
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WarehouseIncidentForm;