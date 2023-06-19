import { Route, Routes } from "react-router";
import Login from "./Login/Login";
import Dashboard from "./DashBoard/Dashboard";

function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/operations" element={<Dashboard />} />
    </Routes>
  );
}

export default AdminRoute;
