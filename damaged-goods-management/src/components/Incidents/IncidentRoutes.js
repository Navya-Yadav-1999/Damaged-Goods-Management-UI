import React from "react";
import { Routes, Route } from "react-router-dom";
import IncidentList from "./IncidentList";
import IncidentForm from "./IncidentForm";

const IncidentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IncidentList />} /> {/* List view */}
      <Route path="/add" element={<IncidentForm />} /> {/* Add Incident */}
      <Route path="/edit/:id" element={<IncidentForm />} /> {/* Edit Incident */}
    </Routes>
  );
};

export default IncidentRoutes;
