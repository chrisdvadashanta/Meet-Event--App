import React from "react";
import { render, within, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App.js";
import { getEvents } from "../api.js";


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

describe('<App /> integration', () => {

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('User can change the number of events displayed', async () => {
    render(<App />);
    const numberOfEvents = screen.getByPlaceholderText("Enter a number")
    await userEvent.type(numberOfEvents, "{backspace}{backspace}10");
    const allRenderedEventItems = await screen.findAllByRole("listitem");
    
    const allEvents = await getEvents();
    const NumberOfEvents = allEvents.length
    
    expect(allRenderedEventItems.length).toBe(Math.min(NumberOfEvents, 10));
  });
    
 

});
