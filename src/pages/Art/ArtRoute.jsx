import { Route, Routes } from "react-router";
import Art from "./Art";
import ArtDetails from "./ArtDetails/ArtDetails";

function ArtRoute() {
  return (
    <Routes>
      <Route path="/" element={<Art />} />
      <Route path="/:id" element={<ArtDetails />} />
    </Routes>
  );
}

export default ArtRoute;
