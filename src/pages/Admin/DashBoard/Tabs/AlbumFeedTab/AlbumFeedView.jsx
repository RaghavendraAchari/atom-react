import useSWRImmutable from 'swr/immutable';
import { useSelector, useDispatch } from "react-redux";

import OperationStates from "../../../../../store/OperationStates";
import StickyBar from "../StickyBar";
import albumFeedService from "../../../../../services/albumFeedService";
import AlbumUploadForm from "../../../../../components/Forms/AlbumUploadForm/AlbumUploadForm";
import { setCurrentState, setEditedItem, setSelectedItem } from "../../../../../store/Admin/albumSlice";

import Styles from "../View.module.scss";
import { toast } from "react-toastify";

export default function AlbumFeedView() {
    const operationState = useSelector(state => state.album.currentState);
    const selectedItem = useSelector(state => state.album.selectedAlbum);
    const editedItem = useSelector(state => state.album.editedItem);

    const dispach = useDispatch();

    const { data: albumResponse, error: albumError, isLoading: albumLoading, mutate: refetchAlbums } = useSWRImmutable("admin/albumfeeds", albumFeedService.getAllAlbumFeeds);

    function onDeleteClick(album) {
        albumFeedService.deleteAlbumFeed(album)
            .then(res => {
                if (res) {
                    refetchAlbums();
                    dispach(setCurrentState(OperationStates.list))
                } else {
                    toast.error("Not able to delete the album!");
                }
            }).catch(err => {
                console.log(err);
                toast.error("Something went wrong");
            })
    }

    const onComplete = () => {
        dispach(setCurrentState(OperationStates.list));
        dispach(setSelectedItem(null));
    };

    function renderView(operationState) {
        switch (operationState) {
            case OperationStates.add:
                return <AlbumUploadForm onComplete={onComplete} />;
            case OperationStates.edit:
                return <AlbumUploadForm state={OperationStates.edit} data={selectedItem} onComplete={onComplete} />;
            case OperationStates.list:
                return <>
                    {!albumLoading && !albumError && albumResponse !== undefined ?
                        albumResponse.albums.map((album, index) => <div key={index} className={Styles.card}>
                            <div className={Styles.left}>
                                <h5>{album.title}</h5>
                                <p>{album.description}</p>
                                <br />
                                <p>Date: {album.date}</p>
                                <p>Published: {album.publishable ? <strong>Yes</strong> : <strong>No</strong>}</p>
                                <br />
                                <ul>
                                    {album.photos.map(photo => <li key={photo._id} >{photo.thumbnailUrl}</li>)}
                                </ul>
                            </div>
                            <div className={Styles.right}>
                                <button className="button btn-small" onClick={() => {
                                    console.log("EDIT");
                                    dispach(setSelectedItem(album))
                                    dispach(setCurrentState(OperationStates.edit))
                                }}>Edit</button>
                                <button className="button btn-small" onClick={() => onDeleteClick(album)}>Delete</button>
                            </div>

                        </div>
                        ) : null
                    }
                    <div className={Styles.end}></div></>;
            default:
                break;
        }
    }

    return <div className={Styles.operation}>
        <StickyBar
            operationState={operationState}
            operationNameMap={{
                add: "+Add New Album",
                list: "List All Album"
            }}
            onStateChange={(state) => {
                dispach(setCurrentState(state))
            }}
            title="Albums"
            onRefresh={() => { }}
        />

        <div className={Styles.view}>
            {renderView(operationState)}
        </div>
    </div>
}