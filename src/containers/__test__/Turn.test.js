import React from "react";

import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

import Root from "../../Root";
import Turn from "../handlers/Turn";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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

it("Should show only text Html", () => {
  act(() => {
    render(
      <Root>
        <Turn />
      </Root>,
      container
    );
  });

  expect(container.innerHTML).toContain("Turnos");
});
