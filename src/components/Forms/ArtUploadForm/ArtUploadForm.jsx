import { useRef, useState } from "react";
import { uploadNewArt, updateArt } from "../../../services/artService";
import LoadingWindow from "../../LoadingWindow/LoadingWindow";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./ArtUploadForm.scss";

const UPLOAD_SUCCESS_MSG = "New art has been added successfully";
const UPLOAD_FILURE_MSG = "Error in uploading new art! Please try again later";

export const STATES = {
  new: "NEW",
  edit: "EDIT"
}

function ArtUploadForm({state, data, onUpdate}) {
  if(state === null || state === undefined)
    state = STATES.new;

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
    const midResUrl = form["midResUrl"].value;
    const originalFileLink = form["originalFileLink"].value;
    const description = form["description"].value;
    const date = form["date"].valueAsDate;

    const data = {
      title,
      thumbnailLink,
      midResUrl,
      originalFileLink,
      description,
      date: new Date(date).toISOString(),
      publishable: true
    };
  
    setUploading(true);

    uploadNewArt(data)
      .then((res) => {
        setUploading(false);
        toast.success(UPLOAD_SUCCESS_MSG);
        form.reset();
      })
      .catch((err) => {
        setUploading(false);
        toast.error(UPLOAD_FILURE_MSG);
      });
  }

  const formEle = useRef(null);


  function handleOnSave(e){
    e.preventDefault();

    const form = formEle.current;

    const title = form["title"].value;
    const thumbnailLink = form["thumbnailLink"].value;
    const midResUrl = form["midResUrl"].value;
    const originalFileLink = form["originalFileLink"].value;
    const description = form["description"].value;
    const date = form["date"].valueAsDate;

    const data = {
      _id: (state === "edit" ? data._id : null),
      title,
      thumbnailLink,
      midResUrl,
      originalFileLink,
      description,
      date: new Date(date).toISOString(),
      publishable: false
    };
  
    setUploading(true);

    uploadNewArt(data)
      .then((res) => {
        setUploading(false);
        toast.success("Art saved successfully.");
      })
      .catch((err) => {
        setUploading(false);
        toast.error("Error in saving the content!");
      });
  }

  function handleOnUpdate(e){
    e.preventDefault();

    const form = formEle.current;

    const title = form["title"].value;
    const thumbnailLink = form["thumbnailLink"].value;
    const midResUrl = form["midResUrl"].value;
    const originalFileLink = form["originalFileLink"].value;
    const description = form["description"].value;
    const date = form["date"].valueAsDate;

    const updatedData = {
      _id: data._id,
      title,
      thumbnailLink,
      midResUrl,
      originalFileLink,
      description,
      date: new Date(date).toISOString(),
      publishable: data.publishable
    };
  
    setUploading(true);

    updateArt(updatedData)
      .then((res) => {
        setUploading(false);
        toast.success("Art updated successfully.");
        onUpdate();
      })
      .catch((err) => {
        setUploading(false);
        toast.error("Error in updating the content!");
      });
  }

  return (
    <div className="art-section">
      <h5>Add details of the art :</h5>

      <form onSubmit={handleSubmit} ref={formEle}>
        <div className="group">
          <label htmlFor="title"> Title :</label>
          <input
            name="title"
            placeholder="Title to be displayed"
            type="text"
            defaultValue = {state === STATES.edit ? data.title: ""}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="thumbnailLink"> Thumnail Link (Low Res):</label>
          <input
            name="thumbnailLink"
            placeholder="Low resolution link (must start with https://)"
            type="url"
            defaultValue={state === STATES.edit ? data.photos[0].thumbnailUrl: ""}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="midResUrl"> Mid Res Url:</label>
          <input
            name="midResUrl"
            placeholder="Midium resolution link (must start with https://)"
            type="url"
            defaultValue={state === STATES.edit ? data.photos[0].midResUrl: ""}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="originalFileLink">
            Original File Link (High Res) :
          </label>
          <input
            name="originalFileLink"
            placeholder="Original file link"
            type="url"
            defaultValue={state === STATES.edit ? data.photos[0].originalFileUrl: ""}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="description"> Description :</label>
          <textarea name="description" defaultValue={state === STATES.edit ? data.description: ""} required></textarea>
        </div>
        <div className="group">
          <label htmlFor="date">Date :</label>
          <input name="date" type="date" defaultValue={state === STATES.edit ? data.date.substring(0, 10) : new Date().toISOString().substring(0, 10)} required />
        </div>
        <div className="group">
          {state === STATES.edit ? <input type="button" onClick={handleOnUpdate} value="Update" /> :<input type="button" onClick={handleOnSave} value="Save" />}
          <input type="submit" value="Save & Publish" />
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
