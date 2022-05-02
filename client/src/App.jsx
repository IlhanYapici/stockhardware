import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import axios from "axios";

import "./app.css";

import Navbar from "./components/navbar/navbar";
import LandingPage from "./pages/landing/landingPage";
import GpuPage from "./pages/gpu/gpuPage";
import CpuPage from "./pages/cpu/cpuPage";
import LoginPage from "./pages/login/loginPage";
import SignupPage from "./pages/signup/signupPage";
// - - - - - - - -
// Admin section
import AdminPanel from "./pages/adminPanel/adminPanel";
import UserPanel from "./components/adminPanel/userPanel/userPanel";
import ViewUsers from "./components/adminPanel/userPanel/viewUsers";
import UserDetails from "./components/adminPanel/userPanel/userDetails";
import EditUser from "./components/adminPanel/userPanel/editUser";
import AddUser from "./components/adminPanel/userPanel/addUser";
import GpuPanel from "./components/adminPanel/gpuPanel/gpuPanel";
import CpuPanel from "./components/adminPanel/cpuPanel/cpuPanel";

function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { user } = JSON.parse(localStorage.getItem("userInfo"));
      const bearer = `Bearer ${user}`;
      const url = `http://10.0.0.3:5000/users/${user}`;

      const { data } = await axios.get(url, {
        headers: { Authorization: bearer },
      });
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setIsAdmin(data.isAdmin);
    };

    if (localStorage.getItem("userInfo"))
      getUser().catch((err) => {
        localStorage.removeItem("userInfo");
        window.location.reload();
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Navbar
              links={["Home", "GPU", "CPU"]}
              isAdmin={isAdmin}
              firstname={firstname}
              lastname={lastname}
            />
          }
        />
        <Route
          path="/"
          element={
            <Navbar
              links={["Home", "GPU", "CPU"]}
              isAdmin={isAdmin}
              firstname={firstname}
              lastname={lastname}
            />
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="gpu" element={<GpuPage />} />
          <Route path="cpu" element={<CpuPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signin" element={<SignupPage />} />
        </Route>
        <Route path="admin-panel" element={<AdminPanel isAdmin={isAdmin} />}>
          <Route path="users" element={<UserPanel />}>
            <Route index element={<ViewUsers />} />
            <Route path="edit/:userId" element={<EditUser />} />
            <Route path="add" element={<AddUser />} />
            <Route path=":userId" element={<UserDetails />} />
          </Route>
          <Route path="gpus" element={<GpuPanel />}>
            <Route path="edit/:gpuId" element={<></>} />
            <Route path=":gpuId" element={<></>} />
          </Route>
          <Route path="cpus" element={<CpuPanel />}>
            <Route path="edit/:cpuId" element={<></>} />
            <Route path=":cpuId" element={<></>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
