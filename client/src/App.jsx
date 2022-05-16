import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// - - - - - - - -
import UserPanel from "./components/admin/user/user";
import ViewUsers from "./components/admin/user/user.view";
import EditUser from "./components/admin/user/user.edit";
import AddUser from "./components/admin/user/user.add";
import UserDetails from "./components/admin/user/user.details";
// - - - - - - - -
import GpuPanel from "./components/admin/gpu/gpu";
import ViewGpu from "./components/admin/gpu/gpu.view";
import EditGpu from "./components/admin/gpu/gpu.edit";
import AddGpu from "./components/admin/gpu/gpu.add";
import GpuDetails from "./components/admin/gpu/gpu.details";
// - - - - - - - -
import CpuPanel from "./components/admin/cpu/cpu";

function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [reload, setReload] = useState(false); // to reload the component by changing the value

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
        setReload(!reload);
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
            <Route index element={<ViewGpu />} />
            <Route path="edit/:gpuId" element={<EditGpu />} />
            <Route path="add" element={<AddGpu />} />
            <Route path=":gpuId" element={<GpuDetails />} />
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
