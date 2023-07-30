import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NumberOfEvents from "../components/NumberOfEvents.js";
import App from "../App"

describe("<App /> component", () => {
  let AppComponent;
  beforeEach(() => {
    AppComponent = render(<App />);
  });

  test("renders an element with the role textbox", () => {
    const EventTextBox = AppComponent.queryByRole("textbox");
    expect(EventTextBox).toBeInTheDocument();
  });
  test("renders only 32 events by default", () => {
    const { queryAllByTestId } = render(<App />);
    const events = queryAllByTestId("event");
    expect(events).toHaveLength(32);
  });
  test("updates the textbox value correctly when a user types in it", () => {
    const { queryAllByTestId } = render(<App />);
    const textBox = queryAllByTestId("number-of-events-textbox");
    userEvent.type(textBox, "10");
    expect(textBox.value).toBe("10");
  });
});
