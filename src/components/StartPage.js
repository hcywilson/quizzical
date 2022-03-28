import React from "react";

export default function StartPage(props) {

    return (
        <main className="start-page">
            <h1 className="start-page--title">
                Quizzical
            </h1>
            <h2 className="start-page--description">
                Some description if needed
            </h2>
            <button className="start-page--button" onClick={props.startGame}>Start quiz</button>
        </main>
    )

}