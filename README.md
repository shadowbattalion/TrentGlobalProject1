
#  Car Park Finder
## Summary
This project aims to help drivers find and monitor car park capacity in Singapore so that they can plan their journey better.

<ins>Organisation goals:</ins>
 - Awareness of the traffic condition to make the journey on the road safe for the users and other drivers
	 - Driving safe includes being able to plan the journey well.

<ins>User goals:</ins>
 - Able to monitor and get data of car parks before starting the journey so that they know where to park once they reach the location.
 - Able to find the next best location to park if the intended car park is full. 
	 - Let's say the user have reached the location and the car park he intended to go happens to be full, he can check the app to find the next best location to park his vehicle without wasting time searching for it.
	 - Target Audiences: Drivers, especially car, lorry and motorbike drivers, as the API cater only to the three types of vehicles.

<ins>Motivation</ins>

This project is good, perhaps necessary for drivers in Singapore if they wish to have a smooth journey from start to end. We rarely consider car park spaces as part of planning our journey before driving.

 Bad planning before driving often leads to inconvenience or even danger to the user and other drivers on the road. It may also lead to unnecessary traffic congestion near the car parks in the event of functions or massive ceremonies.

<ins>URL to website</ins>

https://shadowbattalion.github.io/TrentGlobalProject1/



## Project Complexity

<ins>Dynamic Map Application</ins>

| Items | Quantity | Possible Score per Instance | Maximum | Total |
|--|--|--|--|--|
| Consume the GET endpoint of an API, or consume a CSV/JSON file | 3 |	 5| 12| 12 |
| Adding or removing DOM elements to the display(map, DOM tree, game screen) base on user's actions | 1 |8 | 20| 8 |
| Modifying the CSS of DOM elements based on the user's actions | 2 |5 | 12 | 10 |
| Use of 1D traversal of array | 3 |10| 15 | 15 |
| Each use of CSS layout technique (Bootstrap columns, flex box, grid) | 6 |	5 | 12 | 12 |
| Each case of the map updating base on the user's actions | 2  |5 | 12 | 10 |
| Each group of layers in the Leaflet map | 2 |	8 | 20 | 16 |
| Each group of marker clustering | 1 |	5 | 12 | 5 |
| Each type of custom marker (using images or custom behaviour) | 3 (time interval inclusive) |	8 | 20 | 20 |


<ins>Bonus</ins>

| Items | Quantity | Possible Score per Instance | Maximum | Total |
|--|--|--|--|--|
| Single Page Application | 1 | 15 | 15 | 15 |
|Use of model view controller|1|20|20|20|



## Technology Used

 - Axios
	 - It is a technology used to give the program HTTP client capability
	 - Purpose: It used to make HTTP requests to APIs/URLs to retrieve data from the server
	 - https://github.com/axios/axios

 - Foursquare
	 - A technology that provides the users location information of places that are searched. 
	 - Purpose: Provides location information of searched places like the latitude and longitude which can be used in conjunction with libraries like Leaflet to print markers on the map.
	 - https://foursquare.com/

 - Leaflet/Leaflet Clustering
	 - An interactive map where users can mark location based on longitude and latitudes. It also have utilities to customize and enhance the usage
	 - Clustering is a technology which will cluster nearby markers based on zoom level into one consolidated marker
	 - Purpose: Used to visualise the map and make it more interactive
	 - https://github.com/Leaflet/Leaflet

 - OpenStreetMap
	 - A community owned map that has underlying geodata which can be used by other libraries to manipulate it. It is what Leaflet is based on.
	 - Purpose: A map created by the community so that it can be used universally 
	 - https://www.openstreetmap.org/

 - SVY21 converter
	 - Latitude and longitude are using the WGS 84 format. The car park data from data.gov.sg are useing the SVY21 format. This library can convert from SVY21 to WSG84
	 - Purpose: Used to convert SVY21 coordinates to WGS 84 which can then be accepted as parameters by Leaflet markers
	 - https://github.com/cgcai/SVY21/tree/master/Javascript

 - Bootstrap CSS
	 - A library which has pre-made css components
	 - Purpose: for fast building of CSS on websites
	 - https://getbootstrap.com/

 - Google Fonts
	 - Additional fonts for HTML
	 - https://fonts.google.com/

## UI/UX
### Stratergy

<ins> User Stories </ins>

As a **driver**
I want to **find out the next best place to park my vehicle nearby**
So that **I can have backup options if the first chosen car park is full**

As a **car driver**
I want to **check out if the car park is full before reaching the destination**
So that **I can plan my travel**

As a **motorbike rider**
I want to **check if the the motorbike park is full or available before reaching the destination**
So that **I can plan my travel. Some car park have no motorbike section**

As a **lorry driver**
I want to **check if the the heavy vehicles park is full or available before reaching the destination**
So that **I can plan my travel. Not many places have heavy vehicles section**

<ins> Acceptance Criteria <ins>
	
<br>
<br>

### Scope
	
#### <ins> Functional requirements </ins>

 - Input
	 - User enters a location name to search.
 - Process
	 - Using Foursquare API, the search query can be sent to the API and the API will reply with a set of search results
 - Output
	 - A list of search results will be printed

<br>
	
 - Input
	 - User click on one of the places in the search result list
 - Process
	 -  The program will get the coordinates and bring the user to the specified location on the map
	 -  Car park status will be retrieved and will be marked on the map as well
	 - Car park markers will be located nearby the location of the chosen place
 - Output
	 -  User will be able to obtain the information of the place chosen and the car parks surrounding the place

<br>
	
Further user actions

 - Input
	 - User can choose the search area of car park, based on the radius
 - Process
	 - The program will get the radius and add to the coordinates of the chosen place and only includes the car parks within the radius
 - Output
	 - New car park markers will be revealed for users reference 
	
<br>
 
#### <ins> Non-functional requirements </ins>
	
 - Performance: the markers on the map should load fast and the user should be able to get the status of every car park in the area at a glance.
 - Mobile responsiveness: Should look clear and easy to read as user might need to decide the next best car park location while in the vehicle (while stopping somewhere)
 - Localization criteria: Only applicable in Singapore as the car park information are taken from the local government API
 - Accessibility criteria: Targert users are fit drivers
 - Not applicable:
 - Privacy: No user information will be needed
 - Security: Security is based on the server that provides the API. 
	

<br>
<br>
	
### Structure
Linear Structure

Information will be organised in a way that there is a minimal obstruction to the map as much as possible
		
<br>
<br>
	
### Skeleton
The idea of simplicity and fast interaction for users in order to get the information at a quick glance
	
##  Testing

| Test Case # | Test Case Description |Test Steps|Expected Result|
|--|--|--|--|
| 1 | User accesses the main URL | <ol><li>Go to https://shadowbattalion.github.io/TrentGlobalProject1/ </li></ol> | The website should appear with the welcome banner and a map for its background. There should be a button with magnifying glass on top left/right corner of the website ; depends on the screen size of the device  |
| 2| User searches for location and its nearby car parks statuses  |<ol><li>Click on the search icon (magnifying-glass)</li><li>Type in search query and click on search</li><li>Click on one of the locations from the search results</li></ol>|The website will "flyto" the specified location and will show the nearby car park icon markers. The icon will show how occupied each car park is, based on the image of the icon.|
| 3|  User wants to know more about the car park|<ol><li>Click on the car park icon</li><li>Navigate through the tabs</li></ol> |A popup will open and will show 4 tabs which users can choose from to understand the car park situation.|
| 4| User wants the car park search to cover a bigger radius  |<ol><li>Click on the radius buttons</li></ol>|The circle around the chosen location will expand/contract based on the radius that user has chosen and the car park icons will appear disappear correspondingly.|
| 5a| User wants to look for another location|||
| 5b| |||

	

## Credits
| Acknowledgements | Link |
|--|--|
| Axios | https://github.com/axios/axios|
|Foursquare| https://foursquare.com/ |
|Leaflet/Leaflet Clustering|https://github.com/Leaflet/Leaflet|
|OpenStreetMap|https://www.openstreetmap.org/|
|Map Box|https://www.mapbox.com/|
|SVY21 converter|https://github.com/cgcai/SVY21/tree/master/Javascript|
|HDB Car Park|https://data.gov.sg/dataset/hdb-carpark-information|
|Car Park Availability|https://data.gov.sg/dataset/carpark-availability|
|Bootstrap CSS|https://getbootstrap.com/|
|Google Fonts|https://fonts.google.com/|



