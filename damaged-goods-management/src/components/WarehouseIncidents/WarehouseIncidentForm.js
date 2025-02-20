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


import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Grid, Container, Box,  Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { addWarehouseIncident, updateWarehouseIncident, getWarehouseIncidentById, uploadWarehouseIncidentPhoto } from "./WarehouseIncidentService";
import { useNavigate, useParams } from "react-router-dom";
import { CameraAlt, AddPhotoAlternate } from "@mui/icons-material";

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
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempWarehouseIncident, setTempWarehouseIncident] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);

  useEffect(() => {
    if(id) {
      fetchWarehouseIncidentDetails(id);
    }else{
      setLoading(false);
    }
  },[id]);

  const fetchWarehouseIncidentDetails = async (warehouseIncidentId) => {
    try {
      const response = await getWarehouseIncidentById(warehouseIncidentId);
      if(response.data){
        setWarehouseIncident(response.data);
      }      
    }catch(error){
      console.log("Failed to fetch warehouseIncident details",error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setWarehouseIncident({...warehouseIncident, [e.target.name]: e.target.value});
  };

  // Open confirmation dialog before updating
  const handleUpdateClick = () => {
    setTempWarehouseIncident(warehouseIncident); // Save current changes before confirmation
    setOpenDialog(true);
  };

  // Cancel update
  const handleCancel = () => {
    setOpenDialog(false);
    setTempWarehouseIncident(null);
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

      // If there's an existing incident ID, append it to the form data
      if (id) {
        formData.append("reportId", id);
      }

      const response = await uploadWarehouseIncidentPhoto(formData, id);

      if (response.status === 200) {
        // Assuming the response contains file URLs or paths
        const uploadedPhotoNames = response.data.photos.join(","); // Convert to a comma-separated string

        setWarehouseIncident((prev) => ({
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
        ? await updateWarehouseIncident(id, { ...tempWarehouseIncident, dateAndTime: new Date().toISOString() })
        : await addWarehouseIncident({ ...warehouseIncident, dateAndTime: new Date().toISOString() });

      if (response.status === 200) {
        navigate("/warehouse-incident-report");
      } else {
        console.error("Error submitting the warehouseIncident report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return <Typography>Loading warehouseIncident details...</Typography>;
  }


  return (
    <Container maxWidth="lg">
      <Box component="form" sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
         {id? "Edit warehouseIncident" : "Add WarehouseIncident"}
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField label="Staff Name" name="staffName" value={warehouseIncident.driverName} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Shift Hours" name="shiftHours" value={warehouseIncident.truckId} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Inciden tType" name="incidentType" value={warehouseIncident.shipmentReference} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Incident Description" name="incidentDescription" value={warehouseIncident.typeOfDamage} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Action Taken" name="actionTaken" value={warehouseIncident.damageDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Severity" name="severity" value={warehouseIncident.severity} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Photos (URLs or Base64)" name="photos" value={warehouseIncident.photos} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Comments" name="comments" value={warehouseIncident.additionalComments} onChange={handleChange} fullWidth variant="outlined" multiline rows={3} />
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

          {/* Submit Button */}
          {/* <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleConfirmUpdate} fullWidth>
              {id ? "Update Incident" : "Submit Report"}
            </Button>
          </Grid>
        </Grid> */}
          <Grid item xs={12}>
            {id ? (
              <Button variant="contained" color="primary" onClick={handleUpdateClick} fullWidth>
                Update warehouseIncident
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
          Are you sure you want to update this warehouseIncident?
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

export default WarehouseIncidentForm;