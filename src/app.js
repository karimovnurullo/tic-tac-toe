import React, { useState, useEffect } from "react";
import { styles } from "./assets";
import { Cell, Move } from "./components";

export default class App extends React.Component {
  state = {
    turn: "x",
    winner: "",
    cells: [
      { id: "0", value: "", disable: false },
      { id: "1", value: "", disable: false },
      { id: "2", value: "", disable: false },
      { id: "3", value: "", disable: false },
      { id: "4", value: "", disable: false },
      { id: "5", value: "", disable: false },
      { id: "6", value: "", disable: false },
      { id: "7", value: "", disable: false },
      { id: "8", value: "", disable: false },
    ],
    history: [],
  };

  checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]].value !== "" &&
          squares[pattern[0]].value === squares[pattern[1]].value &&
          squares[pattern[1]].value === squares[pattern[2]].value
        ) {
          this.setState({ winner: squares[pattern[0]].value });
        }
      });
    }
  };

  handleCellClick = (id) => {
    const { turn, cells, history } = this.state;
    const updatedCells = [...cells];
    const updatedHistory = [...history];

    const cellIndex = updatedCells.findIndex((cell) => cell.id === id);

    if (cellIndex !== -1 && updatedCells[cellIndex].value === "") {
      updatedCells[cellIndex].value = turn;
      updatedCells[cellIndex].disable = true;
      const move = { cells: updatedCells.map((cell) => ({ ...cell })) };
      updatedHistory.push(move);

      this.checkForWinner(updatedCells);
      this.setState({
        turn: turn === "x" ? "o" : "x",
        cells: updatedCells,
        history: updatedHistory,
      });
    }
  };

  moveHistory = (moveIndex) => {
    const { history } = this.state;
    const move = history[moveIndex];
    const { cells, turn } = move;

    this.setState({
      cells: cells.map((cell) => ({ ...cell })),
      turn,
    });
    console.log("history", history);
  };

  handleRestart = () => {
    this.setState({
      turn: "x",
      winner: "",
      cells: this.state.cells.map((cell) => ({ ...cell, value: "", disable: false })),
      history: [],
    });
  };

  render() {
    const { cells, winner, history } = this.state;
    return (
      <div className={`${styles.center} w-full h-[100vh] overflow-auto flex-col select-none`}>
        <h1 className="text-white font-pally md:text-[100px] sm:text-[70px] text-[50px]">Tic Tac Toe</h1>
        <div className="flex gap-[30px] h-fit">
          <div className="game-board w-auto h-auto border grid grid-cols-3 gap-[1px] bg-white mt-[50px]">
            {cells.map(({ id, value, disable }, idx) => (
              <Cell num={id} value={value} disable={disable} click={this.handleCellClick} key={idx} />
            ))}
          </div>
          <div className="history w-[200px]">
            {history.map((move, index) => (
              <Move key={index} id={index} value={move.turn} moveHistory={this.moveHistory} />
            ))}
          </div>
        </div>
        <div>
          <div>
            <div className={`${winner ? "flex" : "hidden"} items-center text-[40px] text-white`}>
              <span className="text-green-500 text-[50px] mr-4">{winner}</span> is the winner!
            </div>
          </div>
          <button onClick={this.handleRestart} className="py-[10px] px-[30px] bg-white text-black mr-auto">
            Restart
          </button>
        </div>
      </div>
    );
  }
}
