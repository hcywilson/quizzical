import React from "react";

export default function Question(props) {
  const choiceElements = props.choices.map((choice) => {
    let style;
    if (props.gameStage === "play") {
      style = {
        cursor: "pointer",
      };
      if (choice === props.chosen) {
        style.backgroundColor = "#D6DBF5";
      } else {
        style.backgroundColor = "#ffffff";
        style.border = "0.794239px solid #4D5B9E";
      }
    } else {
      if (choice === props.correctAnswer) {
        style = {
          backgroundColor: "#94D7A2",
        };
      } else if (choice === props.chosen) {
        style = {
          backgroundColor: "#F8BCBC",
          opacity: 0.6,
        };
      } else
        style = {
          backgroundColor: "#ffffff",
          border: "0.794239px solid #4D5B9E",
          opacity: 0.6,
        };
    }
    return (
      <button
        className="question--choice"
        style={style}
        key={choice}
        onClick={() => props.gameStage === "play" && props.chooseAnswer(choice)}
        dangerouslySetInnerHTML={{ __html: choice }}
      ></button>
    );
  });
  return (
    <div className="question">
      <p
        className="question--question"
        dangerouslySetInnerHTML={{ __html: props.question }}
      />
      <div className="question--choices">{choiceElements}</div>
    </div>
  );
}
