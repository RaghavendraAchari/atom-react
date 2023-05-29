import Styles from "./MessageCards.module.scss";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

export default function CustomErrorMessage({textToDisplay}) {
    return <div className={Styles.card}>
        <p>{textToDisplay}</p>
        <span className="emoji"><FontAwesomeIcon icon={faFaceSmile} /></span>
    </div>
}