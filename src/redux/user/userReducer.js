import {
  FETCH_QUOTE_FAILURE,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_REQUEST,
  SET_PLAYER_USERNAME,
  ADD_NEW_GUESS,
  INCREMENT_MISSTAKE,
  RESET_GAME_AND_DATA,
  UPDATE_TIME,
  PUSHING_GAME_DATA_STATUS,
} from "./userTypes";

const initialState = {
  loading: false,
  quote: "",
  id: "",
  username: "",
  time: 0,
  guessedKeys: new Set([]),
  misstakes: 0,
  error: "",
  lengthq: 0,
  savingdata: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        quote: action.payload.content,
        id: action.payload._id,
        lengthq: action.payload.content.length,
        error: "",
      };
    case FETCH_QUOTE_FAILURE:
      return {
        ...state,
        loading: false,
        quote: "",
        error: action.payload,
      };
    case SET_PLAYER_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case ADD_NEW_GUESS:
      return {
        ...state,
        guessedKeys: action.payload,
      };
    case INCREMENT_MISSTAKE:
      return {
        ...state,
        misstakes: state.misstakes + action.payload,
      };
    case RESET_GAME_AND_DATA:
      return {
        ...state,
        loading: false,
        quote: "",
        id: null,
        username: "",
        time: 0,
        guessedKeys: new Set([]),
        misstakes: 0,
        error: "",
        lengthq: 0,
        savingdata: false,
      };
    case UPDATE_TIME:
      return {
        ...state,
        time: state.time + action.payload,
      };
    case PUSHING_GAME_DATA_STATUS:
      return { ...state, savingdata: true };

    default:
      return state;
  }
};

export default userReducer;
