import React from "react";
import { Routes, Route } from "react-router-dom";
import ShipperClaimList from "./ShipperClaimList";
import ShipperClaimForm from "./ShipperClaimForm";

const ShipperClaimRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShipperClaimList />} /> {/* List view */}
      <Route path="/add" element={<ShipperClaimForm />} /> {/* Add Incident */}
      <Route path="/edit/:id" element={<ShipperClaimForm />} /> {/* Edit Incident */}
    </Routes>
  );
};

export default ShipperClaimRoutes;
