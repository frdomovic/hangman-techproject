import axios from "axios";
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
  BASE_API_URL,
} from "./userTypes";

const api = axios.create({
  baseURL: BASE_API_URL,
});

const fetchQuoteRequest = () => {
  return {
    type: FETCH_QUOTE_REQUEST,
  };
};

const fetchQuoteSuccess = (quoteData) => {
  return {
    type: FETCH_QUOTE_SUCCESS,
    payload: quoteData,
  };
};

const fetchQuoteFailure = (error) => {
  return {
    type: FETCH_QUOTE_FAILURE,
    payload: error,
  };
};
const setupUsername = (username) => {
  return {
    type: SET_PLAYER_USERNAME,
    payload: username,
  };
};

const addNewGuess = (value) => {
  return {
    type: ADD_NEW_GUESS,
    payload: value,
  };
};

const incrementMisstake = (value) => {
  return {
    type: INCREMENT_MISSTAKE,
    payload: value,
  };
};

const resetGame = () => {
  return {
    type: RESET_GAME_AND_DATA,
  };
};

const newTime = (value) => {
  return {
    type: UPDATE_TIME,
    payload: value,
  };
};
const changeSavingStatus = () => {
  return {
    type: PUSHING_GAME_DATA_STATUS,
  };
};

export const fetchQuote = () => {
  return (dispatch) => {
    dispatch(fetchQuoteRequest());
    api
      .get()
      .then((res) => {
        const data = res.data;
        dispatch(fetchQuoteSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchQuoteFailure(errorMsg));
      });
  };
};

export const savingDataStatus = () => {
  return (dispatch) => {
    dispatch(changeSavingStatus());
  };
};

export const updateTime = (value) => {
  return (dispatch) => {
    dispatch(newTime(value));
  };
};

export const changeUser = (username) => {
  return (dispatch) => {
    dispatch(setupUsername(username));
  };
};

export const addGuess = (value) => {
  return (dispatch) => {
    dispatch(addNewGuess(value));
  };
};
export const addMisstake = (value) => {
  return (dispatch) => {
    dispatch(incrementMisstake(value));
  };
};

export const resetGameAndData = (value) => {
  return (dispatch) => {
    dispatch(resetGame());
  };
};
