import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { db } from "../DB/base";
import Loader from "../components/loader";
import { shuffle } from "../utils/utils";

const Game = () => {
  const [word, setWord] = useState([]);
  const [definition, setDefinition] = useState({ matchWord: false });
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();

  async function setDB() {
    await setDoc(doc(db, "users", auth.currentUser.email), {
      userEmail: auth.currentUser.email,
      games: [
        {
          date: new Date(),
          highScore: score,
        },
      ],
    });
  }

  async function updateDB() {
    const userDocRef = doc(db, "users", auth.currentUser.email);
    await updateDoc(userDocRef, {
      games: arrayUnion({
        date: new Date(),
        highScore: score,
      }),
    });
  }

  async function getWords(count) {
    const wordsPromises = [];

    for (let i = 0; i < count; i++) {
      wordsPromises.push(getWord());
    }

    const words = await Promise.all(wordsPromises);

    setWord(words[0].term);

    setDefinition((prev) => ({
      ...prev,
      matchWord: true,
      answers: [
        {
          word: words[0].term,
          answer: words[0].definition,
          isCorrect: true,
        },
        {
          word: words[1].term,
          answer: words[1].definition,
          isCorrect: false,
        },
        {
          word: words[2].term,
          answer: words[2].definition,
          isCorrect: false,
        },
        {
          word: words[3].term,
          answer: words[3].definition,
          isCorrect: false,
        },
      ],
    }));

    return words;
  }

  async function getWord() {
    const term = await getRandomWord();

    try {
      const definition = await getDefinition(term);
      setLoading(false);

      return { term, definition };
    } catch (error) {
      return getWord();
    }
  }

  async function getRandomWord() {
    const response = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );

    return response.data[0];
  }

  async function getDefinition(term) {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
    );

    return response.data[0].meanings[0].definitions[0].definition;
  }

  function checkAnswer(e) {
    e.preventDefault();

    let radioValue = document.querySelector(
      'input[name="options"]:checked'
    ).value;

    if (word === radioValue) setScore(score + 1);
    if (word !== radioValue) setWrongScore(wrongScore + 1);

    getWords(4);
  }

  if (wrongScore === 3) {
    setShowModal(true);
    setWrongScore(0);
    updateDB();
  }

  const handleClose = () => {
    setShowModal(false);
    setScore(0);
  };

  useEffect(() => {
    getWords(4);
    setDB();
  }, []);

  return (
    <div>
      <h1>Are you ready? Let's go!</h1>
      <div className="d-flex justify-content-end">
        <div className="m-1 p-1 bg-success text-light rounded">
          Score: <span>{score}</span>
        </div>
        <div className="m-1 p-1 bg-danger text-light rounded">
          Wrong guesses: <span>{wrongScore}</span>
        </div>
      </div>
      {loading && !definition.answers && <Loader />}
      {!loading && definition.answers && (
        <div>
          <h2>{word}</h2>
          <h6>What does this word mean?</h6>
          <div className="mt-5">
            <form onSubmit={checkAnswer}>
              <div className="d-flex flex-wrap">
                {shuffle(definition.answers).map((item, index) => (
                  <div
                    key={item.answer}
                    style={{ width: "50%" }}
                    className="p-2 d-grid gap-3"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id={index}
                      value={item.word}
                      autoComplete="off"
                    />
                    <label className="btn btn-outline-danger" htmlFor={index}>
                      {item.answer}
                    </label>
                  </div>
                ))}
              </div>
              <div className="d-grid gap-2 p-2">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Game over</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Woohoo, Congratulations!</h4>
              <p>You scored {score} points</p>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Game;
