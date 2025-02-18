// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Grid, Typography, Container } from '@mui/material';

// const LoadingUnloadingIncidentForm = () => {
//   const [formData, setFormData] = useState({
//     driverName: '',
//     truckId: '',
//     shipmentReference: '',
//     loadingLocation: '',
//     unloadingLocation: '',
//     incidentType: '',
//     incidentDescription: '',
//     severity: '',
//     witnesses: '',
//     photos: '',
//     additionalComments: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/loadingincident/submit', formData);
//       alert(response.data);
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom>Loading/Unloading Incident Report</Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Driver Name" name="driverName" value={formData.driverName} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField label="Truck ID" name="truckId" value={formData.truckId} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField label="Shipment Reference" name="shipmentReference" value={formData.shipmentReference} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField label="Loading Location" name="loadingLocation" value={formData.loadingLocation} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField label="Unloading Location" name="unloadingLocation" value={formData.unloadingLocation} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField label="Incident Type" name="incidentType" value={formData.incidentType} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField label="Incident Description" name="incidentDescription" value={formData.incidentDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField label="Severity" name="severity" value={formData.severity} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField label="Witnesses" name="witnesses" value={formData.witnesses} onChange={handleChange} fullWidth variant="outlined" multiline rows={2} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField label="Photos (URLs or Base64)" name="photos" value={formData.photos} onChange={handleChange} fullWidth variant="outlined" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField label="Additional Comments" name="additionalComments" value={formData.additionalComments} onChange={handleChange} fullWidth variant="outlined" multiline rows={3} />
//           </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit" fullWidth>
//               Submit Report
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default LoadingUnloadingIncidentForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// const InspectionReportForm = () => {
//   const [formData, setFormData] = useState({
//     inspectorName: '',
//     inspectionDate: '',
//     location: '',
//     findings: '',
//     severity: '',
//     actionTaken: '',
//     photos: '',
//     additionalComments: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/inspectionreport/submit', formData);
//       alert(response.data);
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom>Inspection Report</Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Inspector Name"
//               name="inspectorName"
//               value={formData.inspectorName}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Inspection Date"
//               name="inspectionDate"
//               type="date"
//               value={formData.inspectionDate}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Location"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Findings"
//               name="findings"
//               value={formData.findings}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Severity</InputLabel>
//               <Select
//                 label="Severity"
//                 name="severity"
//                 value={formData.severity}
//                 onChange={handleChange}
//                 fullWidth
//               >
//                 <MenuItem value="Low">Low</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="High">High</MenuItem>
//               </Select>
//             </FormControl>
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
//               name="additionalComments"
//               value={formData.additionalComments}
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

// export default InspectionReportForm;


import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Container, Box } from "@mui/material";
import { addLoadingUnloading, updateLoadingUnloading, getLoadingUnloadingById } from "./LoadingUnloadingService";
import { useNavigate, useParams } from "react-router-dom";

const LoadingUnloadingForm = () => {
  const [loadingUnloading, setLoadingUnloading] = useState({
    driverName: "",
    truckId: "",
    shipmentReference: "",
    loadingLocation: "",
    unloadingLocation: "",
    incidentType: "",
    incidentDescription: "",    
    severity: "",    
    witnesses: "",
    photos: "",
    additionalComments: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchLoadingUnloadingDetails(id);
    }
  }, [id]);

  const fetchLoadingUnloadingDetails = async (loadingUnloadingId) => {
    try {
      const response = await getLoadingUnloadingById(loadingUnloadingId);
      setLoadingUnloading(response.data);
    } catch (error) {
      console.error("Failed to fetch loadingUnloading details", error);
    }
  };

  const handleChange = (e) => {
    setLoadingUnloading({ ...loadingUnloading, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incidentData = {
      ...loadingUnloading,
      dateAndTime: new Date().toISOString(),
    };

    try {
      const response = id ? await updateLoadingUnloading(id, incidentData) : await addLoadingUnloading(incidentData);
      if (response.status === 200) {
        navigate("/loading-unloading-incident-report");
      } else {
        console.error("Error submitting the loadingUnloading report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add LoadingUnloadingReport
        </Typography>

        <Grid container spacing={2}>
          {["driverName", "truckId", "shipmentReferenceNumber", "loadingLocation", "unloadingLocation", "incidentType", "severity", "witnesses", "photos"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={loadingUnloading[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          ))}

          {[ "incidentDescription","additionalComments"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={loadingUnloading[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={field === "damageDescription" ? 4 : 2}
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

export default LoadingUnloadingForm;
