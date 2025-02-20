import React from "react";
import { Route, Routes } from "react-router-dom";
import SupplierShipmentForm from "./SupplierShipmentForm";
import SupplierShipmentList from "./SupplierShipmentList";

const SupplierShipmentRoutes =() => {
    return (
        <Routes>
            <Route path="/" element={<SupplierShipmentList />} />
            <Route path="/add" element={<SupplierShipmentForm />} />
            <Route path="/edit/:id" element={<SupplierShipmentForm />} />
        </Routes>
    );
};

export default SupplierShipmentRoutes;