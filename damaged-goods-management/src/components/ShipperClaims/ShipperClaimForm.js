// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
// import { AttachFile } from '@mui/icons-material';

// const ShipperSupplierClaimForm = () => {
//   const [formData, setFormData] = useState({
//     claimType: '',
//     description: '',
//     claimAmount: '',
//     claimDate: '',
//     supportingDocuments: '',
//     additionalComments: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileUpload = (e) => {
//     setFormData({ ...formData, supportingDocuments: e.target.files[0].name });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/shippersupplierclaim/submit', formData);
//       alert(response.data);
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom>Shipper/Supplier Claim</Typography>

//         <Grid container spacing={2}>
//           {/* Claim Type */}
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Claim Type</InputLabel>
//               <Select
//                 label="Claim Type"
//                 name="claimType"
//                 value={formData.claimType}
//                 onChange={handleChange}
//                 fullWidth
//               >
//                 <MenuItem value="Damaged Goods">Damaged Goods</MenuItem>
//                 <MenuItem value="Late Delivery">Late Delivery</MenuItem>
//                 <MenuItem value="Incorrect Invoice">Incorrect Invoice</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Description */}
//           <Grid item xs={12}>
//             <TextField
//               label="Description of Claim"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//             />
//           </Grid>

//           {/* Claim Amount */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Claim Amount"
//               name="claimAmount"
//               type="number"
//               value={formData.claimAmount}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           {/* Claim Date */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Claim Date"
//               name="claimDate"
//               type="date"
//               value={formData.claimDate}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>

//           {/* Supporting Documents */}
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               component="label"
//               startIcon={<AttachFile />}
//               fullWidth
//             >
//               Upload Supporting Documents
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleFileUpload}
//               />
//             </Button>
//             {formData.supportingDocuments && (
//               <Typography variant="body2" color="textSecondary" mt={1}>
//                 Uploaded file: {formData.supportingDocuments}
//               </Typography>
//             )}
//           </Grid>

//           {/* Additional Comments */}
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

//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit" fullWidth>Submit Claim</Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default ShipperSupplierClaimForm;


import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Container, Box } from "@mui/material";
import { addShipperClaim, updateShipperClaim, getShipperClaimById } from "./ShipperClaimService";
import { useNavigate, useParams } from "react-router-dom";

const ShipperClaimForm = () => {
  const [shipperclaim, setShipperClaim] = useState({
    claimType: '',
    description: '',
    claimAmount: '',
    claimDate: '',
    supportingDocuments: '',
    additionalComments: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchShipperClaimDetails(id);
    }
  }, [id]);

  const fetchShipperClaimDetails = async (shipperId) => {
    try {
      const response = await getShipperClaimById(shipperId);
      setShipperClaim(response.data);
    } catch (error) {
      console.log("Failed to fetch shipperClaim details", error);
    }
  };

  const handleChange = (e) => {
    setShipperClaim({ ...shipperclaim, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shipperClaimData = {
      ...shipperclaim,
      dateAndTime: new Date().toISOString(),
    };
    try {
      const response = id ? await updateShipperClaim(id, shipperClaimData) : await addShipperClaim(shipperClaimData);
      if (response.status === 200) {
        navigate("/shipper-claim-report");
      } else {
        console.error("Error submitting the shipperClaim report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add ShipperClaim
        </Typography>
        <Grid container spacing={2}>
          {["claimType", "description", "claimAmount", "claimDate", "supportingDocuments"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={shipperclaim[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          ))}

          {["additionalComments"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={shipperclaim[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={field === "additionalComments" ? 4 : 2}
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

export default ShipperClaimForm;