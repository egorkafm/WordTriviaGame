import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import app from "../DB/base";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h2>
            Welcome, {user.email}
            <div>
              <h4 className="mt-3">
                Are you tired and don't know how to spend your evening? Play our
                quiz!
              </h4>
            </div>
          </h2>

          <div className="d-flex justify-content-end">
            {" "}
            <Link to="/game" className="d-block m-1 btn btn-danger">
              Play a Game
            </Link>
            <button
              className="d-block m-1 btn btn-dark"
              onClick={() => {
                app.auth().signOut();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
          <Outlet />
        </div>
      )}
      {!user && (
        <div className="d-flex justify-content-end">
          <Link to={"/login"} className="d-block m-1 btn btn-danger">
            Login
          </Link>
          <Link to="/signup" className="d-block m-1 btn btn-danger">
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
