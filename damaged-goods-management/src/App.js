// import './App.css';
// import Dashboard from './Pages/Dashboard';
// import IncidentForm from './components/Incidents/IncidentForm';
// import IncidentList from './components/Incidents/IncidentList';
// import IncidentRoutes from './components/Incidents/IncidentRoutes';
// import InspectionForm from './components/Inspections/InspectionForm'
// import MasterLayout from './components/MasterLayout';
// import theme from './components/Theme';
// import { ThemeProvider } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         {/* <MasterLayout> */}
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/incidents" element={<IncidentRoutes />} />
//             {/* <Route path="/incident-report" element={<IncidentForm />} /> */}
//             <Route path='/inspection-report' element ={<InspectionForm/>}/>
//             {/* <Route path="/inspection-report" element={<} /> */}
//             {/* <Route path="/warehouse-incident-report" element={<WarehouseIncident />} />
//             <Route path="/supplier-shipment-report" element={<SupplierShipmentReport />} />
//             <Route path="/shipper-claim-report" element={<ShipperClaimReport />} />
//             <Route path="/loading-unloading-incident-report" element={<LoadingUnloadingIncident />} /> */}
//           </Routes>
//         {/* </MasterLayout> */}
//         {/* <Dashboard /> */}
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


import './App.css';
import Dashboard from './Pages/Dashboard';
import IncidentRoutes from './components/Incidents/IncidentRoutes';
import InspectionRoutes from './components/Inspections/InspectionRoutes';
import MasterLayout from './components/MasterLayout';
import ShipperClaimRoutes from './components/ShipperClaims/ShipperClaimRoutes';
import SupplierShipmentForm from './components/SupplierShipments/SupplierShipmentForm';
import SupplierShipmentRoutes from './components/SupplierShipments/SupplierShipmentRoutes';
import theme from './components/Theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WarehouseIncidentRoutes from './components/WarehouseIncidents/WarehouseIncidentRoutes';
import LoadingUnloadingForm from './components/LoadingUnloading/LoadingUnloadingForm';
import LoadingUnloadingRoutes from './components/LoadingUnloading/LoadingUnloadingRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MasterLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents/*" element={<IncidentRoutes />} />
            <Route path="/inspections/*" element={<InspectionRoutes/>} />
            <Route path='/shipper-claim-report/*' element={<ShipperClaimRoutes />} />
            <Route path='/supplier-shipment-report/*' element={<SupplierShipmentRoutes />} />
            <Route path='/warehouse-incident-report/*' element={<WarehouseIncidentRoutes />} />
            <Route path='/loading-unloading-incident-report/*' element={<LoadingUnloadingRoutes />}/>
          </Routes>
        </MasterLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;