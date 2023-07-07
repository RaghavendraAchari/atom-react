import { useState } from "react";



export default function useStateManager(){
    const states = {
        new: "NEW",
        edit: "EDIT",
    }

    const [currentState, setCurrentState] = useState(states.new);

    function changeState(state){
        setCurrentState(state);
    }

    return {
        states,
        currentState,
        changeState
    }
}