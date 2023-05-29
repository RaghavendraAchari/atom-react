import Styles from "./MessageCards.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh } from "@fortawesome/free-regular-svg-icons";

export default function DataNotFound() {
    return <div className={Styles.card}>
        <p>Oops something happened while fetching the data</p>
        <span className="emoji"><FontAwesomeIcon icon={faFaceMeh} /></span>
    </div>
}