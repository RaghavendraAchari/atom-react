import useSWRImmutable from 'swr/immutable';
import adminService from "../../../../../services/adminService";
import { useSelector, useDispatch } from "react-redux";
import OperationStates from "../../../../../store/OperationStates";
import { setCurrentState, setEditedItem, setSelectedItem } from "../../../../../store/Admin/artSlice";
import StickyBar from "../StickyBar";
import ArtUploadForm from "../../../../../components/Forms/ArtUploadForm/ArtUploadForm";
import { deleteArt } from "../../../../../services/artService";
import { toast } from "react-toastify";

import Styles from "../View.module.scss";

export default function ArtView() {
    const operationState = useSelector(state => state.art.currentState);
    const selectedItem = useSelector(state => state.art.selectedArt)

    const dispach = useDispatch();

    const { data: artsResponse, error: artError, isLoading: artLoading, mutate: refetchArts } = useSWRImmutable("admin/arts", adminService.getAllArts);

    function onArtEditClick(e, art) {
        e.stopPropagation();

        dispach(setSelectedItem(art));
        dispach(setCurrentState(OperationStates.edit));
    }

    function onArtDeleteClick(e, art) {
        e.stopPropagation();

        deleteArt(art._id).then(res => {
            if (res.status === 200) {
                dispach(setSelectedItem(null));
                refetchArts();
                toast.success("Successfully deleted the art");
            } else {
                toast.error("Erro in deleting the art");
            }
        }).catch(err => toast.error("Error in deleting the art"));
    }

    function renderView(operationState) {
        switch (operationState) {
            case OperationStates.add:
                return <ArtUploadForm />;
            case OperationStates.edit:
                return <ArtUploadForm state={OperationStates.edit} data={selectedItem} onUpdate={() => { dispach(setCurrentState(OperationStates.list)); refetchArts(); }} />
            case OperationStates.list:
                return <>
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

                        </div>) : null
                    }
                    <div className={Styles.end}></div>
                </>
            default:
                return null;
        }
    }

    return <div className={Styles.operation}>
        <StickyBar
            operationState={operationState}
            operationNameMap={{
                add: "+ Add New Art",
                list: "List All Arts"
            }}
            onStateChange={(state) => {
                dispach(setCurrentState(state))
            }}
            title="Arts"
            onRefresh={() => { }}
        />
        <div className={Styles.view}>
            {renderView(operationState)}
        </div>
    </div>
}