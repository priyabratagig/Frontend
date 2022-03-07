import React from "react";
import { useParams } from "react-router-dom";
import StudentForm from "./StudentForm";

function Form() {
  const params = useParams();
  console.log(params);
  return <StudentForm params={params} />;
}

export default Form;
