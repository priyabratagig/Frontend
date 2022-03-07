import React, { Component, createContext } from "react";
export const studentsContext = createContext();
class StudentBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    fetch(
      "https://randomuser.me/api/?inc=name,dob&&noinfo&nat=in,us&results=20&format=json"
    )
      .then((data) => data.json())
      .then(({ results }) =>
        results.map((ele) => ({
          name: `${ele.name.first} ${ele.name.last}`,
          age: ele.dob.age,
          course: "MERN",
          batch: new Date(ele.dob.date).toLocaleString("default", {
            month: "long",
          }),
        }))
      )
      .then((data) => this.setState({ students: data }));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.students.length !== nextState.students.length) return true;
    return this.state.students.some((ele, index) => {
      const newEle = nextState.students[index];
      return (
        ele.name === newEle.name &&
        ele.age === newEle.age &&
        ele.course === newEle.course &&
        ele.batch === newEle.batch
      );
    });
  }
  handleUpdate(index, { name, age, course, batch }) {
    this.setState(({ students }) => {
      const studentsAll = students.map((ele) => ({ ...ele }));
      studentsAll[index] = { name, age, course, batch };
      return { students: studentsAll };
    });
  }
  handleAdd({ name, age, course, batch }) {
    this.setState(({ students }) => {
      const studentsAll = students.map((ele) => ({ ...ele }));
      studentsAll.push({ name, age, course, batch });
      return { students: studentsAll };
    });
  }
  render() {
    return (
      <studentsContext.Provider
        value={{
          students: this.state.students,
          studentAdd: this.handleAdd,
          studentUpdate: this.handleUpdate,
        }}
      >
        {this.props.children}
      </studentsContext.Provider>
    );
  }
}
export default StudentBase;
