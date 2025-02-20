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
import { addInspections, updateInspections, getInspectionById, uploadInspectionsPhoto } from "./InspectionService";
import { useNavigate, useParams } from "react-router-dom";
import { CameraAlt, AddPhotoAlternate } from "@mui/icons-material";

const InspectionForm = () => {
  const [inspections, setInspections] = useState({
    inspectorName: "",
    inspectionDate: "",
    location: "",
    findings: "",
    severity: "",
    actionTaken: "",
    photos: "",
    additionalComments: "",
  });
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempInspection, setTempInspection] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);

  useEffect(() => {
    if(id) {
      fetchInspectionDetails(id);
    } else{
      setLoading(false);
    }
  },[id]);

  const fetchInspectionDetails = async (inspectionId) => {
    try {
      const response = await getInspectionById(inspectionId); 
      if(response.data) {
        setInspections(response.data);
      }
    }catch(error){
      console.log("Failed to fetch inspection details",error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInspections({...inspections, [e.target.name]: e.target.value});
  };

  // Open confirmation dialog before updating
  const handleUpdateClick = () => {
    setTempInspection(inspections); // Save current changes before confirmation
    setOpenDialog(true);
  };

  // Cancel update
  const handleCancel = () => {
    setOpenDialog(false);
    setTempInspection(null);
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

      const response = await uploadInspectionsPhoto(formData, id);

      if (response.status === 200) {
        // Assuming the response contains file URLs or paths
        const uploadedPhotoNames = response.data.photos.join(","); // Convert to a comma-separated string

        setInspections((prev) => ({
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
        ? await updateInspections(id, { ...tempInspection, dateAndTime: new Date().toISOString() })
        : await addInspections({ ...inspections, dateAndTime: new Date().toISOString() });

      if (response.status === 200) {
        navigate("/inspections");
      } else {
        console.error("Error submitting the inspection report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return <Typography>Loading inspection details...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box component="form" sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
        {id ? "Edit Inspection" : "Add Inspection"}
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField label="Inspector Name" name="inspectorName" value={inspections.driverName} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Inspection Date" name="inspectionDate" value={inspections.truckId} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Location" name="location" value={inspections.shipmentReference} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Findings" name="findings" value={inspections.typeOfDamage} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Severity" name="severity" value={inspections.severity} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Action Taken" name="actionTaken" value={inspections.goodsAffected} onChange={handleChange} fullWidth variant="outlined" multiline rows={2} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Photos (URLs or Base64)" name="photos" value={inspections.photos} onChange={handleChange} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Additional Comments" name="additionalComments" value={inspections.additionalComments} onChange={handleChange} fullWidth variant="outlined" multiline rows={3} />
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
            <Button variant="contained" color="primary" onClick={handleConfirmUpdate} fullWidth>
            {id ? "Update Inspection" : "Submit Report"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {id ? (
              <Button variant="contained" color="primary" onClick={handleUpdateClick} fullWidth>
                Update Inspection
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
          Are you sure you want to update this inspection?
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

export default InspectionForm;