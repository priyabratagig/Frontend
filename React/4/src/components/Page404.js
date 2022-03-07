import React from "react";
import { Link } from "react-router-dom";
function Page404() {
  return (
    <div className="HTTP-error">
      <h1 className="HTTP-error__heading--primary">Page Not Found</h1>
      <h2 className="HTTP-error__heading--secondary">Error 404</h2>
      <Link to="./home" className="HTTP-error__link">
        Go back to home page
      </Link>
    </div>
  );
}
export default Page404;
