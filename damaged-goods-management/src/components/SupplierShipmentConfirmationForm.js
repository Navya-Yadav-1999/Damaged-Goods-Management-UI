import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const SupplierShipmentConfirmationForm = () => {
  const [formData, setFormData] = useState({
    shipmentId: '',
    supplierName: '',
    shipmentDate: '',
    trackingNumber: '',
    shipmentStatus: '',
    additionalComments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/suppliershipmentconfirmation/confirm', formData);
      alert(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Supplier Shipment Confirmation</Typography>

        <Grid container spacing={2}>
          {/* Shipment ID */}
          <Grid item xs={12}>
            <TextField
              label="Shipment ID"
              name="shipmentId"
              value={formData.shipmentId}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Supplier Name */}
          <Grid item xs={12}>
            <TextField
              label="Supplier Name"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Shipment Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Shipment Date"
              name="shipmentDate"
              type="date"
              value={formData.shipmentDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Tracking Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tracking Number"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Shipment Status */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Shipment Status</InputLabel>
              <Select
                label="Shipment Status"
                name="shipmentStatus"
                value={formData.shipmentStatus}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="In Transit">In Transit</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Delayed">Delayed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Additional Comments */}
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

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>Confirm Shipment</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SupplierShipmentConfirmationForm;
