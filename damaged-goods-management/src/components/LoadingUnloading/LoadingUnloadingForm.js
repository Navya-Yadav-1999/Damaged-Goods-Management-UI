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


import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Grid, Container, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { addLoadingUnloading, updateLoadingUnloading, getLoadingUnloadingById, uploadLoadingUnloadingPhoto } from "./LoadingUnloadingService";
import { useNavigate, useParams } from "react-router-dom";
import { CameraAlt, AddPhotoAlternate } from "@mui/icons-material";

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
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempLoadingUnloading, setTempLoadingUnloading] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);

  useEffect(() => {
    if (id) {
      fetchLoadingUnloadingDetails(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchLoadingUnloadingDetails = async (loadingUnloadingId) => {
    try {
      const response = await getLoadingUnloadingById(loadingUnloadingId);
      if (response.data) {
        setLoadingUnloading(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch loadingUnloading details", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setLoadingUnloading({ ...loadingUnloading, [e.target.name]: e.target.value });
  };

  // Open confirmation dialog before updating
  const handleUpdateClick = () => {
    setTempLoadingUnloading(loadingUnloading); // Save current changes before confirmation
    setOpenDialog(true);
  };

  // Cancel update
  const handleCancel = () => {
    setOpenDialog(false);
    setTempLoadingUnloading(null);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const uploadedFiles = Array.from(files);
    const updatedPhotos = uploadedFiles.map((file) => file.name).join(","); // Join file names in a comma-separated list

    setPhotoFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); // Add new files to the state for preview

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("files", file));

      // If there's an existing loading ID, append it to the form data
      if (id) {
        formData.append("reportId", id);
      }

      const response = await uploadLoadingUnloadingPhoto(formData, id);

      if (response.status === 200) {
        // Assuming the response contains file URLs or paths
        const uploadedPhotoNames = response.data.photos.join(","); // Convert to a comma-separated string

        setLoadingUnloading((prev) => ({
          ...prev,
          photos: prev.photos ? `${prev.photos},${uploadedPhotoNames}` : uploadedPhotoNames, // Append the new photos
        }));
      }
    } catch (error) {
      console.error("Photo upload failed:", error);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => handleFileUpload({ target: { files: [new File([blob], "captured_image.jpg")] } }));
    }
  };

  // Confirm update and submit data
  const handleConfirmUpdate = async () => {
    setOpenDialog(false);
    try {
      const response = id
        ? await updateLoadingUnloading(id, { ...tempLoadingUnloading, dateAndTime: new Date().toISOString() })
        : await addLoadingUnloading({ ...loadingUnloading, dateAndTime: new Date().toISOString() });

      if (response.status === 200) {
        navigate("/loading-unloading-incident-report");
      } else {
        console.error("Error submitting the loadingUnloading report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return <Typography>Loading loadingUnloading details...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box component="form" sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Edit LoadingUnloadingReport" : "Add LoadingUnloadingReport"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Driver Name" name="driverName" value={loadingUnloading.driverName} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Truck ID" name="truckId" value={loadingUnloading.truckId} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Shipment Reference Number" name="shipmentReferenceNumber" value={loadingUnloading.shipmentReference} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Loading Location" name="loadingLocation" value={loadingUnloading.typeOfDamage} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Unloading Location" name="unloadingLocation" value={loadingUnloading.damageDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Incident Type" name="incidentType" value={loadingUnloading.damageDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Severity" name="severity" value={loadingUnloading.severity} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Witnesses" name="witnesses" value={loadingUnloading.witnesses} onChange={handleChange} fullWidth variant="outlined" multiline rows={2} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Photos (URLs or Base64)" name="photos" value={loadingUnloading.photos} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="incident Description" name="incidentDescription" value={loadingUnloading.damageDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Additional Comments" name="additionalComments" value={loadingUnloading.additionalComments} onChange={handleChange} fullWidth variant="outlined" multiline rows={3} />
          </Grid>


          {/* Upload Photo Section */}
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <IconButton onClick={startCamera}>
              <CameraAlt color="primary" fontSize="large" />
            </IconButton>
            <Typography variant="body1">Capture Photo</Typography>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="upload-photo-input"
            />
            <label htmlFor="upload-photo-input">
              <IconButton component="span">
                <AddPhotoAlternate color="primary" fontSize="large" />
              </IconButton>
              <Typography variant="body1">Upload Photo</Typography>
            </label>
          </Grid>

          <Grid item xs={12}>
            {id ? (
              <Button variant="contained" color="primary" onClick={handleUpdateClick} fullWidth>
                Update Report
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleConfirmUpdate} fullWidth>
                Submit Report
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          Are you sure you want to update this loadingUnloadingReport?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>          
    </Container>
  );
};

export default LoadingUnloadingForm;
