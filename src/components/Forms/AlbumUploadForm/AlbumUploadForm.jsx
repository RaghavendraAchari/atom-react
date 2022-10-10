import { useRef } from "react";
import { useState } from "react";
import { postAlbumFeed } from "../../../services/photoServices";
import { getDriveViewLink } from "../../../services/utils";
import LoadingWindow from "../../LoadingWindow/LoadingWindow";
import "./AlbumUploadForm.scss";

function AlbumUploadForm() {
  const [photos, setPhotos] = useState([]);
  const [thumbNailUrl, setThumbnailUrl] = useState("");
  const [originalFileUrl, setOriginalFileUrl] = useState("");
  const date = new Date(Date.now());
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const [dateFormat, setDate] = useState(
    Intl.DateTimeFormat("fr-CA", options).format(date)
  );
  const [albumDate, setalbumDate] = useState(
    Intl.DateTimeFormat("fr-CA", options).format(date)
  );

  const [isUploading, setUploading] = useState(false);

  function handleAddPhoto() {
    const photo = {};
    photo["thumbNailUrl"] = thumbNailUrl;
    photo["originalFileUrl"] = getDriveViewLink(originalFileUrl);
    photo["date"] = new Date(Date.parse(dateFormat)).toISOString();

    if (
      !(thumbNailUrl.startsWith("https") || thumbNailUrl.startsWith("http"))
    ) {
      alert("Thumbnail link must start with either 'http://' or 'https://'");
      photoFormRef.current["thumbNailUrl"].focus();
      photoFormRef.current.scrollIntoView();
    } else {
      setPhotos((prev) => [...prev, photo]);
      setDate(Intl.DateTimeFormat("fr-CA", options).format(date));
      setOriginalFileUrl("");
      setThumbnailUrl("");
      photoFormRef.current.style.border = "";
    }
  }

  const photoFormRef = useRef(null);
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

    const form = new FormData(e.target);
    const date = new Date(Date.parse(albumDate)).toISOString();
    const title = form.get("title");
    const description = form.get("shortDescription");
    const details = form.get("description");
    const uploadData = {
      date,
      title,
      description,
      photos,
      details,
    };

    setUploading(true);
    postAlbumFeed(uploadData)
      .then((res) => {
        e.target.reset();
        setPhotos([]);
        setUploading(false);
      })
      .catch((err) => console.log(err));
  }

  function deletePhoto(index) {
    const list = [...photos];

    list.splice(index, 1);
    setPhotos(list);
  }
  return (
    <div className="art-section">
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
                  src={element.thumbNailUrl}
                  alt="Preview"
                  rel="noreferrer"
                />
              </div>
            ))
          ) : (
            <div>
              <p>No photos selected</p>
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
              value={thumbNailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
            />
          </div>
          <div className="group">
            <label htmlFor="originalFileUrl">
              Original File ID (High Res) :
            </label>
            <input
              name="originalFileUrl"
              id="originalFileUrl"
              type="text"
              pattern="https?://.+"
              title="Enter a valid url"
              placeholder="Original Id of the image"
              value={originalFileUrl}
              onChange={(e) => setOriginalFileUrl(e.target.value)}
            />
          </div>
          <div className="group">
            <label htmlFor="date">Date :</label>
            <input
              name="date"
              type="date"
              value={dateFormat}
              onChange={(e) =>
                setDate(
                  Intl.DateTimeFormat("fr-CA", options).format(
                    e.target.valueAsDate
                  )
                )
              }
            />
          </div>
          <div className="group">
            <input type="button" value="Add photo" onClick={handleAddPhoto} />
          </div>
        </div>
      </form>
      <h5>Add details of the album :</h5>

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
          <label htmlFor="albumDate">Date :</label>
          <input
            name="albumDate"
            type="date"
            value={albumDate}
            onChange={(e) =>
              setalbumDate(
                Intl.DateTimeFormat("fr-CA", options).format(
                  e.target.valueAsDate
                )
              )
            }
          />
        </div>
        <div className="group">
          <label htmlFor="shortDescription"> Short Description :</label>
          <textarea
            name="shortDescription"
            placeholder="Short description of the album..."
            required
          ></textarea>
        </div>

        <div className="group">
          <label htmlFor="description"> Description :</label>
          <textarea
            name="description"
            placeholder="Full details about of the album..."
            required
          ></textarea>
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

export default AlbumUploadForm;
