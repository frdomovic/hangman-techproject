import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux/players/playerActions";
import { images } from "./images/images";
function Leaderboard({ userData, fetchUsers }) {
  useEffect(() => {
    fetchUsers();
  }, []);

  return userData.loading ? (
    <h2 className="h-screen bg-gray-900 flex justify-center items-center pt-10">
      loading...
    </h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <div className="pt-5 text-white text-[32px] bg-gray-900 text-center">
        LEADERBOARD
      </div>
      <div className="bg-gray-900 text-white flex justify-center items-center ">
        <div className="pt-10">
          {userData &&
            userData.users &&
            userData.users.map((element, key) => {
              return (
                <div
                  key={key}
                  className=" flex justify-center items-center mb-5"
                >
                  <div className="ix:w-3/4 w-1/2 flex justify-center items-center pb-10 pt-5 border-solid border-2 border-yellow-500 rounded-lg">
                    <img
                      src={images[7]}
                      alt="hangmanlogo"
                      className="w-1/6 rounded-full"
                    />
                    <div className="pl-5">
                      <div className="text-yellow-500">
                        USERNAME:{" "}
                        <span className="text-white">{element.userName}</span>
                      </div>
                      <div className="text-yellow-500">
                        SCORE:{" "}
                        <span className="text-white">
                          {Math.round(
                            ((element.length + element.uniqueCharacters) *
                              100) /
                              (element.errors + element.duration / 1000 + 1)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.player,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);

//OK
