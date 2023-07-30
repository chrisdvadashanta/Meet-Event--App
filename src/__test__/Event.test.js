import React from "react";
import { render } from "@testing-library/react";
import Event from "../components/Event";
import { extractLocations, getEvents } from "../api";

///Feature 2&3 Test: no code according to test applied yet in Event.js

describe("<Event /> component", () => {
  let eventData;
  beforeEach(async () => {
    const events = await getEvents();
    eventData = events[0];
  });
  /////////////////Event components Feature 2
  test("renders Event Title", () => {
    const { queryByText } = render(<Event event={eventData} />);
    expect(queryByText(eventData.summary)).toBeInTheDocument();
  });
  test("renders Event Start time", () => {
    const { queryByText } = render(<Event event={eventData} />);
    expect(queryByText(eventData.created)).toBeInTheDocument();
  });
  test("renders Event Location ", () => {
    const { queryByText } = render(<Event event={eventData} />);
    expect(queryByText(eventData.location)).toBeInTheDocument();
  });
  test("renders event details button with the title (show details)", () => {
    const { queryByText } = render(<Event event={eventData} />);
    expect(queryByText("show details")).toBeInTheDocument();
  });

  /////////////////Event details Feature 2
  test("by default, event's details section should be hidden", () => {
    const { queryByText } = render(<Event event={eventData} />);
    expect(queryByText(eventData.description)).not.toBeInTheDocument();
  });
  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const EventComponent = render(<Event event={eventData} />);
    const showDetailsButton = EventComponent.queryByText(
      "#show-details-button"
    );
    await userEvent.click(showDetailsButton);
    expect(
      EventComponent.queryByText(eventData.description)
    ).toBeInTheDocument();
  });
  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const EventComponent = render(<Event event={eventData} />);
    const hideDetailsButton = EventComponent.queryByText(
      "#hide-details-button"
    );
    await userEvent.click(hideDetailsButton);
    expect(
      EventComponent.queryByText(eventData.description)
    ).not.toBeInTheDocument();
  });
});
