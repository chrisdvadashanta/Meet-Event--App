Feature: Specify Number of Events					
    Scenario: When the user hasn’t specified a number, 32 events are shown by default. 
        Given the main page is open
        When user hasn’t specified a number,
        Then 32 events are shown by default.
    Scenario: User can change the number of events displayed.
        Given the main page is open
        When user change the number of events
        Then this number of events will be shown.
