import React from "react";
import logo from "./images/logo.png";
import { useState } from "react";

import { connect } from "react-redux";
import { changeUser } from "../redux/user/userActions";

function UserSetup({ changeUser }) {
  const [tempUser, setTempUser] = useState("");
  return (
    <div className="bg-gray-900 flex justify-center h-screen items-center">
      <div className="w-full max-w-xs">
        <div className="bg-gray-900 border-solid border-2 border-yellow-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center items-center">
            <img
              src={logo}
              alt="logo"
              className="w-16 cursor-pointer bg-black rounded"
            />
          </div>

          <div className="mb-4 mt-4">
            <label
              className="block text-white text-sm font-bold mb-2 flex items-center justify-center"
              id="username"
            >
              ENTER YOUR USERNAME:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="username"
              value={tempUser}
              onChange={(e) => setTempUser(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-yellow-500 hover:bg-yellow-400 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => changeUser(tempUser)}
            >
              START GAME
            </button>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">&copy;2022 Hangman</p>
      </div>
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
    changeUser: (username) => dispatch(changeUser(username)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserSetup);
//OK
