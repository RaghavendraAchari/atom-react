import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AlbumUploadForm from "../../../components/Forms/AlbumUploadForm/AlbumUploadForm";
import ArtUploadForm from "../../../components/Forms/ArtUploadForm/ArtUploadForm";
import { USER_TOKEN, validateUser, logout as logoutUser } from "../../../services/authService";
import "./Operations.scss";

import { toast } from "react-toastify";

function Operations(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem(USER_TOKEN);

  //redirect  to login if no session found
  useEffect(() => {
    if (token === null || token === undefined) {
      navigate("/admin");
    }else{
      validateUser(token)
        .then((res)=>{
          if(res.status !== 200){
            toast.error("Not a valid user. Login Again.")
            navigate("/admin");
          }
        })
        .catch((err)=> {
          toast.error("Something went wrong. Try to login again.") 
          navigate("/admin")
        });
    }
  });

  const [type, setType] = useState("");

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


  function logout() {
    if (token !== null && token !== undefined) {
      logoutUser(token).then(res => {
        if(res.status === 200){
          toast.success("Logged out successfully");

          sessionStorage.clear();
          navigate("/admin");
        }
      })
      .catch( err => toast.error("Something went wrong."))
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
            <p style={{ textAlign: "center" }}>Select a type to continue</p>
          </div>
        )}
      </div>
      <div className="group">
        <button
          className="button"
          style={{ margin: "8px auto 0 auto", borderRadius: "5px" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Operations;
