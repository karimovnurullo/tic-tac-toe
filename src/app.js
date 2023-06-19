import React, { useState, useEffect } from "react";
import { styles } from "./assets";
import { Cell } from "./components";
export default class App extends React.Component {
  state = {
    turn: "X",
    // cells: Array(9).fill(""),
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

  handleCellClick = (id) => {
    const { turn, cells } = this.state;
    const updatedCells = [...cells];
    const cellIndex = updatedCells.findIndex((cell) => cell.id === id);

    if (cellIndex !== -1 && updatedCells[cellIndex].value === "") {
      updatedCells[cellIndex].value = turn;
      updatedCells[cellIndex].disabled = true;

      this.setState((prevState) => ({
        turn: prevState.turn === "X" ? "0" : "X",
        cells: updatedCells,
      }));
    }
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
    const { cells } = this.state;
    return (
      <div className={`${styles.center} w-full h-[100vh] overflow-auto flex-col  select-none`}>
        <h1 className=" text-white font-pally md:text-[100px] sm:text-[70px] text-[50px]">Tic Tac Toe</h1>
        <div className="game-board w-auto h-auto border grid grid-cols-3 gap-[1px] bg-white ">
          {cells.map(({ id, value, disable }, idx) => (
            <Cell num={id} value={value} disable={disable} click={this.handleCellClick} key={idx} />
          ))}
        </div>
      </div>
    );
  }
}
