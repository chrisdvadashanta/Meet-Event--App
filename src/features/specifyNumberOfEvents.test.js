import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NumberOfEvents from "../components/NumberOfEvents";


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

let AppComponent, AppDOM;

function setup() {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
}

defineFeature(feature, test => {
    test('When the user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        given('the main page is open', () => {
             // stays blank as nothing happens
        });

        when('user hasn’t specified a number,', () => {
            setup();
        });

        then(/^(\d+) events are shown by default.$/, async (arg0) => {
            await waitFor(() => {
                const events = within(AppDOM).queryAllByRole('listitem');
                expect(events.length).toBe(32);
            });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        given('the main page is open', () => {
           // stays blank as nothing happens
        });

        when('user change the number of events', async () => {
            const handleEventNumberChange = jest.fn();
            render(
            <NumberOfEvents
                eventNumber={32}
                onEventNumberChange={handleEventNumberChange}
            />
            );
            const numberTextBox = screen.getByPlaceholderText("Enter a number");
            await userEvent.type(numberTextBox, "10");
            expect(handleEventNumberChange).toHaveBeenCalled();
        });

        then('this number of events will be shown.', async () => {
            await waitFor(() => {
                const events = within(AppDOM).queryAllByRole('listitem');
                expect(events.length).toBe(32);
            });
        });
    });
});