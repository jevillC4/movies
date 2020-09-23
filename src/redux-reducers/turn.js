import { TURNS } from "../redux-types";

const initialState = {
  turns: [],
  obj_edit_turn: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  const stateMachine = (map, value) => map[value] || { ...state };

  const stateMap = {
    [TURNS.GET_ALL_TURNS]: {
      ...state,
      turns: payload,
    },
    [TURNS.SET_EDIT_TURN]: {
      ...state,
      obj_edit_turn: { ...payload },
    },
  };

  return stateMachine(stateMap, type);
};
