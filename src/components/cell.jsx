import { Component } from "react";
import { styles } from "../assets";

class Cell extends Component {
  render() {
    const { num, click, value, disable } = this.props;
    return (
      <button
        className={`cell w-[100px] h-[100px] bg-black text-white cursor-pointer text-[50px] font-ego ${styles.center}`}
        onClick={() => click(num)}
        disabled={disable}
      >
        {value}
      </button>
    );
  }
}

export default Cell;
