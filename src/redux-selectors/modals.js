import { createSelector } from "reselect";

import { getModalsState } from "./globalState";

const prop = (o) => o.modal_turn;
const propM = (o) => o.modal_movies;

export default () => ({
  getFlagNewTurn: createSelector(getModalsState, prop),
  getFlagNewMovie: createSelector(getModalsState, propM),
});
