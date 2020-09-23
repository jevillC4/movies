import { createSelector } from "reselect";

import { getMoviesState } from "./globalState";

const prop = (o) => o.movies;
const propEdit = (o) => o.obj_edit_movie;

export default () => ({
  getAllMovies: createSelector(getMoviesState, prop),
  getObjectEdit: createSelector(getMoviesState, propEdit),
});
