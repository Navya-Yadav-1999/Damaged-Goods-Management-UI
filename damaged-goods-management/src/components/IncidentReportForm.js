import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography, Container } from '@mui/material';

const IncidentReportForm = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    truckId: '',
    shipmentReference: '',
    typeOfDamage: '',
    damageDescription: '',
    severity: '',
    goodsAffected: '',
    causeOfDamage: '',
    witnesses: '',
    photos: '',
    additionalComments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/incidentreport/submit', formData);
      alert(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Incident Report</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Driver Name"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Truck ID"
              name="truckId"
              value={formData.truckId}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Shipment Reference"
              name="shipmentReference"
              value={formData.shipmentReference}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Type of Damage"
              name="typeOfDamage"
              value={formData.typeOfDamage}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Damage Description"
              name="damageDescription"
              value={formData.damageDescription}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Goods Affected"
              name="goodsAffected"
              value={formData.goodsAffected}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Cause of Damage"
              name="causeOfDamage"
              value={formData.causeOfDamage}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Witnesses"
              name="witnesses"
              value={formData.witnesses}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
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
              name="additionalComments"
              value={formData.additionalComments}
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

export default IncidentReportForm;
