import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        <h1 className=" text-white font-pally text-[100px] block">Hello world!</h1>
        <a
          href="https://www.nurullokarimov.uz/"
          target="_blank"
          className="font-ego tracking-widest hover:text-white underline"
        >
          nurullokarimov.uz
        </a>
      </div>
    );
  }
}
