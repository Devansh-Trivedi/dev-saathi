
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Regsiter from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";
import Home from "./pages/Home/Home";

function App() {
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
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Regsiter />} />
      </Routes>
    </div>
  );
}

export default App;
