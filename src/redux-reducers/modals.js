import { MODALS } from "../redux-types";

const initialState = {
  modal_turn: false,
  modal_movies: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  const stateMachine = (map, value) => map[value] || { ...state };

  const stateMap = {
    [MODALS.SHOW_MODAL_TURN]: {
      ...state,
      modal_turn: payload,
    },
    [MODALS.SHOW_MODAL_MOVIE]: {
      ...state,
      modal_movies: payload,
    },
  };

  return stateMachine(stateMap, type);
};
