import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
// import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "./index.css";
import App from "./App";

// firebase.initializeApp({
//   apiKey: "AIzaSyAkB18UicQ2brVB4MCR8QlxDLUw5rA7N3E",
//   authDomain: "word-trivia-game-7b3ae.firebaseapp.com",
//   projectId: "word-trivia-game-7b3ae",
//   storageBucket: "word-trivia-game-7b3ae.appspot.com",
//   messagingSenderId: "565844903940",
//   appId: "1:565844903940:web:90ef19f688e1c35062cd51",
//   measurementId: "G-3F6Q9Y00N4",
// });

// const Context = createContext(null);

// const auth = firebase.auth();
// const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
  // <React.StrictMode>
    
  // </React.StrictMode>
  //     <Context.Provider value={{
  //       firebase,
  //       auth,
  //       firestore
  //     }}>
  // </Context.Provider>
);
