import React, { useState, useEffect } from "react";
import Question from "./Question";

export default function GamePage(props) {

    const [questions, setQuestions] = useState([])

    function shuffleChoices(correctAnswer, incorrectAnswers) {
        const choices = [...incorrectAnswers]
        choices.splice(Math.floor(Math.random() * (choices.length + 1)), 0, correctAnswer)
        return choices
    }

    async function getNewData() {
        const data = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")

        const dataJson = await data.json()

        const questionsData = dataJson.results.map(
            raw => (
                {
                    question: raw.question,
                    choices: shuffleChoices(raw.correct_answer, raw.incorrect_answers),
                    chosen: "",
                    correctAnswer: raw.correct_answer
                })
        )
        setQuestions(questionsData)
    }

    useEffect(() => {
        getNewData()
    }, [])

    function calculateScore() {
        return questions.filter(question => question.correctAnswer === question.chosen).length
    }

    function chooseAnswer(question, answer) {
        setQuestions(preQuestions => preQuestions.map(q => {
            return q.question === question ?
                { ...q, chosen: answer } : q
        }))
    }

    const questionsElement = questions.map(q => (
        <Question
            gameStage={props.gameStage}
            key={q.question}
            chooseAnswer={(answer) => chooseAnswer(q.question, answer)}
            {...q} />
    ))
    return (
        <div className="game-page">
            {questionsElement}
            <div className="game-page--bottom">
                {props.gameStage === "play" ?
                    <button className="game-page--button" onClick={props.endGame}>Check Answer</button> :
                    <>
                        <span className="game-page--score">{`You scored ${calculateScore()}/${questionsElement.length} correct answers`}</span>
                        <button className="game-page--button" onClick={() => {
                            props.startGame()
                            getNewData()
                        }}>Start Again</button>
                    </>
                }
            </div>
        </div>
    )
}