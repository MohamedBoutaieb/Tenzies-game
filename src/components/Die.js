import React from "react"

export default function Die(props) {
    const i = props.value;
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "black",
        backgroundImage: "url('" +i +".png')",
        backgroundSize: "cover"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num"></h2>
        </div>
    )
}