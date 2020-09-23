import { MOVIES } from "../../redux-types";

import reducers from "../../redux-reducers/movies";

it("should get a list of data, movies", () => {
  const actions = {
    type: MOVIES.GET_ALL_MOVIES,
    payload: [
      {
        id: "1",
        name: "X Men",
        publishDate: "2020-09-23",
        status: false,
        turn: "01:30",
      },
    ],
  };

  const newState = reducers({}, actions);

  expect(Array.isArray([newState.movies])).toBe(true);
});
