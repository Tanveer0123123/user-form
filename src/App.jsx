import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm/UserForm";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
