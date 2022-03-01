import React, { Component } from "react";
import "./App.css";
function App() {
  return <Form />;
}
class Form extends Component {
  state = {
    members: [],
    name: "",
    dept: "",
    rating: "",
  };
  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }
  handleSubmit(event) {
    this.setState((preState) => {
      let { members, ...userNew } = preState;
      members = [...members, userNew];
      return { members, name: "", dept: "", rating: "" };
    });
    event.stopPropagation();
    event.preventDefault();
  }
  render() {
    const members = this.state.members.map((ele, index) => (
      <div key={index} className="user">
        <span>Name : {ele.name}</span>
        <span>Department : {ele.dept}</span>
        <span>Rating : {ele.rating}</span>
      </div>
    ));
    return (
      <main>
        <form id="register" onSubmit={(event) => this.handleSubmit(event)}>
          <fieldset className="form">
            <legend>Register</legend>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(event) => this.handleChange(event, "name")}
                value={this.state.name}
              />
            </div>
            <div>
              <label htmlFor="dept">Department</label>
              <input
                type="text"
                id="dept"
                onChange={(event) => this.handleChange(event, "dept")}
                value={this.state.dept}
              />
            </div>
            <div>
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                max="5"
                onChange={(event) => this.handleChange(event, "rating")}
                value={this.state.rating}
              />
            </div>
            <button type="submit">Submit</button>
          </fieldset>
        </form>

        <section
          className="user-list"
          style={members.length ? { padding: "2em 1em" } : {}}
        >
          {members}
        </section>
      </main>
    );
  }
}
export default App;
