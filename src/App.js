import './App.css';
import StartPage from './components/StartPage';
import React, { useState } from 'react';
import GamePage from './components/GamePage';
function App() {
  const [gameStage, setGameStage] = useState("start")

  return (
    <div className="App">

      {gameStage === "start" ?
        (<StartPage
          startGame={() => setGameStage("play")}
        />) :
        (<GamePage
          gameStage={gameStage}
          endGame={() => setGameStage("end")}
          startGame={() => setGameStage("play")}
        />)}
      <div className="yellow-circle"></div>
      <div className="purple-circle"></div>
    </div>
  );
}

export default App;
