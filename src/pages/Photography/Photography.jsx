import "./Photography.css";
import React from "react";
import PhotoFeedCard from "../../components/PhotoFeedCard/PhotoFeedCard";

class Photography extends React.Component {
  state = {
    feedList: [
      {
        id: "1",
        title: "Title of the card",
        description: "Description of the card",
        date: "Date",
        photos: ["link to photo", "link to photo"],
      },
      {
        id: "2",
        title: "Title of the card",
        description: "Description of the card",
        date: "Date",
        photos: ["link to photo", "link to photo"],
      },
      {
        id: "3",
        title: "Title of the card",
        description: "Description of the card",
        date: "Date",
        photos: ["link to photo", "link to photo"],
      },
      {
        id: "4",
        title: "Title of the card",
        description: "Description of the card",
        date: "Date",
        photos: ["link to photo", "link to photo"],
      },
    ],
  };

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <h3 className="title">Photography</h3>

        {this.state.feedList.map((content) => {
          return <PhotoFeedCard key={content.id} feedDetails={content} />;
        })}
      </div>
    );
  }
}

export default Photography;
