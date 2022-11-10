import { Route, Routes } from "react-router";
import Login from "./Login/Login";
import Operations from "./Operations/Dashboard";

function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/operations" element={<Operations />} />
    </Routes>
  );
}

export default AdminRoute;
