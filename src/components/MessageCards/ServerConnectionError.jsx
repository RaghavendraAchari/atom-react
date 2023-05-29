import Styles from "./MessageCards.module.scss";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMehBlank } from "@fortawesome/free-regular-svg-icons";

export default function ServerConnectionError() {
    return <div className={Styles.card}>
        <p>Can't reach out to server.</p>
        <span className="emoji"><FontAwesomeIcon icon={faFaceMehBlank} /></span>
    </div>
}