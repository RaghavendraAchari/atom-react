import React from "react";

class PhotoFeedCard extends React.Component {
  render() {
    const feedDetails = this.props.feedDetails;

    return (
      <div className="card">
        <div className="card-text-content">
          <h4>{feedDetails.title}</h4>
          <p>{feedDetails.description}</p>
          <p>{feedDetails.date}</p>
        </div>
        <div className="card-photo-content">
          <img src="" alt="card-1" />
          <img src="" alt="card-2" />
          <img src="" alt="card-3" />
        </div>
      </div>
    );
  }
}

export default PhotoFeedCard;
