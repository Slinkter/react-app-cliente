import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";
//
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  const url = "/login";
  axios
    .post(url, userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDate());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
//
export const getUserDate = () => dispatch => {

  dispatch({type : LOADING_USER});


  const url = "/user";
  axios
    .get(url)
    .then(res => {
      dispatch({ type: SET_USER, playload: res.data });
    })
    .catch(err => console.log("eee"));
};

//
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  const url = "/signup";
  axios
    .post(url, newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDate());
      dispatch({ type: SET_USER, payload: res.data });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispathch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispathch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token} `;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
