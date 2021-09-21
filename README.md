# TrentGlobalProject1
## UI/UX
### Stratergy

#### <ins> User Stories </ins>

<p> As a **driver**
    I want to **find out the next best place to park my vehicle nearby**
    So that **I can have backup options if the first chosen car park is full** </p>

<p> As a **car driver**
    I want to **check out if the car park is full before reaching the destination**
    So that **I can plan my travel** </p>

<p> As a **motorbike rider**
    I want to **check if the the motorbike park is full or available before reaching the destination**
    So that **I can plan my travel. Some car park have no motorbike section** </p>

<p> As a **lorry driver**
    I want to **check if the the heavy vehicles park is full or available before reaching the destination**
    So that **I can plan my travel. Not many places have heavy vehicles section** </p>

#### <ins> Acceptance Criteria <ins>
	
<br>
<br>

### Scope
	
#### <ins> Functional requirements </ins>
	
* Input
	* User enters a location name to search.
* Process
	* Using Foursquare API, the search query can be sent to the API and the API will reply with a set of search results
* Output
	* A list of search results will be printed
<br>
	
* Input
	* User click on one of the places in the search result list
* Process
	* The program will get the coordinates and bring the user to the specified location on the map
	* Car park status will be retrieved and will be marked on the map as well
	* Car park markers will be located nearby the location of the chosen place
*Output
	*User will be able to obtain the information of the place chosen and the car parks surrounding the place
<br>
	
Further user actions
* Input
	* User can choose the search area of car park, based on the radius
* Process
	* The program will get the radius and add to the coordinates of the chosen place and only includes the car parks within the radius
* Output
	* New car park markers will be revealed for users reference 
	
<br>
 
#### <ins> Non-functional requirements </ins>
	
* Performance: the markers on the map should load fast and the user should be able to get the status of every car park in the area at a glance.
* Mobile responsiveness: Should look clear and easy to read as user might need to decide the next best car park location while in the vehicle (while stopping somewhere)
* Localization criteria: Only applicable in Singapore as the car park information are taken from the local government API
* Accessibility criteria: Targert users are fit drivers
* Not applicable:
  * Privacy: No user information will be needed
  * Security: Security is based on the server that provides the API. 
