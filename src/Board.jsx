import { useState } from "react"
import "./GameCanvas.css"

let isGameFinished = false

function Square({ playType, boardFunction, borderStyle }) {
  const [isDisabled, setIsDisabled] = useState("")

  function handleClick() {
    boardFunction()
    //setIsDisabled("Disabled")
  }

  return (
    <button
      className={`GameButton ${borderStyle} ${playType && "Disabled"}`}
      onClick={handleClick}
    >
      {playType}
    </button>
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [winPos, setWinPos] = useState(Array(3).fill(null))
  const [playType, SetType] = useState("X")
  const [borderStyle, setBorderStyle] = useState("PlayerHoverOne")
  const [restartBtnClass, setRestartBtnClass] = useState("Hide")

  function handlePlay(place) {
    if (squares[place] || isGameFinished) {
      // Verifica se o quadrado está vazio
      return
    } else {
      const newSquares = squares.slice()
      newSquares[place] = playType
      setSquares(newSquares)

      CheckGameVictory(newSquares)

      if (isGameFinished) {
        setBorderStyle("Disabled")
        setRestartBtnClass("RestartButton")
      } else {
        const newPlayType = playType == "X" ? "O" : "X"
        SetType(newPlayType)

        const newBorderStyle =
          borderStyle == "PlayerHoverOne" ? "PlayerHoverTwo" : "PlayerHoverOne"
        setBorderStyle(newBorderStyle)
      }
    }
  }

  function CheckGameVictory(squares) {
    const possibleWins = [
      [0, 1, 2], // horizontais
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // verticais
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonais
      [2, 4, 6],
    ]

    possibleWins.forEach((pos) => {
      if (
        squares[pos[0]] != null &&
        squares[pos[0]] == squares[pos[1]] &&
        squares[pos[0]] == squares[pos[2]]
      ) {
        console.log("Venceu")
        isGameFinished = true
        setWinPos(pos)
      }
    })

    let count = 0;
    squares.forEach((square) => {
      if(square != null){
        count++;
      }
    })
    if(count >= 9){
      isGameFinished = true
    }
  }

  let squareButtons = []
  for (let place = 0; place < 9; place++) {
    // Marca os Quadrados Vencedores
    if (place == winPos[0] || place == winPos[1] || place == winPos[2]) {
      const winnerBorder = playType == "X" ? "WinnerOne" : "WinnerTwo"
      squareButtons.push(
        <Square
          key={"place: " +place}
          playType={squares[place]}
          boardFunction={(e) => handlePlay(place)}
          borderStyle={winnerBorder}
        />
      )
    } else {
      squareButtons.push(
        <Square
          key={"place: " + place}
          playType={squares[place]}
          boardFunction={(e) => handlePlay(place)}
          borderStyle={borderStyle}
        />
      )
    }
  }

  function RestartGame(){
    isGameFinished = false
    setSquares(squares.fill(null))
    setWinPos(winPos.fill(null))
    SetType("X")
    setBorderStyle("PlayerHoverOne")
    setRestartBtnClass("Hide")
  }

  return (
        <>
          <PlayerTurn type={playType}/>
          <div className="GameCanvas">
            <button className={restartBtnClass} onClick={RestartGame}>Restart</button>
            <div className="Board">{squareButtons}</div>
          </div>
        </>
  )
}

function PlayerTurn({type}) {
  return (
    <div className="PlayerTurn">
      {type === "X" ? (
        <div className="PlayerOne PlayerBox">
          <p>Jogador X</p>
        </div>
      ) : (
        <div className="PlayerTwo PlayerBox">
          <p>Jogador O</p>
        </div>
      )}
    </div>
  )
}
