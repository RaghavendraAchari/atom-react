import { Route, Routes } from "react-router";
import PhotoDetails from "./PhotoDetails/PhotoDetails";
import Photography from "./Photography";

function PhotographyRoute() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Photography />} />
        <Route path="/:id" element={<PhotoDetails />} />
      </Routes>
    </div>
  );
}

export default PhotographyRoute;
