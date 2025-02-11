import React from 'react';
import MasterLayout from './MasterLayout';
import IncidentReportForm from './IncidentReportForm';
import InspectionReportForm from './InspectionreportForm';
import WarehouseIncidentForm from './WarehouseIncidentForm';
import SupplierShipmentConfirmationForm from './SupplierShipmentConfirmationForm';
import ShipperSupplierClaimForm from './ShipperSupplierClaimForm';
import LoadingUnloadingIncidentForm from './LoadingUnloadingIncidentForm';
import { Route, Routes } from 'react-router-dom'; // ✅ Removed Router

const Dashboard = () => {
  return (
      <MasterLayout>
        <Routes>
          <Route path="/incident-report" element={<IncidentReportForm />} />
          <Route path="/inspection-report" element={<InspectionReportForm />} />
          <Route path="/warehouse-incident-report" element={<WarehouseIncidentForm />} />
          <Route path="/supplier-shipment-report" element={<SupplierShipmentConfirmationForm />} />
          <Route path="/shipper-claim-report" element={<ShipperSupplierClaimForm />} />
          <Route path="/loading-unloading-incident-report" element={<LoadingUnloadingIncidentForm/>} />
        </Routes>
      </MasterLayout>
  );
};

export default Dashboard;
