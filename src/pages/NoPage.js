import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div>
      <h1>Error 404 Not Found!</h1>
      <h2>
      Please return to <Link to={"/"}>Home</Link> page
      </h2>
    </div>
  );
};

export default NoPage;
