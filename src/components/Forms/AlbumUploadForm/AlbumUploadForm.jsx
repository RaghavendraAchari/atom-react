import { useEffect, useRef } from "react";
import { useState } from "react";
import { postAlbumFeed } from "../../../services/photoServices";
import { updateAlbumFeed } from "../../../services/albumFeedService";
import LoadingWindow from "../../LoadingWindow/LoadingWindow";
import { toast } from "react-toastify";
import "./AlbumUploadForm.scss";
import OperationStates from "../../../store/OperationStates";
import CategoryPicker from "../../CategoryPicker/CategoryPicker";
import useSWRImmutable from 'swr/immutable';
import { getCategoryList } from "../../../services/categoryService";

const UPLOAD_SUCCESS_MSG = "New album has been added successfully";
const UPLOAD_FILURE_MSG = "Error in uploading new album! Please try again later";

function AlbumUploadForm({ state, data, onComplete }) {
  if (state === null || state === undefined)
    state = OperationStates.add;

  const [photos, setPhotos] = useState(state === OperationStates.edit && data ? data.photos : []);
  const [isUploading, setUploading] = useState(false);
  const { data: categoryList, error: categoryError, isLoading: isCategoryLoading } = useSWRImmutable('categories', getCategoryList);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const photoFormRef = useRef(null);

  // console.log({ state, data });

  function handleAddPhoto() {
    const photo = {};
    const form = photoFormRef.current;

    photo.thumbnailUrl = form['thumbNailUrl'].value;
    photo.originalFileUrl = form['originalFileUrl'].value;
    photo.midResUrl = form['midResUrl'].value;
    photo.date = form['date'].valueAsDate;

    if (
      !(photo.thumbnailUrl.startsWith("https") || photo.thumbnailUrl.startsWith("http"))
    ) {
      alert("Thumbnail link must start with either 'http://' or 'https://'");
      photoFormRef.current["thumbNailUrl"].focus();
      photoFormRef.current.scrollIntoView();
    } else {
      setPhotos((prev) => [...prev, photo]);
      photoFormRef.current.style.border = "";
      form.reset();
    }
  }

  function handleOnSave(e) {
    e.preventDefault();

    if (photos.length === 0) {
      if (photoFormRef.current) {
        photoFormRef.current.focus();
        photoFormRef.current.scrollIntoView();
        photoFormRef.current.style.border = "1px solid black";
      }
      return;
    }

    const form = e.target.form;
    const date = form['albumDate'].valueAsDate;
    const title = form["title"].value;
    const description = form["shortDescription"].value;
    const details = form["description"].value;
    const uploadData = {
      date,
      title,
      description,
      photos,
      details,
      category: selectedCategories,
      publishable: false
    };

    setUploading(true);
    postAlbumFeed(uploadData)
      .then((res) => {
        setUploading(false);
        toast.success("Data Saved Successfully");
        onComplete();
      })
      .catch((err) => {
        toast.error("Error in saving data!");
        setUploading(false);
      });
    // console.log({uploadData});
  }

  function handleOnUpdate(e) {
    e.preventDefault();

    const form = e.target.form;
    const date = form['albumDate'].valueAsDate;
    const title = form["title"].value;
    const description = form["shortDescription"].value;
    const details = form["description"].value;
    const uploadData = {
      _id: data._id,
      date,
      title,
      description,
      details,
      category: selectedCategories,
      publishable: true
    };

    setUploading(true);
    updateAlbumFeed(uploadData)
      .then((res) => {
        setUploading(false);
        toast.success("Data Updated Successfully");
        form.reset();
        onComplete();
      })
      .catch((err) => {
        toast.error("Error in Updating data!");
        setUploading(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (photos.length === 0) {
      if (photoFormRef.current) {
        photoFormRef.current.focus();
        photoFormRef.current.scrollIntoView();
        photoFormRef.current.style.border = "1px solid black";
      }
      return;
    }

    const form = e.target.form;
    const date = form['albumDate'].valueAsDate;
    const title = form["title"].value;
    const description = form["shortDescription"].value;
    const details = form["description"].value;
    const uploadData = {
      date,
      title,
      description,
      photos,
      details,
      category: selectedCategories,
      publishable: false
    };

    setUploading(true);
    postAlbumFeed(uploadData)
      .then((res) => {
        e.target.reset();
        setSelectedCategories([]);
        setPhotos([]);
        setUploading(false);
        toast.success(UPLOAD_SUCCESS_MSG);
        form.reset();
      })
      .catch((err) => {
        toast.error(UPLOAD_FILURE_MSG);
        setUploading(false);
      });
  }

  function deletePhoto(index) {
    const list = [...photos];

    list.splice(index, 1);
    setPhotos(list);
  }

  function renderPhotoForm(state, photos) {
    if (state === OperationStates.edit)
      return <>
        <div className="group">
          <label htmlFor="photos"> Photos :</label>

          <div className="photos">
            {photos.length > 0 ? (
              photos.map((element, index) => (
                <div className="photo-row" key={index}>
                  <div className="selected-photo">
                    <p className="link">
                      {index + 1 + ". "} {element.originalFileUrl}{" "}
                    </p>
                    <span onClick={() => deletePhoto(index)}>x</span>
                  </div>
                  <img
                    src={element.thumbnailUrl}
                    alt="Preview"
                    rel="noreferrer noopener"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))
            ) : (
              <div className="empty-photos">
                <p>No photos added</p>
              </div>
            )}
          </div>
        </div>
      </>;
    else
      return <>
        <h5>Add photos of the album :</h5>
        <div className="group">
          <label htmlFor="photos"> Photos :</label>

          <div className="photos">
            {photos.length > 0 ? (
              photos.map((element, index) => (
                <div className="photo-row" key={index}>
                  <div className="selected-photo">
                    <p className="link">
                      {index + 1 + ". "} {element.originalFileUrl}{" "}
                    </p>
                    <span onClick={() => deletePhoto(index)}>x</span>
                  </div>
                  <img
                    src={element.thumbnailUrl}
                    alt="Preview"
                    rel="noreferrer noopener"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))
            ) : (
              <div className="empty-photos">
                <p>No photos added</p>
              </div>
            )}
          </div>
        </div>

        <form
          ref={photoFormRef}
          style={{
            border:
              photoFormRef.current === document.activeElement
                ? "1px solid red"
                : "",
          }}
        >
          <div className="photos-form">
            <div className="group">
              <label htmlFor="thumbNailUrl">Thumnail Link (Low Res):</label>
              <input
                id="thumbNailUrl"
                name="thumbNailUrl"
                type="url"
                pattern="https?://.+"
                title="Enter a valid url"
                placeholder="Low res link (must start with https://)"
                defaultValue=""
              />
            </div>
            <div className="group">
              <label htmlFor="midResUrl">Mid Res URL :</label>
              <input
                name="midResUrl"
                id="midResUrl"
                type="url"
                placeholder="Mid Res Url"
                defaultValue=""
              />
            </div>
            <div className="group">
              <label htmlFor="originalFileUrl">Original File ID / URL :</label>
              <input
                name="originalFileUrl"
                id="originalFileUrl"
                type="url"
                placeholder="Url for the original image"
                defaultValue=""
              />
            </div>
            <div className="group">
              <label htmlFor="date">Date :</label>
              <input
                name="date"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
              />
            </div>
            <div className="group">
              <input type="button" value="Add photo" onClick={handleAddPhoto} />
            </div>
          </div>
        </form>
      </>
  }

  return (
    <div className="art-section">
      {renderPhotoForm(state, photos)}
      <h5>Add details of the album :</h5>

      <form onSubmit={handleSubmit} name="detailsForm">
        <div className="group">
          <label htmlFor="title"> Title :</label>
          <input
            name="title"
            placeholder="Title to be displayed"
            type="text"
            required
            defaultValue={state === OperationStates.edit ? data.title : null}
          />
        </div>
        <div className="group">
          <label htmlFor="albumDate">Date :</label>
          <input
            name="albumDate"
            type="date"
            defaultValue={state === OperationStates.edit ? data.date.substring(0, 10) : new Date().toISOString().substring(0, 10)}
          />
        </div>
        <div className="group">
          <label htmlFor="category"> Category : *</label>
          <CategoryPicker
            categories={categoryList.map(category => category.category)}
            preSelected={state === OperationStates.edit ? data.category : null}
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        </div>
        <div className="group">
          <label htmlFor="shortDescription"> Short Description :</label>
          <textarea
            name="shortDescription"
            placeholder="Short description of the album..."
            required
            defaultValue={state === OperationStates.edit ? data.description : null}
          ></textarea>
        </div>

        <div className="group">
          <label htmlFor="description"> Description :</label>
          <textarea
            name="description"
            placeholder="Full details about of the album..."
            required
            defaultValue={state === OperationStates.edit ? data.details : null}
          ></textarea>
        </div>
        <div className="group">
          {state === OperationStates.edit ? <input type="button" onClick={handleOnUpdate} value="Update & Save" /> : <input type="button" onClick={handleOnSave} value="Save" />}
          {state === OperationStates.add ? <input type="submit" value="Submit" /> : null}
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

export default AlbumUploadForm;
