import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/" className="d-block m-1 btn btn-danger">Home</Link>
        <Link to="/profile" className="d-block m-1 btn btn-danger">Profile</Link>
        <Link to="/leaderboard" className="d-block m-1 btn btn-danger">Leaderboard</Link>
        <Link to="/game" className="d-block m-1 btn btn-danger">Play a Game</Link>
        <Link to="/login" className="d-block m-1 btn btn-danger">Login</Link>
        <Link to="/signup" className="d-block m-1 btn btn-danger">Sign Up</Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
