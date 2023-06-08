import Styles from "./CustomButton.module.scss";

export default function CustomButton({title, onButtonClicked}){
    return <div className={Styles.buttonContainer}>
        <button className="button" onClick={onButtonClicked}>{title}</button>
    </div>
}