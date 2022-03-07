import React, { useContext } from "react";
import { studentsContext } from "./StudentBase";
import { Link } from "react-router-dom";
function Table() {
  const studentlist = useContext(studentsContext);

  return (
    <main className="student">
      <section className="student__header">
        <h1 className="student__header--text">Students Details</h1>
        <Link to="/student-des">
          <button className="student__header--link">Add New Student</button>
        </Link>
      </section>
      <section className="table">
        <div className="tbale__head">
          <div className="table__head__row">
            <span style={{ textAlign: "left" }}>Namme</span>
            <span style={{ textAlign: "center" }}>Age</span>
            <span style={{ textAlign: "center" }}>Course</span>
            <span style={{ textAlign: "right" }}>Batch</span>
            <span style={{ textAlign: "right" }}>Edit</span>
          </div>
        </div>
        <div className="tbale__body">
          {studentlist.students.map((student, index) => (
            <div className="table__body__row" key={index}>
              <span style={{ textAlign: "left" }}>{student.name}</span>
              <span style={{ textAlign: "center" }}>{student.age}</span>
              <span style={{ textAlign: "center" }}>{student.course}</span>
              <span style={{ textAlign: "right" }}>{student.batch}</span>
              <span style={{ textAlign: "right" }}>
                <Link to={`/student-des/${index}`}>Edit</Link>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
export default Table;
