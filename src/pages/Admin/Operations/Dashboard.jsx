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
        {type === "Album" && (
          // <div className="art-section">
          //   <h5>Add details of the album :</h5>

          //   <form onSubmit={handleSubmit}>
          //     <div className="group">
          //       <label htmlFor="title"> Title :</label>
          //       <input name="title" type="text" />
          //     </div>
          //     <div className="group">
          //       <label htmlFor="shortDescription"> Short Description :</label>
          //       <textarea name="shortDescription"></textarea>
          //     </div>
          //     <div className="group">
          //       <label htmlFor="photos"> Photos :</label>

          //       <div className="photos">
          //         {selectedPhotos > 0 ? (
          //           selectedPhotos.map((element) => (
          //             <div>
          //               <p>{element.originalFileLink}</p>
          //             </div>
          //           ))
          //         ) : (
          //           <div>
          //             <p>No photos selected</p>
          //           </div>
          //         )}
          //         <div className="photos-form">
          //           <div className="group">
          //             <label htmlFor="thumnailLink">
          //               Thumnail Link (Low Res):
          //             </label>
          //             <input name="thumnailLink" type="text" />
          //           </div>
          //           <div className="group">
          //             <label htmlFor="originalFileLink">
          //               Original File Link (High Res) :
          //             </label>
          //             <input name="originalFileLink" type="text" />
          //           </div>
          //           <div className="group">
          //             <label htmlFor="date">Date :</label>
          //             <input name="date" type="date" />
          //           </div>
          //           <div className="group">
          //             <input
          //               type="button"
          //               value="Add photo"
          //               onClick={(e) => {
          //                 console.log(e);
          //                 e.preventDefault();
          //               }}
          //             />
          //           </div>
          //         </div>
          //       </div>
          //     </div>

          //     <div className="group">
          //       <label htmlFor="description"> Description :</label>
          //       <textarea name="description"></textarea>
          //     </div>
          //     <div className="group">
          //       <input name="title" type="submit" value="Submit" />
          //     </div>
          //   </form>
          // </div>
          <AlbumUploadForm />
        )}
        {type === "" && (
          <div>
            <p>Select a type to continue</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Operations;
