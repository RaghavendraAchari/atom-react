import FeedCard from "../PhotoFeedCard/FeedCard";

function ArtFeedCard(props) {
  return <FeedCard feedType="Art" feedDetails={props.feedDetails} />;
}

export default ArtFeedCard;
