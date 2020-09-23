import { createSelector } from "reselect";

export const getModalsState = createSelector(
  (s) => s.modals,
  (modals) => modals
);

export const getTurnState = createSelector(
  (s) => s.turn,
  (turn) => turn
);

export const getMoviesState = createSelector(
  (s) => s.movies,
  (movies) => movies
);
