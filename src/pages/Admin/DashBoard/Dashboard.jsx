import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Styles from "./Dashboard.module.scss";
import AlbumUploadForm from "../../../components/Forms/AlbumUploadForm/AlbumUploadForm";
import ArtUploadForm, {STATES} from "../../../components/Forms/ArtUploadForm/ArtUploadForm";
import adminService from "../../../services/adminService";

import { USER_TOKEN, validateUser, logout as logoutUser } from "../../../services/authService";

import useSWR from "swr";

import { deleteArt } from "../../../services/artService";
import { toast } from "react-toastify";

export default function Dashboard(){
    const navigate = useNavigate();

    const types = ["Art", "Photography"]
    const [state, setState] = useState(types[0]);

    const [selectedArtItem, setSelectedArtItem] = useState(null);

    const operationTypes = ["ADD", "LIST", "EDIT"]
    const [operationState, setOperationstate] = useState(operationTypes[0]);

    const { data: artsResponse , error:artError , isLoading: artLoading, mutate: refetchArts} = useSWR("admin/arts", adminService.getAllArts);
    const { data: albumResponse , error: albumError , isLoading: albumLoading} = useSWR("admin/albumfeeds", adminService.getAllAlbumFeeds);

    function onArtEditClick(e, art){
        e.preventDefault();

        setSelectedArtItem(art);
        setOperationstate(operationTypes[2]);
    }

    function onArtDeleteClick(e, art){
        e.preventDefault();

        deleteArt(art._id).then(res => {
            if(res.status === 200){
                refetchArts();
                toast.success("Successfully deleted the art");
            }else{
                toast.error("Erro in deleting the art");
            }
        }).catch(err => toast.error("Erro in deleting the art"));
    }

    function logout() {
        const token = sessionStorage.getItem(USER_TOKEN);
        if (token !== null && token !== undefined) {
            logoutUser(token).then(res => {
            if(res.status === 200){
                toast.success("Logged out successfully");

                sessionStorage.clear();
                navigate("/admin");
            }
            })
            .catch( err => toast.error("Something went wrong."))
        }
    }

    useEffect(() => {
    const token = sessionStorage.getItem(USER_TOKEN);
    if (token === null || token === undefined) {
        navigate("/admin");
    }else{
        validateUser(token)
        .then((res)=>{
            if(res.status !== 200){
            toast.error("Not a valid user. Login Again.")
            navigate("/admin");
            }
        })
        .catch((err)=> {
            toast.error("Something went wrong. Try to login again.") 
            navigate("/admin")
        });
    }
    });

    return <div className={Styles.dashboard}>
        <div className={Styles.selectionPane}>
            <div className={`${Styles.option} ${state === "Photography" ? Styles.selected : ""}`}
                onClick={() => setState(types[1])} >
                Album
            </div>
            <div className={`${Styles.option} ${state === "Art" ? Styles.selected : ""}`}
                onClick={() => setState(types[0])}  >
                Art
            </div>
        </div>
        <div className={Styles.operationPane}>
            {state === types[0] && 
                <div className={Styles.operation}>
                    <div className= {Styles.sticky}>
                        <h4>Art:</h4> 
                        <div className="crud">
                            <button className={ `${ operationState === operationTypes[0] ? Styles.active : ''} ` } onClick={() => setOperationstate(operationTypes[0])}>+ Add new art</button>
                            <button className={ `${ operationState === operationTypes[1] ? Styles.active : ''} ` } onClick={() => setOperationstate(operationTypes[1])}>List all arts</button> 
                        </div> 
                    </div>
                    { operationState === operationTypes[0] ? <div className={Styles.view}> <ArtUploadForm /> </div> : null }
                    { operationState === operationTypes[1] ? 
                        <div className={Styles.view}>
                            {!artLoading && !artError && artsResponse !== undefined ? 
                                artsResponse.arts.map((art, index) => <div key={index} className={Styles.card}>
                                    <div className={Styles.left}>
                                        <h5>{art.title}</h5>
                                        <p>{art.description}</p>
                                        <br />
                                        <p>Date: {art.date}</p>
                                        <p>Published: {art.publishable ? "Yes" : "No"}</p>
                                        <br />
                                        <ul>
                                            <li key="1" >{art.photos[0].thumbnailUrl}</li>
                                        </ul>
                                    </div>
                                    <div className={Styles.right}>
                                        <button className="button btn-small" onClick={(e) => onArtEditClick(e, art)}>Edit</button>
                                        <button className="button btn-small" onClick={(e) => onArtDeleteClick(e, art)}>Delete</button>
                                    </div>
                                    
                                </div>): null
                            }
                            <div className={Styles.end}></div>
                        </div>
                        : null 
                    }
                    { operationState === operationTypes[2] ? <div className={Styles.view}> <ArtUploadForm state={STATES.edit} data={selectedArtItem} onUpdate={() => {setOperationstate(operationTypes[1]); refetchArts();}}/> </div> : null }
                </div>
            }

            {state === types[1] && 
                <div className={Styles.operation}>
                    <div className= {Styles.sticky} >
                        <h4>Albums:</h4> 
                        <div className="crud">
                            <button className={ `${ operationState === operationTypes[0] ? Styles.active : ''} ` } onClick={() => setOperationstate(operationTypes[0])}>+ Add new album</button>
                            <button className={ `${ operationState === operationTypes[1] ? Styles.active : ''} ` } onClick={() => setOperationstate(operationTypes[1])}>List all albums</button> 
                        </div> 
                    </div>
                    
                    {operationState === operationTypes[0] ? <div className={Styles.view}> <AlbumUploadForm /> </div>: ""}
                    {operationState === operationTypes[1] ? 
                    <div className={Styles.view}>
                        {!albumLoading && !albumError &&  albumResponse !== undefined ? 
                            albumResponse.albums.map((album, index) => <div key={index} className={Styles.card}>
                                <div className={Styles.left}>
                                    <h5>{album.title}</h5>
                                    <p>{album.description}</p>
                                    <br />
                                    <p>Date: {album.date}</p>
                                    <p>Published: {album.publishable ? "Yes" : "No"}</p>
                                    <br />
                                    <ul>
                                        {album.photos.map(photo => <li key={photo._id} >{photo.thumbnailUrl}</li>)}
                                    </ul>
                                </div>
                                <div className={Styles.right}>
                                    <button className="button btn-small">Edit</button>
                                    <button className="button btn-small">Delete</button>
                                </div>
                                
                            </div>
                            ): null
                        }
                        <div className={Styles.end}></div>
                    </div>
                        : null 
                    }
                </div>
                
            }
        </div>
    </div>
}