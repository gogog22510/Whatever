import React from "react";
import "./ProgressBar.css"

const Filler = (props) => {
    const {percentage} = props;
    return <div className="filler" style={{ width: `${percentage}%` }} />
};

export default function ProgressBar(props) {
    const {percentage} = props;
    return (
        <div className="progress-bar">
            <Filler percentage={percentage} />
        </div>
    )
}