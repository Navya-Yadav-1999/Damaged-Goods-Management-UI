// import React, { useState, useEffect } from "react";
// import { TextField, Button, Typography, Grid, Container, Box } from "@mui/material";
// import { addIncident, updateIncident, getIncidentById } from "./IncidentService";
// import { useNavigate, useParams } from "react-router-dom";

// const IncidentForm = () => {
//   const [incident, setIncident] = useState({
//     // id: 0, // Default to 0 for new incidents
//     // dateAndTime: new Date().toISOString(), // Store as ISO string
//     driverName: '',
//     truckId: '',
//     shipmentReference: '',
//     typeOfDamage: '',
//     damageDescription: '',
//     severity: '',
//     goodsAffected: '',
//     causeOfDamage: '',
//     witnesses: '',
//     photos: '',
//     additionalComments: '',
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       fetchIncidentDetails(id);
//     }
//   }, [id]);

//   const fetchIncidentDetails = async (incidentId) => {
//     const response = await getIncidentById(incidentId);
//     setIncident(response.data);
//   };

//   const handleChange = (e) => {
//     setIncident({ ...incident, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   id ? await updateIncident(id, incident) : await addIncident(incident);
//   //   navigate("/incidents");
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const incidentData = {
//       ...incident,
//       dateAndTime: new Date().toISOString(), // Ensure correct format
//     };

//     try {
//       const response = id
//         ? await updateIncident(id, incidentData)
//         : await addIncident(incidentData);

//       if (response.status === 200) {
//         navigate("/incidents");
//       } else {
//         console.error("Error submitting the incident report");
//       }
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }
//   };

//   // return (
//   //   <Container maxWidth="lg">
//   //     <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
//   //       <Typography variant="h5" gutterBottom>Incident Report</Typography>

//   //       <Grid container spacing={2}>
//   //         <Grid item xs={12} sm={6}>
//   //           <TextField label="Driver Name" name="driverName" value={incident.driverName} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12} sm={6}>
//   //           <TextField label="Truck ID" name="truckId" value={incident.truckId} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12} sm={6}>
//   //           <TextField label="Shipment Reference" name="shipmentReference" value={incident.shipmentReference} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12} sm={6}>
//   //           <TextField label="Type of Damage" name="typeOfDamage" value={incident.typeOfDamage} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12}>
//   //           <TextField label="Damage Description" name="damageDescription" value={incident.damageDescription} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} />
//   //         </Grid>

//   //         <Grid item xs={12} sm={6}>
//   //           <TextField label="Severity" name="severity" value={incident.severity} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12} sm={6}>
//   //           <TextField label="Goods Affected" name="goodsAffected" value={incident.goodsAffected} onChange={handleChange} fullWidth variant="outlined" multiline rows={2} />
//   //         </Grid>

//   //         <Grid item xs={12}>
//   //           <TextField label="Cause of Damage" name="causeOfDamage" value={incident.causeOfDamage} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12}>
//   //           <TextField label="Witnesses" name="witnesses" value={incident.witnesses} onChange={handleChange} fullWidth variant="outlined" multiline rows={2} />
//   //         </Grid>

//   //         <Grid item xs={12}>
//   //           <TextField label="Photos (URLs or Base64)" name="photos" value={incident.photos} onChange={handleChange} fullWidth variant="outlined" />
//   //         </Grid>

//   //         <Grid item xs={12}>
//   //           <TextField label="Additional Comments" name="additionalComments" value={incident.additionalComments} onChange={handleChange} fullWidth variant="outlined" multiline rows={3} />
//   //         </Grid>

//   //         <Grid item xs={12}>
//   //           <Button variant="contained" color="primary" type="submit" fullWidth>Submit Report</Button>
//   //         </Grid>
//   //       </Grid>
//   //     </Box>
//   //   </Container>
//   // );

//   return (
//     <Container maxWidth="lg">
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           padding: 3,
//           backgroundColor: "#f9f9f9",
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Incident Report
//         </Typography>

//         <Grid container spacing={2}>
//           {/** Form Fields */}
//           {[
//             { label: "Driver Name", name: "driverName" },
//             { label: "Truck ID", name: "truckId" },
//             { label: "Shipment Reference", name: "shipmentReference" },
//             { label: "Type of Damage", name: "typeOfDamage" },
//             { label: "Damage Description", name: "damageDescription", multiline: true, rows: 4 },
//             { label: "Severity", name: "severity" },
//             { label: "Goods Affected", name: "goodsAffected", multiline: true, rows: 2 },
//             { label: "Cause of Damage", name: "causeOfDamage" },
//             { label: "Witnesses", name: "witnesses", multiline: true, rows: 2 },
//             { label: "Photos (URLs or Base64)", name: "photos" },
//             { label: "Additional Comments", name: "additionalComments", multiline: true, rows: 3 },
//           ].map(({ label, name, multiline, rows }) => (
//             <Grid item xs={12} sm={6} key={name}>
//               <TextField
//                 label={label}
//                 name={name}
//                 value={incident[name]}
//                 onChange={handleChange}
//                 fullWidth
//                 variant="outlined"
//                 multiline={multiline}
//                 rows={rows}
//               />
//             </Grid>
//           ))}

//           {/** Submit Button */}
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

// export default IncidentForm;


import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Container, Box } from "@mui/material";
import { addIncident, updateIncident, getIncidentById } from "./IncidentService";
import { useNavigate, useParams } from "react-router-dom";

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
    photos: "",
    additionalComments: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchIncidentDetails(id);
    }
  }, [id]);

  const fetchIncidentDetails = async (incidentId) => {
    try {
      const response = await getIncidentById(incidentId);
      setIncident(response.data);
    } catch (error) {
      console.error("Failed to fetch incident details", error);
    }
  };

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incidentData = {
      ...incident,
      dateAndTime: new Date().toISOString(),
    };

    try {
      const response = id ? await updateIncident(id, incidentData) : await addIncident(incidentData);
      if (response.status === 200) {
        navigate("/incidents");
      } else {
        console.error("Error submitting the incident report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Incident
        </Typography>

        <Grid container spacing={2}>
          {["driverName", "truckId", "shipmentReference", "typeOfDamage", "severity", "causeOfDamage", "witnesses", "photos"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={incident[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          ))}

          {["damageDescription", "goodsAffected", "additionalComments"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={incident[field]}
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

export default IncidentForm;
