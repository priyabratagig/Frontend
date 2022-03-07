import React from "react";
import { Link } from "react-router-dom";
function Student400() {
  return (
    <div className="HTTP-error">
      <h1 className="HTTP-error__heading--primary">Student Not Found</h1>
      <h2 className="HTTP-error__heading--secondary">Error 400</h2>
      <Link to="./students" className="HTTP-error__link">
        Go back to student table
      </Link>
    </div>
  );
}
export default Student400;
