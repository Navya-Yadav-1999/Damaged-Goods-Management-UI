import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const InspectionReportForm = () => {
  const [formData, setFormData] = useState({
    inspectorName: '',
    inspectionDate: '',
    location: '',
    findings: '',
    severity: '',
    actionTaken: '',
    photos: '',
    additionalComments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/inspectionreport/submit', formData);
      alert(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Inspection Report</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Inspector Name"
              name="inspectorName"
              value={formData.inspectorName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Inspection Date"
              name="inspectionDate"
              type="date"
              value={formData.inspectionDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Findings"
              name="findings"
              value={formData.findings}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Severity</InputLabel>
              <Select
                label="Severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
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

export default InspectionReportForm;
