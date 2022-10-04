import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AlbumUploadForm from "../../../components/Forms/AlbumUploadForm/AlbumUploadForm";
import ArtUploadForm from "../../../components/Forms/ArtUploadForm/ArtUploadForm";
import { USER_TOKEN } from "../../../services/authService";
import "./Operations.scss";

function Operations(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem(USER_TOKEN);

  //redirect  to login if no session found
  useEffect(() => {
    if (token === null || token === undefined) {
      navigate("/admin");
    }
  });

  const [type, setType] = useState("");
  // const [selectedPhotos] = useState([]);

  function handleTypeChange(e) {
    const selected = e.target.value;
    switch (selected) {
      case "Art":
        setType(selected);
        break;
      case "Album":
        setType(selected);
        break;
      default:
        setType("");
    }
  }

  // function handleSubmit(e) {
  //   // console.log(e);
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const data = formData.entries();
  //   // for (const item of formData.values()) {
  //   //   console.log(item);
  //   // }
  //   switch (type) {
  //     case "Art":
  //       console.log(data);
  //       break;
  //     case "Album":
  //       console.log(data);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  function logout() {
    if (token !== null && token !== undefined) {
      sessionStorage.clear();
      navigate("/admin");
    }
  }

  return (
    <div id="operations-page">
      <h3>Operations</h3>
      <div className="type-select">
        <select onChange={handleTypeChange} name="type" id="type">
          <option value="Select">Select Type</option>
          <option value="Art">Art</option>
          <option value="Album">Album</option>
        </select>
      </div>

      <div className="operation-section">
        {type === "Art" && <ArtUploadForm />}
        {type === "Album" && <AlbumUploadForm />}
        {type === "" && (
          <div>
            <p>Select a type to continue</p>
          </div>
        )}
      </div>
      <div className="group">
        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Operations;
