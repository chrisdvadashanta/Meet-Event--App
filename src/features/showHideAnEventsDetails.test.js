import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

let AppComponent, AppDOM;

function setup() {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
}

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('event element is collapsed by default', () => {
            // stays blank as nothing happens
        });
        when('the user opens the app;', () => {
            setup();
        });
        then('the user should see the list of upcoming events.', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        given('event element is collapsed by default', () => {
            // stays blank as nothing happens
        });
        when('the user clicks the show details button', async () => {
            const user = userEvent.setup();
            setup();
            const eventDetails = within(AppDOM).queryByRole('.event-box .event-details-button');  
            await user.click(eventDetails);
        });
        then('the user should see the event details', () => {
            const eventDetails = within(AppDOM).queryByRole('.event-box .description');  
            expect( eventDetails).toBeDefined();
        });
    });

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        given('event details are shown', () => {
            setup();
            const eventDetails = within(AppDOM).queryByRole('.event-box .description'); 
        });
        when('the user clicks the hide details button', async () => {
            const user = userEvent.setup();
            setup();
            const eventDetails = within(AppDOM).queryByRole('.event-box .event-details-button');  
            await user.click(eventDetails);
        });
        then('the user should not see the event details', () => {
            const eventDetails = within(AppDOM).queryByRole('.event-box .description');  
            expect( eventDetails).toBe(null);
        });
    });
 });