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
    formOverTable: true,
  };
  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }
  handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.state.name.length < 1) return false;
    if (this.state.dept.length < 1) return false;
    if (this.state.rating < 1 || this.state.rating > 5) return false;
    this.setState((preState) => {
      let { members, ...userNew } = preState;
      members = [...members, userNew];
      return { members, name: "", dept: "", rating: "", formOverTable: false };
    });
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
        {!!this.state.formOverTable && (
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
                  min="1"
                  onChange={(event) => this.handleChange(event, "rating")}
                  value={this.state.rating}
                />
              </div>
              <button
                type="submit"
                className="btn"
                style={{
                  marginBottom: "1em",
                }}
              >
                Submit
              </button>
            </fieldset>
          </form>
        )}
        {!this.state.formOverTable && (
          <>
            <section
              className="user-list"
              style={members.length ? { padding: "2em 1em" } : {}}
            >
              {members}
            </section>
            <button
              type="submit"
              onClick={(event) => this.handleChange(event, "formOverTable")}
              value={true}
              className="btn"
            >
              Go Back
            </button>
          </>
        )}
      </main>
    );
  }
}
export default App;
