import Styles from "./MessageCards.module.scss";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

export default function EmptyList() {
    return <div className={Styles.card}>
        <p>There is no data to display as of now. We will add it soon. Thanks for exploring.</p>
        <span className="emoji"><FontAwesomeIcon icon={faFaceSmile} /></span>
    </div>
}