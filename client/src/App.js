import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Regsiter from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";
import NewProjectForm from "./components/NewProjectForm";
import "./App.css";
import ProjectList from "./components/screens/ProjectList";
// import Home from './components/screens/Home'
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectDetails from "./components/screens/ProjectDetails";
import Home from "./pages/Home/Home";
import Learn from "./pages/Learn/Learn";

import UserProfilePage from "./pages/Profile/UserProfilePage";

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

        <Route
          path="/ProjectList"
          element={
            <PrivateRoute>
              <ProjectList />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProjectDetails"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/ProjectForm"
          element={
            <PrivateRoute>
              <NewProjectForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile-page"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Regsiter />} />
        <Route exact path="/learn" element={<Learn />} />
      </Routes>
    </div>
  );
}
