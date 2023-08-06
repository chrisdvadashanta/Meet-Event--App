Feature: Show/Hide Event Details
						
    Scenario: An event element is collapsed by default. 
        Given event element is collapsed by default
        When the user opens the app;
        Then the user should see the list of upcoming events.
    Scenario: User can expand an event to see details. 
        Given event element is collapsed by default
        When the user clicks the show details button
        Then the user should see the event details
    Scenario: User can collapse an event to hide details.
        Given event details are shown
        When the user clicks the hide details button
        Then the user should not see the event details
