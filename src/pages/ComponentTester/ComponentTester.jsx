import DataNotFound from "../../components/MessageCards/DataNotFound";
import EmptyList from "../../components/MessageCards/EmptyList";
import ServerConnectionError from "../../components/MessageCards/ServerConnectionError";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import Styles from "./ComponentTester.module.scss";
import CustomButton from "../../components/CustomButton/CustomButton";
import { toast } from "react-toastify";
import Dashboard from "../Admin/DashBoard/Dashboard";
import TextEditor from "../../components/TextEditor/TextEditor";
import ThumbnailRenderer from "../../components/ThumbnailRenderer/ThubmnailRenderer";

function onSave(){

}

export default function ComponentTester() {

    return <div className={Styles.wrapper}>
        <div className={Styles.row}>
            <ThumbnailRenderer/>
        </div>
    </div>
}

function onLoadMoreClicked(){
    toast.success("LoadMore Clicked");
}