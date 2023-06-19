import React, { useState, useEffect } from "react";
import { styles } from "./assets";
import { Cell } from "./components";
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
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (squares[pattern[0]].value === "" || squares[pattern[1]].value === "" || squares[pattern[2]].value === "") {
        } else if (
          squares[pattern[0]].value === squares[pattern[1]].value &&
          squares[pattern[1]].value === squares[pattern[2]].value
        ) {
          this.setState({ winner: squares[pattern[0]].value });
        }
      });
    }
  };

  handleCellClick = (id) => {
    const { turn, cells } = this.state;
    const updatedCells = [...cells];
    const cellIndex = updatedCells.findIndex((cell) => cell.id === id);

    if (cellIndex !== -1 && updatedCells[cellIndex].value === "") {
      updatedCells[cellIndex].value = turn;
      updatedCells[cellIndex].disable = true;

      this.checkForWinner(updatedCells);
      this.setState((prevState) => ({
        turn: prevState.turn === "x" ? "0" : "x",
        cells: updatedCells,
      }));
    }
  };
  handleRestart = () => {
    this.setState(({ cells }) => ({
      winner: null,
      cells: cells.map((cell) => ({ ...cell, value: "", disable: false })),
    }));
  };

  // hundelClick = (e, num) => {
  //   const { turn, cells } = this.state;
  //   let newCells = [...cells];
  //   if (turn === "X") {
  //     newCells[num].value = "X";
  //     newCells[num].disable = true;
  //     this.setState({ turn: "0" });
  //   } else {
  //     newCells[num].value = "0";
  //     newCells[num].disable = true;
  //     this.setState({ turn: "X" });
  //   }
  //   this.setState({ cells: newCells });
  //   console.log(newCells);
  // };
  render() {
    const { cells, winner } = this.state;
    return (
      <div className={`${styles.center} w-full h-[100vh] overflow-auto flex-col  select-none`}>
        <h1 className=" text-white font-pally md:text-[100px] sm:text-[70px] text-[50px]">Tic Tac Toe</h1>
        <div className="game-board w-auto h-auto border grid grid-cols-3 gap-[1px] bg-white ">
          {cells.map(({ id, value, disable }, idx) => (
            <Cell num={id} value={value} disable={disable} click={this.handleCellClick} key={idx} />
          ))}
        </div>
        {winner && (
          <div>
            <p className="text-[50px] text-red-900">{winner} is the winner!</p>
            <button onClick={() => this.handleRestart()}>Play Again</button>
          </div>
        )}
      </div>
    );
  }
}
