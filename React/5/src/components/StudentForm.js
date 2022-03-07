import React, { Component } from "react";
import { studentsContext } from "./StudentBase";
import { Link, Navigate } from "react-router-dom";
import Student400 from "./Student400";
class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: { name: "", age: "", course: "", batch: "" },
      navigate: false,
    };
  }
  static contextType = studentsContext;
  componentDidMount() {
    if (
      this.props.params.hasOwnProperty("index") &&
      this.props.params.index >= 0 &&
      this.props.params.index < this.context.students.length
    ) {
      this.setState({
        student: { ...this.context.students[this.props.params.index] },
        navigate: false,
      });
    }
  }
  handleChange(event, name) {
    this.setState(({ student }) => ({
      navigate: false,
      student: { ...student, [name]: event.target.value },
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (
      this.props.params.hasOwnProperty("index") &&
      this.props.params.index >= 0 &&
      this.props.params.index < this.context.students.length
    )
      this.context.studentUpdate(this.props.params.index, this.state.student);
    else this.context.studentAdd(this.state.student);
    this.setState({
      student: { name: "", age: "", course: "", batch: "" },
      navigation: true,
    });
  }
  handleDelete(index) {
    this.context.studentDelete(index);
    this.setState({
      student: { name: "", age: "", course: "", batch: "" },
      navigate: true,
    });
  }
  render() {
    if (
      this.props.params.hasOwnProperty("index") &&
      this.props.params.index < 0 &&
      this.props.params.index > this.context.students.length
    )
      return <Student400 />;
    if (this.state.navigate) return <Navigate to="/students" />;
    return (
      <main>
        <form
          className="student-form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <fieldset className="student-form--left">
            <legend>Name</legend>
            <input
              type="name"
              id="name"
              maxLength={30}
              value={this.state.student.name}
              onChange={(event) => this.handleChange(event, "name")}
            />
          </fieldset>
          <fieldset className="student-form--right">
            <legend>Age</legend>
            <input
              type="number"
              id="age"
              max={100}
              value={this.state.student.age}
              onChange={(event) => this.handleChange(event, "age")}
            />
          </fieldset>
          <fieldset className="student-form--left">
            <legend>Course</legend>
            <input
              type="text"
              id="course"
              maxLength={10}
              value={this.state.student.course}
              onChange={(event) => this.handleChange(event, "course")}
            />
          </fieldset>
          <fieldset className="student-form--right">
            <legend>Batch</legend>
            <input
              type="text"
              id="batch"
              maxLength={12}
              value={this.state.student.batch}
              onChange={(event) => this.handleChange(event, "batch")}
            />
          </fieldset>
          <div className="student-form--buttons">
            <Link to="/students">
              <button type="reset" className="student-form--cancel">
                Cancle
              </button>
            </Link>
            <button type="submit" className="student-form--submit">
              Submit
            </button>
          </div>
          {this.props.params.hasOwnProperty("index") &&
            this.props.params.index >= 0 &&
            this.props.params.index < this.context.students.length && (
              <div className="student-form--delete">
                <button
                  onClick={() => this.handleDelete(this.props.params.index)}
                >
                  Delete
                </button>
              </div>
            )}
        </form>
      </main>
    );
  }
}
export default StudentForm;
