import { MODALS } from "../redux-types";

export const showNewTurn = (bool) => (dispatch) =>
  dispatch({
    type: MODALS.SHOW_MODAL_TURN,
    payload: bool,
  });

export const showNewMovie = (bool) => (dispatch) =>
  dispatch({
    type: MODALS.SHOW_MODAL_MOVIE,
    payload: bool,
  });
