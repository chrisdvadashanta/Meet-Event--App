# meet
## Meet App for events in cities
** Deployed here: [title] (https://chrisdvadashanta.github.io/meet/) **

---

## Usage of serverless function:
These functions will be used with AWS and lambda to create a progressive web app functioning "without" a backend for a serverless web app.
The process of users pulling data through an existing API (the Google Calendar) and showing events nearby, by selecting the location, the serverless function will ensure fast response time for the app to show these events and their details to the user. The app is easy to scale and to deploy and as the data is not to sensitive 9public events) it doesn't need to be stored on an owned server. 

User Stories
User Story definition:
As a [role],
I should be able to [action]
So that [benefit].

### Feature 1: Filter Events By City
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.
### Feature 2: Show/Hide Event Details
As a user,
I should be able to show and hide Event Details
So that I can see the Details of each event.
### Feature 3: Specify Number of Events
As a user,
I should be able to only see a specific Numer of Events
So that I can see a list of Events with a certain number.
### Feature 4: Use the App When Offline
As a user,
I should be able to use the app when offline,
So that I don't need the Internet to access the app.
### Feature 5: Add an App Shortcut to the Home Screen
As a user,
I should be able to add an app shortcut to my home screen,
So that I can access the app fast.
### Feature 6: Display Charts Visualizing Event Details
As a user,
I should be able to display charts visualizing event details.
So that I can have an overview within a chart.



## Scenarios						
### Feature 1: Filter Events By City						
Scenario 1: When the user hasn’t searched for a city, show upcoming events from all cities. 
Scenario 2: User should see a list of suggestions when they search for a city.
Scenario 3: User can select a city from the suggested list.
						
### Feature 2: Show/Hide Event Details
Scenario 1: An event element is collapsed by default. 
Scenario 2: User can expand an event to see details. 
Scenario 3: User can collapse an event to hide details.
						
### Feature 3: Specify Number of Events
Scenario 1: When the user hasn’t specified a number, 32 events are shown by default. 
Scenario 2: User can change the number of events displayed.
						
### Feature 4: Use the App When Offline
Scenario 1: Show cached data when there’s no internet connection.
Scenario 2: Show error when the user changes search settings (city, number of events).
						
### Feature 5: Add an App Shortcut to the Home Screen
Scenario 1: User can install the meet app as a shortcut on their device home screen.
						
### Feature 6: Display Charts Visualizing Event Details						
Scenario 1: Show a chart with the number of upcoming events in each city. 
					
				
	
