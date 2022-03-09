
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Regsiter from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";
import './App.css';
// import ProjectList from './components/screens/ProjectList';
// import Home from './components/screens/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/Home";

export default function App() {
  return (
    
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {/* <Dashboard /> */}
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile-update"
          element={
            <PrivateRoute>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
        {/* <Route exact path="/home" element={<Login />} />
        <Route
          path="home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/projectList" element={<Login />} />
        <Route
          path="/projectList"
          element={
            <PrivateRoute>
              <ProjectList />
            </PrivateRoute>
          }
        /> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Regsiter />} />
      </Routes>
    </div>
  );
}

// function SHome() {
//   return <h2>SHome</h2>;
// }
