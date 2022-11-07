import "./NotFound.scss";

function NotFound() {
  return (
    <div className="content  avoid-nav">
      <div className="notfound">
        <h2 className="title">Ooops...</h2>
        <p className="sub-title">
          The page you are looking for is not found (404)
        </p>
      </div>
    </div>
  );
}

export default NotFound;
