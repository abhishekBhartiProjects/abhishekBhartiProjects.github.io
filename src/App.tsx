import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProvidersList from "./pages/ProvidersList";
import ProviderDetails from "./pages/ProviderDetails";
import MyRequests from "./pages/MyRequests";
import ProviderDashboard from "./pages/ProviderDashboard";
import AddReview from "./pages/AddReview";
import SetAvailability from "./pages/SetAvailability";

export default function App(){
  return (
    <>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/providers" element={<ProvidersList />} />
        <Route path="/providers/:id" element={<ProviderDetails />} />
        <Route path="/requests" element={<MyRequests />} />
        <Route path="/dashboard" element={<ProviderDashboard />} />
        <Route path="/reviews/add" element={<AddReview />} />
        <Route path="/availability/set" element={<SetAvailability />} />
      </Routes>
    </>
  );
}
