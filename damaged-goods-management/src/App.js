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
import theme from './components/Theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MasterLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents/*" element={<IncidentRoutes />} />
            <Route path="/insepctions/*" element={<InspectionRoutes/>} />
          </Routes>
        </MasterLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;