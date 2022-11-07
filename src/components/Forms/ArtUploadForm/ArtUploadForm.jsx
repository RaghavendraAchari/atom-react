import { useState } from "react";
import { uploadNewArt } from "../../../services/artService";
import { getDriveViewLink } from "../../../services/utils";
import LoadingWindow from "../../LoadingWindow/LoadingWindow";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./ArtUploadForm.scss";

const UPLOAD_SUCCESS_MSG = "New art has been added successfully";
const UPLOAD_FILURE_MSG = "Error in uploading new art! Please try again later";

function ArtUploadForm() {
  const [isUploading, setUploading] = useState(false);
  // const options = {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // };
  // const [date] = useState(
  //   Intl.DateTimeFormat("fr-CA", options).format(Date.now())
  // );
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const title = form["title"].value;
    const thumbnailLink = form["thumbnailLink"].value;
    const originalFileLink = getDriveViewLink(form["originalFileLink"].value);
    const description = form["description"].value;
    const date = form["date"].valueAsDate;
    const data = {
      title,
      thumbnailLink,
      originalFileLink,
      description,
      date: new Date(date).toISOString(),
    };
    form.reset();
    setUploading(true);

    uploadNewArt(data)
      .then((res) => {
        setUploading(false);
        toast.success(UPLOAD_SUCCESS_MSG);
      })
      .catch((err) => {
        setUploading(false);
        toast.error(UPLOAD_FILURE_MSG);
      });
  }

  return (
    <div className="art-section">
      <ToastContainer />
      <h5>Add details of the art :</h5>

      <form onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="title"> Title :</label>
          <input
            name="title"
            placeholder="Title to be displayed"
            type="text"
            required
          />
        </div>
        <div className="group">
          <label htmlFor="thumbnailLink"> Thumnail Link (Low Res):</label>
          <input
            name="thumbnailLink"
            placeholder="Low res link (must start with https://)"
            type="url"
            required
          />
        </div>
        <div className="group">
          <label htmlFor="originalFileLink">
            Original File ID (High Res) :
          </label>
          <input
            name="originalFileLink"
            placeholder="Original file ID"
            type="text"
            required
          />
        </div>
        <div className="group">
          <label htmlFor="description"> Description :</label>
          <textarea name="description" required></textarea>
        </div>
        <div className="group">
          <label htmlFor="date">Date :</label>
          <input name="date" type="date" required />
        </div>
        <div className="group">
          <input type="submit" value="Submit" />
        </div>
      </form>
      {isUploading && (
        <div className="uploading">
          <div className="loader">
            <LoadingWindow />
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtUploadForm;
