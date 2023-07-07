import OperationStates from "../../../../store/OperationStates";
import Styles from "./StickyBar.module.scss";


export default function StickyBar({ title, operationNameMap, operationState, onStateChange }) {
    return <div className={Styles.sticky}>
        <h4>{title}:</h4>
        <div className="crud">
            <button className={`${operationState === OperationStates.add ? Styles.active : ''} `} onClick={() => onStateChange(OperationStates.add)}>{operationNameMap.add}</button>
            <button className={`${operationState === OperationStates.list ? Styles.active : ''} `} onClick={() => onStateChange(OperationStates.list)}>{operationNameMap.list}</button>
        </div>
    </div>;
}