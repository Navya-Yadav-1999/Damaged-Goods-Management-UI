import React from "react";
import { Routes, Route } from "react-router-dom";
import LoadingUnloadingList from "./LoadingUnloadingList";
import LoadingUnloadingForm from "./LoadingUnloadingForm";

const LoadingUnloadingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadingUnloadingList />} /> {/* List view */}
      <Route path="/add" element={<LoadingUnloadingForm />} /> {/* Add Incident */}
      <Route path="/edit/:id" element={<LoadingUnloadingForm />} /> {/* Edit Incident */}
    </Routes>
  );
};

export default LoadingUnloadingRoutes;
