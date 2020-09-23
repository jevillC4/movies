import Axios from "axios";

import { TURNS } from "../redux-types";

const rootUrl = "http://localhost:3004";

export const getAllTurns = () => async (dispatch) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: `${rootUrl}/turns`,
      headers: {
        "Content-type": "applications/json",
      },
    });
    dispatch({
      type: [TURNS.GET_ALL_TURNS],
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: [TURNS.GET_ALL_TURNS],
      payload: [],
    });
  }
};

export const addTurn = (obj) => async (dispatch) => {
  try {
    await Axios({
      method: "POST",
      url: `${rootUrl}/turns`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    });
    dispatch({
      type: TURNS.ADD_TURN,
    });
    dispatch(getAllTurns());
  } catch (error) {
    dispatch({
      type: TURNS.ADD_TURN,
    });
  }
};

export const setObjectEditTurn = (obj) => (dispatch) =>
  dispatch({
    type: TURNS.SET_EDIT_TURN,
    payload: obj,
  });

export const editTurn = (obj) => async (dispatch) => {
  try {
    await Axios({
      method: "put",
      url: `${rootUrl}/turns/${obj.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    });
    dispatch({
      type: TURNS.EDIT_TURN,
    });
    dispatch(setObjectEditTurn({}));
    dispatch(getAllTurns());
  } catch (error) {
    dispatch({
      type: TURNS.EDIT_TURN,
    });
    dispatch(setObjectEditTurn({}));
  }
};

export const deleteTurn = (id) => async (dispatch) => {
  try {
    await Axios({
      method: "delete",
      url: `${rootUrl}/turns/${id}`,
      headers: {},
    });
    dispatch({
      type: TURNS.DELETE_TURN,
    });
    dispatch(getAllTurns());
  } catch (error) {
    dispatch({
      type: TURNS.DELETE_TURN,
    });
  }
};
