import axios from "axios";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  BASE_API_URL,
} from "./playerTypes";

const api = axios.create({
  baseURL: BASE_API_URL,
});

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    api
      .get()
      .then((res) => {
        const data = res.data;
        data.sort(
          (a, b) =>
            -((a.length + a.uniqueCharacters) * 100) /
              (a.errors + a.duration / 1000 + 1) +
            ((b.length + b.uniqueCharacters) * 100) /
              (b.errors + b.duration / 1000 + 1)
        );
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};
