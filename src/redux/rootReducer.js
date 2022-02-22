import { combineReducers } from "redux";
import playerReducer from "./players/playerReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  user: userReducer,
});

export default rootReducer;
