import React, { useState, useEffect } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../DB/base";
import { toDateTime } from "../utils/utils";

const Leaderboard = () => {
  const [list, setList] = useState([]);

  async function getAllUsersDB() {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setList((prev) => [...prev, doc.data()]);
    });
  }

  useEffect(() => {
    getAllUsersDB();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {list.length &&
        list.map((item) => (
          <div key={item.userEmail} className="d-flex justify-content-between">
            <div>user: {item.userEmail}</div>
            <div>
              {item.games.map((el) => (
                <div key={el.date.seconds}>
                  <div>high score: {el.highScore}</div>
                  <div>date: {toDateTime(el.date.seconds)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Leaderboard;
