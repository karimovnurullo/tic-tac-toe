import React, { Component } from "react";

class Move extends Component {
  render() {
    const { id, value, moveHistory } = this.props;
    return (
      <button className="py-[2px] px-[10px] bg-slate-200 text-black" onClick={() => moveHistory(id, value)}>
        Go to move {id + 1}
      </button>
    );
  }
}

export default Move;
