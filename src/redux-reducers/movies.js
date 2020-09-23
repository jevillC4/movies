import { MOVIES } from "../redux-types";

const initialState = {
  movies: [],
  obj_edit_movie: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  const stateMachine = (map, value) => map[value] || { ...state };

  const stateMap = {
    [MOVIES.GET_ALL_MOVIES]: {
      ...state,
      movies: payload,
    },
    [MOVIES.SET_EDIT_MOVIE]: {
      ...state,
      obj_edit_movie: payload,
    },
  };

  return stateMachine(stateMap, type);
};
