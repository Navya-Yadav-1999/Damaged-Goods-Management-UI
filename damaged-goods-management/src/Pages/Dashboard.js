// import React from 'react';
// import MasterLayout from '../components/MasterLayout';
// import IncidentReportForm from '../components/Incidents/IncidentForm';
// import IncidentReportList from '../components/Incidents/IncidentList';
// import IncidentRoutes from '../components/Incidents/IncidentRoutes';
// import InspectionReportForm from '../components/Inspections/InspectionForm';
// import WarehouseIncidentForm from '../components/WarehouseIncidents/WarehouseIncidentForm';
// import SupplierShipmentConfirmationForm from '../components/SupplierShipments/SupplierShipmentForm';
// import ShipperSupplierClaimForm from '../components/ShipperClaims/ShipperClaimForm';
// import LoadingUnloadingIncidentForm from '../components/LoadingUnloading/LoadingUnloadingForm';
// import { Route, Routes } from 'react-router-dom'; // ✅ Removed Router

// const Dashboard = () => {
//   return (
//       <MasterLayout>
//         <Routes>
//           {/* <Route path="/incident-report" element={<IncidentReportForm />} />
//           <Route path="/incident-report-list" element={<IncidentReportList />} /> */}
//           <Route path="/incidents/*" element={<IncidentRoutes />} />
//           <Route path="/inspection-report" element={<InspectionReportForm />} />
//           <Route path="/warehouse-incident-report" element={<WarehouseIncidentForm />} />
//           <Route path="/supplier-shipment-report" element={<SupplierShipmentConfirmationForm />} />
//           <Route path="/shipper-claim-report" element={<ShipperSupplierClaimForm />} />
//           <Route path="/loading-unloading-incident-report" element={<LoadingUnloadingIncidentForm/>} />
//         </Routes>
//       </MasterLayout>
//   );
// };

// export default Dashboard;


import React from "react";
import { Container, Typography, Paper } from "@mui/material";

function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1">
          Select a report from the sidebar to view details.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Dashboard;
