import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography, Container } from '@mui/material';

const WarehouseIncidentForm = () => {
  const [formData, setFormData] = useState({
    staffName: '',
    shiftHours: '',
    incidentType: '',
    incidentDescription: '',
    actionTaken: '',
    photos: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/warehouseincident/submit', formData);
      alert(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Warehouse Incident Report</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Staff Name"
              name="staffName"
              value={formData.staffName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Shift Hours"
              name="shiftHours"
              value={formData.shiftHours}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Incident Type"
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Incident Description"
              name="incidentDescription"
              value={formData.incidentDescription}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Action Taken"
              name="actionTaken"
              value={formData.actionTaken}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Photos (URLs or Base64)"
              name="photos"
              value={formData.photos}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Additional Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>Submit Report</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WarehouseIncidentForm;
