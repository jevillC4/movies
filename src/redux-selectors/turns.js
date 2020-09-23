import { createSelector } from "reselect";

import { getTurnState } from "./globalState";

const prop = (o) => o.turns;
const propEdit = (o) => o.obj_edit_turn;

export default () => ({
  getAllTurns: createSelector(getTurnState, prop),
  getObjectEditTurn: createSelector(getTurnState, propEdit),
});
