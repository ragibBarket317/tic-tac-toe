/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="text-4xl md:text-3xl font-semibold w-24 h-24 px-6 py-4 m-3  md:w-36 md:h-36 border-2 border-white md:px-12 md:py-8 md:mx-5 md:my-5 shadow-lg shadow-black"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, history }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Congratulation!!! Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
    if (history.length == 10) {
      status = "Match Draw";
    }
  }

  const handleClick = (i) => {
    if ((squares[i] === squares[i]) !== "null") {
      status = "Draw";
    }
    if (squares[i] || winner) {
      return;
    }

    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }

    onPlay(newSquares);
  };

  return (
    <>
      <div>
        <div>
          <h1
            className={
              winner
                ? "text-4xl md:text-5xl font-extrabold my-10 px-6"
                : "text-2xl font-semibold mb-6"
            }
          >
            {status}
          </h1>
          <div className={winner ? "hidden" : "block"}>
            <div className="flex justify-center">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="flex justify-center">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="flex justify-center">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  console.log(history);

  const currentSquare = history[currentMove];

  function handlePlay(newSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Go to move number ${move}`;
    } else {
      description = "Lets See Your Move";
    }
    // console.log(move);
    return (
      <li
        key={move}
        className="border-2 border-white p-2 w-full mb-4 rounded shadow-md shadow-slate-900"
      >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const handleRestart = () => {
    setCurrentMove(0);
    setHistory([[]]);
  };
  return (
    <div className="bg-gray-900 text-white">
      <div>
        <div className="md:flex">
          <div className="grow md:w-11/12 text-center">
            <h1 className="text-5xl text-center pt-10 mb-5 font-bold">
              Tic Tac Toe
            </h1>
            <button
              onClick={handleRestart}
              className="text-xl  border-2 border-green-400 px-4 py-2 mt-2 mb-6 shadow-lg shadow-black rounded-lg"
            >
              Restart the game
            </button>
            <div className="md:flex justify-center md:align-middle">
              <Board
                className="text-center"
                xIsNext={xIsNext}
                squares={currentSquare}
                onPlay={handlePlay}
                history={history}
              />
            </div>
          </div>
          <div className="md:bg-slate-800 md:w-1/4 h-screen px-5 md:px-10">
            <div className="text-xl font-semibold text-white">
              <ol className="py-12">{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
