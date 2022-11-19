import { useRef } from "react";
import { useState } from "react";
import { postAlbumFeed } from "../../../services/photoServices";
import { getDriveViewLink, getSmallPreviewUrl } from "../../../services/utils";
import LoadingWindow from "../../LoadingWindow/LoadingWindow";
import { toast, ToastContainer } from "react-toastify";
import "./AlbumUploadForm.scss";
import CategorySelector, {
  useCategory,
} from "../../CategorySelector/CategorySelector";
import { marked } from "marked";

const UPLOAD_SUCCESS_MSG = "New art has been added successfully";
const UPLOAD_FILURE_MSG = "Error in uploading new art! Please try again later";

function parseJsonData(dataArray) {
  let data = {};
  dataArray.forEach((element) => {
    try {
      mapData(element, data);
    } catch (error) {
      toast.error(`Error in parsing data file. Type: ${element.type}`);
    }
  });
  return data;
}

function mapData(element, data) {
  switch (element.type) {
    case "heading":
      data.title = element.text;
      break;

    case "paragraph":
      let text = element.text;
      if (text.startsWith("date:")) {
        let date = text.split(":")[1].trim();
        data.date = new Date(date).toISOString();
      } else {
        data.description = text;
      }

      break;

    case "space":
      break;

    case "blockquote":
      data.shortDescription = element.text;
      break;

    case "list":
      data.category = [];
      const items = element.items;
      items.forEach((item) => {
        data.category.push(item.text);
      });
      break;
    case "table":
      data.photos = [];
      const rows = element.rows;
      rows.forEach((row) => {
        const id = row[1].text;
        data.photos.push({
          thumbNailUrl: getSmallPreviewUrl(id),
          originalFileUrl: getDriveViewLink(id),
          date: data.date,
        });
      });
      break;
    default:
      break;
  }
}

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
  const { categories, selectedItems, setCategories, setSelectedItems } =
    useCategory();

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
      // setDate(Intl.DateTimeFormat("fr-CA", options).format(date));
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
      category: selectedItems,
    };

    setUploading(true);
    postAlbumFeed(uploadData)
      .then((res) => {
        e.target.reset();
        setSelectedItems([]);
        setPhotos([]);
        setUploading(false);
        toast.success(UPLOAD_SUCCESS_MSG);
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

  function parseMd(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (data) => {
      let content = data.target.result;
      let tokens = marked.lexer(content);
      console.log(tokens);
      const parsedData = parseJsonData(tokens);
      setPhotos(parsedData.photos);
      const form = document.forms["detailsForm"];

      setalbumDate(
        Intl.DateTimeFormat("fr-CA", options).format(new Date(parsedData.date))
      );
      form.elements["title"].value = parsedData.title;
      form.elements["shortDescription"].value = parsedData.shortDescription;
      form.elements["description"].value = parsedData.description;

      if (
        parsedData.category.every((element) => {
          return categories.includes(element);
        })
      ) {
        setSelectedItems(parsedData.category);
      } else {
        return toast.error("Categories are invalid");
      }

      toast.success("Successfully parsed contents");
    };

    reader.readAsBinaryString(file);
  }
  return (
    <div className="art-section">
      <div className="md-container">
        <h5>Upload MD file</h5>
        <div className="group">
          <input type="file" name="md" id="md" onChange={(e) => parseMd(e)} />
        </div>
      </div>
      <ToastContainer />
      <h5>Or manually upload data:</h5>
      <hr />
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
                  rel="noreferrer noopener"
                  referrerPolicy="no-referrer"
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
            <label htmlFor="originalFileUrl">Original File ID / URL :</label>
            <input
              name="originalFileUrl"
              id="originalFileUrl"
              type="text"
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

      <form onSubmit={handleSubmit} name="detailsForm">
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
          <label htmlFor="category"> Category : *</label>
          <CategorySelector
            categories={categories}
            selectedItems={selectedItems}
            setCategories={setCategories}
            setSelectedItems={setSelectedItems}
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
