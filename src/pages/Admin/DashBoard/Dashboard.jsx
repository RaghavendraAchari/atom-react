import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Styles from "./Dashboard.module.scss";
import AlbumUploadForm from "../../../components/Forms/AlbumUploadForm/AlbumUploadForm";
import adminService from "../../../services/adminService";

import { USER_TOKEN, validateUser, logout as logoutUser } from "../../../services/authService";

import useSWR from "swr";

import { toast } from "react-toastify";
import ArtView from "./Tabs/ArtTab/ArtView";
import { Provider } from "react-redux";
import adminStore from "../../../store/adminStore";
import AlbumFeedView from "./Tabs/AlbumFeedTab/AlbumFeedView";

const Tabs = {
    art: "ART",
    album: "ALBUMFEED",
    article: "ARTICLE"
}

export default function Dashboard() {
    const navigate = useNavigate();

    const types = ["Art", "Photography"]
    const [state, setState] = useState(Tabs.album);

    const operationTypes = ["ADD", "LIST", "EDIT"]
    const [operationState, setOperationstate] = useState(operationTypes[0]);

    const { data: albumResponse, error: albumError, isLoading: albumLoading } = useSWR("admin/albumfeeds", adminService.getAllAlbumFeeds);

    function logout() {
        const token = sessionStorage.getItem(USER_TOKEN);
        if (token !== null && token !== undefined) {
            logoutUser(token).then(res => {
                if (res.status === 200) {
                    toast.success("Logged out successfully");

                    sessionStorage.clear();
                    navigate("/admin");
                }
            })
                .catch(err => toast.error("Something went wrong."))
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem(USER_TOKEN);
        if (token === null || token === undefined) {
            navigate("/admin");
        } else {
            validateUser(token)
                .then((res) => {
                    if (res.status !== 200) {
                        toast.error("Not a valid user. Login Again.")
                        navigate("/admin");
                    }
                })
                .catch((err) => {
                    toast.error("Something went wrong. Try to login again.")
                    navigate("/admin")
                });
        }
    });

    return <div className={Styles.dashboard}>
        <Provider store={adminStore}>
            <div className={Styles.selectionPane}>
                <div className={`${Styles.option} ${state === Tabs.album ? Styles.selected : ""}`}
                    onClick={() => setState(Tabs.album)} >
                    Album
                </div>
                <div className={`${Styles.option} ${state === Tabs.art ? Styles.selected : ""}`}
                    onClick={() => setState(Tabs.art)} >
                    Art
                </div>
            </div>

            <div className={Styles.operationPane}>
                {state === Tabs.art &&
                    <ArtView />
                }

                {state === Tabs.album &&
                    <AlbumFeedView />
                }

            </div>
            <div className={`group ${Styles.group}`}>
                <button className="button" onClick={logout}>Log out</button>
            </div>
        </Provider>

    </div>
}