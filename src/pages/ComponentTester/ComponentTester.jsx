import DataNotFound from "../../components/MessageCards/DataNotFound";
import EmptyList from "../../components/MessageCards/EmptyList";
import ServerConnectionError from "../../components/MessageCards/ServerConnectionError";

import Styles from "./ComponentTester.module.scss";

export default function ComponentTester() {

    return <div className={Styles.wrapper}>
        <div className={Styles.row}>
            <DataNotFound />
        </div>
        <div className={Styles.row}>
            <EmptyList />
        </div>
        <div className={Styles.row}>
            <ServerConnectionError />
        </div>
    </div>
}