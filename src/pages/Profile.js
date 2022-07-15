import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../DB/base";
import { toDateTime } from "../utils/utils";

const Profile = () => {
  const [list, setList] = useState();

  const auth = getAuth();

  async function getUserProfileDB() {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef, orderBy("date", "desc"));

    if (docSnap.exists()) setList(docSnap.data());
  }

  useEffect(() => {
    getUserProfileDB();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {list &&
        list.games.map((item) => (
          <div
            key={item.date.seconds}
            className="d-flex justify-content-between"
          >
            <div>user: {list.userEmail}</div>
            <div>high score: {item.highScore}</div>
            <div>date: {toDateTime(item.date.seconds)}</div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
