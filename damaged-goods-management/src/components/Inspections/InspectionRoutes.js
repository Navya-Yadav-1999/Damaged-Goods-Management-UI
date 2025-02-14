import React from "react";
import { Route, Routes } from "react-router-dom";
import InspectionList from './InspectionList';
import InspectionForm from './InspectionForm';

const InspectionRoutes =() => {
    return (
        <Routes>
            <Route path="/" element={<InspectionList />} />
            <Route path="/add" element={<InspectionForm />} />
            <Route path="/edit/:id" element={<InspectionForm />} />
        </Routes>
    );
};

export default InspectionRoutes;