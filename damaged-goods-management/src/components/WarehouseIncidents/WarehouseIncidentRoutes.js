import React from "react";
import { Route, Routes } from "react-router-dom";
import WarehouseIncidentForm from "./WarehouseIncidentForm";
import WarehouseIncidentList from "./WarehouseIncientList";

const WarehouseIncidentRoutes =() => {
    return (
        <Routes>
            <Route path="/" element={<WarehouseIncidentList />} />
            <Route path="/add" element={<WarehouseIncidentForm />} />
            <Route path="/edit/:id" element={<WarehouseIncidentForm />} />
        </Routes>
    );
};

export default WarehouseIncidentRoutes;