import React from "react";

import { act } from "react-dom/test-utils";
import { connect } from "react-redux";
import { render, unmountComponentAtNode } from "react-dom";

import Test from "../Test";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Test />, container);
  });

  expect(container.textContent).toBe("Test");
});
