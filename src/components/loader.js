import React from "react";

const Loader = () => {
  return (
    <div
      className="position-absolute top-50 start-50 spinner-border text-danger"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
