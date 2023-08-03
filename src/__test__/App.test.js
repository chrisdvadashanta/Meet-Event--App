import { render, screen } from "@testing-library/react";
import App from "../App.js";
import React from "react";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("Feat 3: NumberOfEvents component is rendered correctly", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});
