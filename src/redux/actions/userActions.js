import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";
//

export const loginUser = (userData , history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userData)
    .then(res => {
      console.log(res.data);

      this.setState({
        loading: false
      });
      const FBIdToken = `Bearer ${res.data.token}`
      localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
      axios.defaults.headers.common['Authorization']= FBIdToken;
      history.push("/");
    })
    .catch(err => {
      this.setState({
        errors: err.response.data,
        loading: false
      });
    });
};


export const getUserDate = ( ) => (dispatch) => {
    axios.get('/user').then(res => {
        dispatch({type:SET_USER, playload : res.data})
    })
}