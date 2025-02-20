import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Grid, Container, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { addIncident, updateIncident, getIncidentById, uploadIncidentPhoto } from "./IncidentService";
import { useNavigate, useParams } from "react-router-dom";
import { CameraAlt, AddPhotoAlternate } from "@mui/icons-material";

const IncidentForm = () => {
  const [incident, setIncident] = useState({
    driverName: "",
    truckId: "",
    shipmentReference: "",
    typeOfDamage: "",
    damageDescription: "",
    severity: "",
    goodsAffected: "",
    causeOfDamage: "",
    witnesses: "",
    photos: "", // Store comma-separated photos for easy display
    additionalComments: "",
  });

  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempIncident, setTempIncident] = useState(null); // Temporary storage for confirmed updates
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  
  useEffect(() => {
    if (id) {
      fetchIncidentDetails(id);
    } else {
      setLoading(false); // If no ID, we're in "add" mode, so no need to fetch data
    }
  }, [id]);

  const fetchIncidentDetails = async (incidentId) => {
    try {
      const response = await getIncidentById(incidentId);
      if (response.data) {
        setIncident(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch incident details", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle text field changes
  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  // Open confirmation dialog before updating
  const handleUpdateClick = () => {
    setTempIncident(incident); // Save current changes before confirmation
    setOpenDialog(true);
  };

  // Cancel update
  const handleCancel = () => {
    setOpenDialog(false);
    setTempIncident(null);
  };

  // Handle file upload
  // const handleFileUpload = async (e) => {
  //   const files = e.target.files;
  //   if (!files.length) return;

  //   const uploadedFiles = Array.from(files);
  //   const updatedPhotos = uploadedFiles.map((file) => file.name).join(","); // Join file names in a comma-separated list

  //   setPhotoFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); // Add new files to the state for preview

  //   try {
  //     const formData = new FormData();
  //     uploadedFiles.forEach((file) => formData.append("files", file));

  //     // If there's an existing incident ID, append it to the form data
  //     if (id) {
  //       formData.append("reportId", id);
  //     }

  //     const response = await uploadIncidentPhoto(formData, id);

  //     if (response.status === 200) {
  //       // Assuming the response contains file URLs or paths
  //       const uploadedPhotoNames = response.data.photos.join(","); // Convert to a comma-separated string

  //       setIncident((prev) => ({
  //         ...prev,
  //         photos: prev.photos ? `${prev.photos},${uploadedPhotoNames}` : uploadedPhotoNames, // Append the new photos
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Photo upload failed:", error);
  //   }
  // };

   // Handle file upload
   const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const uploadedFiles = Array.from(files);
    setPhotoFiles(uploadedFiles); // Store the files for preview

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("files", file));
      if (id) formData.append("reportId", id);

      const response = await uploadIncidentPhoto(formData, id);
      if (response.status === 200) {
        const uploadedPhotoNames = response.data.photos.join(",");
        setIncident((prev) => ({
          ...prev,
          photos: uploadedPhotoNames, // Update with uploaded photo names
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
      // Ensure photos are uploaded before submitting
      if (photoFiles.length > 0) {
        await handleFileUpload({ target: { files: photoFiles } });
      }

      const requestData = {
        ...incident,
        dateAndTime: new Date().toISOString(),
      };

      const response = id
        ? await updateIncident(id, { ...tempIncident, dateAndTime: new Date().toISOString() })
        : await addIncident({ ...incident, dateAndTime: new Date().toISOString() });

      if (response.status === 200) {
        navigate("/incidents");
      } else {
        console.error("Error submitting the incident report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return <Typography>Loading incident details...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box component="form" sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Edit Incident" : "Add Incident"}
        </Typography>
        <Grid container spacing={2}>
          {/* Form Fields */}
          {[
            { label: "Driver Name", name: "driverName" },
            { label: "Truck ID", name: "truckId" },
            { label: "Shipment Reference", name: "shipmentReference" },
            { label: "Type of Damage", name: "typeOfDamage" },
            { label: "Severity", name: "severity" },
            { label: "Goods Affected", name: "goodsAffected" },
            { label: "Cause of Damage", name: "causeOfDamage" },
            { label: "Witnesses", name: "witnesses" },
            { label: "Additional Comments", name: "additionalComments" },
          ].map(({ label, name }, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField label={label} name={name} value={incident[name]} onChange={handleChange} fullWidth variant="outlined" />
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField label="Damage Description" name="damageDescription" value={incident.damageDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
          </Grid>

          {/* Upload Photo Section */}
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: "none" }} id="upload-photo-input" />
            <label htmlFor="upload-photo-input">
              <IconButton component="span">
                <AddPhotoAlternate color="primary" fontSize="large" />
              </IconButton>
              <Typography variant="body1">Upload Photos</Typography>
            </label>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Uploaded Photos: {incident.photos || "None"}</Typography>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            {id ? (
              <Button variant="contained" color="primary" onClick={handleUpdateClick} fullWidth>
                Update Incident
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
          Are you sure you want to update this incident?
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

export default IncidentForm;
