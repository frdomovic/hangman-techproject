import React, { useEffect } from "react";
import axios from "axios";
import UserSetup from "./UserSetup";
import { images } from "./images/images";
import { connect } from "react-redux";
import {
  fetchQuote,
  addGuess,
  addMisstake,
  resetGameAndData,
  updateTime,
  savingDataStatus,
} from "../redux/user/userActions";

const api =
  "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores";

function HangmanLogic({
  userData,
  fetchQuote,
  addGuess,
  addMisstake,
  resetGameAndData,
  updateTime,
  savingDataStatus,
}) {
  //FETCHES GAME QUOTE WHEN PAGE LOADS
  useEffect(() => {
    fetchQuote();
  }, []);

  //STARTS WHEN PAGE LOADS, UPDATES GAME TIME EVERY 1000MS AND
  //CALLS FUNCTION UPDATETIMER() FOR HANDLING UPDATE
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimer();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [userData.username, userData.misstakes, userData.savingdata]);

  //CREATES BUTTON LAYOUT FOR ALL LETTERS WE CAN USE
  //FUNCTIONALITIES FOR CHANGING COLLORS ON HOVER(YELLOW-100) , RIGHT GUESS(GREEN-900), WRONG GUESS(YELLOW-500)
  //CLICKED BUTTON CALLS "HANGLEGUESS()" FUNCTION TO HANGLE STATE CHANGES
  const createKeys = () => {
    return "abcdefghijklmnoprstuvwzxyq".split("").map((letter) => (
      <button
        className={
          userData.guessedKeys.has(letter)
            ? userData.guessedKeys.has(letter) &&
              userData.quote.toLowerCase().includes(letter)
              ? "p-2 bg-green-900 text-black rounded-full cursor:pointer"
              : "p-2 bg-yellow-500 text-black rounded-full cursor:pointer"
            : "p-2 bg-white text-black rounded-full cursor:pointer hover:bg-yellow-100"
        }
        key={letter}
        value={letter}
        disabled={userData.guessedKeys.has(letter)}
        onClick={handleGuess}
      >
        {letter}
      </button>
    ));
  };
  //TAKES FETCHED QUOTE, TRANSFORMS IT TO A STRING ARRAY
  //ARRAY IS FILTERED TO REMOVE DUPLICATES
  const getUniqueLetters = () => {
    let uniqueLetters = userData.quote.split("").filter((item, i, arr) => {
      if (/[a-zA-Z]/.test(item)) {
        return arr.indexOf(item) === i;
      }
    });
    return uniqueLetters.length;
  };

  //FUNCTION THAT IS EXECUTED EVERY 1000MS
  //UPDATES STATE OF THE TIME VALUE
  //AFTER THE GAME IS OVER, AND THE PLAYER WON
  //HIS SCORE IS BEING SAVED WITH AXIOS POST METHOD TO API
  // QUOTE_ID (STRING), LENGTH OF QUOTE (INT), UNIQUE_CHARACTERS(INT),
  //USERNAME (STRING), ERRORS (INT)
  async function updateTimer() {
    if (
      userData.quote !== "" &&
      guessedsentence().join("") === userData.quote &&
      !userData.savingdata
    ) {
      savingDataStatus();
      await axios
        .post(
          api,
          {
            quoteId: userData.id,
            length: userData.lengthq,
            uniqueCharacters: getUniqueLetters(),
            userName: userData.username,
            errors: userData.misstakes,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            console.log("DATA SAVED");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      userData.username &&
      userData.misstakes !== 6 &&
      !userData.savingdata
    ) {
      updateTime(1000);
    }
  }
  //CALLED AFTER PLAYER CLICKS ON LETTER BUTTON
  //ADDS CLICKED LETTER VALUE TO STATE OF GUESSED LETTERS
  //IF LETTER IS NOT IN QUOTE INCREMENTS MISSTAKE STATE BY 1
  const handleGuess = (e) => {
    let guessedArray = userData.guessedKeys;
    guessedArray.add(e.target.value);
    addGuess(guessedArray);
    addMisstake(userData.quote.toLowerCase().includes(e.target.value) ? 0 : 1);
  };

  //TAKES FETCHED QUOTE FROM API TURNS IT TO A STRING ARRAY
  //AND MAPS IT A WAY THAT GUESSED LETTER ARE SHOWN AND OTHERS ARE NOT
  const guessingGame = () => {
    let guessedLetters = userData.guessedKeys;
    let lines = userData.quote.split("").map((letter) => {
      if (/[a-zA-Z]/.test(letter)) {
        return guessedLetters.has(letter.toLowerCase()) ||
          guessedLetters.has(letter.toUpperCase())
          ? letter
          : " _ ";
      } else {
        return letter === " " ? "     " : letter;
      }
    });
    return lines;
  };
  //FUNCTION USED TO TEST IF PLAYER GUESSED WHOLE SENTENCE AND WON THE GAME

  const guessedsentence = () => {
    let guessedLetters = userData.guessedKeys;
    let lines = userData.quote.split("").map((letter) => {
      if (/[a-zA-Z]/.test(letter)) {
        return guessedLetters.has(letter.toLowerCase()) ||
          guessedLetters.has(letter.toUpperCase())
          ? letter
          : "_";
      } else {
        return letter;
      }
    });
    return lines;
  };
  //CHANGES PICTURE OF HANGMAN DEPENDING ON GAME STATUS
  //IF GAME IS RUNNING - PICTURES ARRAY 0-6
  //IF LOST PICTURES ARRAY 8
  //IF WON PICTURES ARRAY 7
  const getPicture = () => {
    if (userData.misstakes === 6) {
      return 8;
    } else if (guessedsentence().join("") === userData.quote) {
      return 7;
    } else {
      return userData.misstakes;
    }
  };
  //FETCHES NEW QUOTE AND RESTARTS STATES AND USER DATA
  const resetGame = () => {
    resetGameAndData();
    fetchQuote();
  };
  return (
    <div className="bg-gray-900 text-white h-screen">
      {!userData.username ? (
        <UserSetup />
      ) : (
        <div>
          <div className="flex justify-center items-center pt-10">
            <img
              src={images[getPicture()]}
              className="w-1/5 "
              alt="hangmangame"
            />
            <div className="pl-10 ">
              <div>
                Username:{" "}
                <span className="text-yellow-500">{userData.username}</span>
              </div>
              <div>
                Score:{" "}
                <span className="text-yellow-500">
                  {Math.round(
                    ((userData.quote.length + getUniqueLetters()) * 100) /
                      (userData.misstakes + userData.time / 1000 + 1)
                  )}
                </span>
              </div>
              <div>
                Time:{" "}
                <span className="text-yellow-500">
                  {Math.round(userData.time / 1000)}
                </span>{" "}
                sec
              </div>
              <div>
                Misstakes:{" "}
                <span className="text-yellow-500">{userData.misstakes}</span> of
                6
              </div>
            </div>
          </div>

          {guessedsentence().join("") === userData.quote ? (
            <div className="flex mt-5">
              <div className="w-1/3 p-5 text-[20px] m-auto bg-gray-900 text-center whitespace-pre-wrap">
                YOU WON, SCORE SAVED!
                <div className="justify-center items-center p-4 rounded-full flex space-x-3">
                  <div className="w-7 h-7 mr-3 bg-white animate-spin "></div>
                </div>
              </div>
            </div>
          ) : guessedsentence().join("") !== userData.quote &&
            userData.misstakes === 6 ? (
            <div className="flex mt-5">
              <div className="w-1/3 p-5 text-[32px] m-auto bg-gray-900 text-center whitespace-pre-wrap">
                YOU LOST!
              </div>
            </div>
          ) : (
            <div>
              <div className="flex mt-5">
                <div className="w-1/3 ix:w-6/12 p-5 m-auto bg-gray-900 text-center whitespace-pre-wrap">
                  <div className=" align-center text-[20px] ix:text-[12px]">
                    {userData.quote ? guessingGame() : "Loading ..."}
                  </div>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="m-auto bg-gray-900">
                  <div className="grid grid-cols-7 text-center justify-center">
                    {createKeys()}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 h-10 flex justify-center">
            <button
              className="w-1/5 bg-yellow-500 rounded border-solid border-2 border-black shadow drop-shadow hover:bg-yellow-400"
              onClick={resetGame}
            >
              {" "}
              RESET{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuote: () => dispatch(fetchQuote()),
    addGuess: (value) => dispatch(addGuess(value)),
    addMisstake: (value) => dispatch(addMisstake(value)),
    resetGameAndData: () => dispatch(resetGameAndData()),
    updateTime: (value) => dispatch(updateTime(value)),
    savingDataStatus: () => dispatch(savingDataStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HangmanLogic);
