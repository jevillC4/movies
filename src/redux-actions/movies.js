import Axios from "axios";

import { MOVIES } from "../redux-types";

const rootUrl = "http://localhost:3004";

export const getAllMovies = () => async (dispatch) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: `${rootUrl}/movies`,
      headers: {
        "Content-type": "applications/json",
      },
    });
    dispatch({
      type: MOVIES.GET_ALL_MOVIES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIES.GET_ALL_MOVIES,
      payload: [],
    });
  }
};

export const addMovie = (obj) => async (dispatch) => {
  try {
    await Axios({
      method: "POST",
      url: `${rootUrl}/movies`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    });
    dispatch(getAllMovies());
  } catch (error) {}
};

export const setObjectEditMovie = (o) => (dispatch) =>
  dispatch({
    type: MOVIES.SET_EDIT_MOVIE,
    payload: o,
  });

export const editMovie = (data) => async (dispatch) => {
  try {
    await Axios({
      method: "put",
      url: `${rootUrl}/movies/${data.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    dispatch({
      type: MOVIES.EDIT_MOVIE,
    });
    dispatch(setObjectEditMovie({}));
    dispatch(getAllMovies());
  } catch (error) {
    dispatch({
      type: MOVIES.EDIT_MOVIE,
    });
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await Axios({
      method: "DELETE",
      url: `${rootUrl}/movies/${id}`,
      headers: {},
    });
    dispatch({
      type: MOVIES.DELETE_MOVIE,
    });
    dispatch(getAllMovies());
  } catch (error) {
    dispatch({
      type: MOVIES.DELETE_MOVIE,
    });
  }
};

export const assignTurn = (data) => async (dispatch) => {
  try {
    await Axios({
      method: "put",
      url: `${rootUrl}/movies/${data.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    dispatch({
      type: MOVIES.EDIT_MOVIE,
    });
    dispatch(setObjectEditMovie({}));
    dispatch(getAllMovies());
  } catch (error) {
    dispatch({
      type: MOVIES.EDIT_MOVIE,
    });
  }
};
