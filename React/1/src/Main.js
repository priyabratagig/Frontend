import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      functional: false,
      class: false,
    };
  }
  handleChange(value) {
    this.setState((state) => ({ [value]: !state[value] }));
  }
  render() {
    return (
      <main className="container">
        <header className="head">
          Styling using Functional and Class componets
        </header>
        <section className="grid">
          <button
            className="box hover"
            onClick={() => this.handleChange("functional")}
          >
            To see styling in functional component
          </button>
          <button
            className="box hover"
            onClick={() => this.handleChange("class")}
          >
            To see styling in class component
          </button>
          {this.state.functional && <Functional />}
          {this.state.class && <Class />}
        </section>
      </main>
    );
  }
}
function Functional(props) {
  return (
    <div className="box">
      <h2 className="box-heading">
        Thsi is created using functional component
      </h2>
      <p className="text-style">This done using external CSS</p>
      <p style={{ color: "blue", fontSize: "2em", fontWeight: 600 }}>
        This is done using inline CSS
      </p>
    </div>
  );
}
class Class extends Component {
  render() {
    return (
      <div
        className="box"
        style={{ backgroundColor: "rgb(211, 108, 224)", gridColumn: "2" }}
      >
        <h2 className="box-heading">
          Thsi is created using functional component
        </h2>
        <p className="text-style">This done using external CSS</p>
        <p style={{ color: "blue", fontSize: "2em", fontWeight: 600 }}>
          This is done using inline CSS
        </p>
      </div>
    );
  }
}

export default Main;
