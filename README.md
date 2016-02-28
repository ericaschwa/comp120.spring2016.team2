# DIRT: Durham Incident Report Tracker
A simple solution to Tina's problems

Hosted at [dirt.frontfish.net](http://dirt.frontfish.net).
API hosted at [api.dirt.frontfish.net](http://api.dirt.frontfish.net).

Access the API repository [here](https://github.com/tuftsdev/comp120-spring2016-team2-api).
## Goals For Product:

According to Tina, the email feedback form on her institution's website 
is "hardly used".  In creating DIRT,  we aimed to remove as many barriers
the user may have had when reporting incidents in the past.

Since this system will be used for all incidents big and
small, and major incidents should be reported as quickly as possible, 
we created a system that allows for fast incident reporting
and tracking.

In order to streamline the process of reporting and tracking incidents, we used
two primary goals in developing our product:

 - Accessing the system (ie. logging in) should be quick and painless 
 for those that have access to the system.
 - The product should do as much work for the user as possible.  
 The less information the user has to manually add during reporting, the better.
 - The on-call responder should be able to navigate the incident table easily 
  and the reporter should be able to quickly add an incident without 
  having to navigate through menus.

## Interface
- User is immediately prompted to log in
- Home Page only has two options: Report Incidents and View Incidents
- Reporting uses a single-page form
- Viewing is a single table that can be sorted by time, departments, or other
  values

## Data Schema
### Primary tables
- `Incident` store incident information
- `User` store user information

### Enumeration/dictionary tables
- `IncidentType` enumeration of types of incidents
- `Department` enumeration of departments

### Purely relational
- `IncidentIncidentType` relation between Incident and IncidentType
- `IncidentDepartment` relation between Incident and Department

## Technology
### Backend
- Ruby 2.3.0
  - [Sinatra](http://www.sinatrarb.com/)
  - [DataMapper](http://datamapper.org/), an ORM
  - [Unicorn](http://rubygems.org/gems/unicorn/versions/5.0.1) for proxying to NGINX
- MySQL

#### Why Sinatra over Ruby on Rails?
  Though Rails provides a lot of pre-built structures to work with,
  it can be easy to lose sight of what exactly is going on behind-the-scenes.
  Sinatra lacks these structures, and since this app is relatively small, having
  more control over our codebase and spending a little extra time for simplicity's sake
  seems to be an advantage to our group. In addition, one member of our group had 
  experience with Sinatra, whereas no one had experience with Rails.

#### Why MySQL?
  We chose MySQL because of its thorough documentation and active community. Since
  most of the database manipulation is handled by an ORM (Datamapper), PostgreSQL would
  be mostly similar work with.

###Frontend
- Angular
- Google Maps API
- JQuery
- Bootstrap

### Hosting
- [Digital Ocean](http://digitalocean.com) LEMP stack

##MVP Details
- Time spent learning ruby: 1-2 hours
- Time spent implementing MVP: 20 hours

## Live Url
- http://tuftsdev.github.io/comp120-spring2016-team2/index.html

## Unit Testing
Tests can be found in the /features folder of the api repository.  We used Cucumber to create a testing suite for our API.  We are currently testing the GET and POST features of our /incidents, and our tests for editing incidents are a work-in-progress.

### Why Cucumber?
In order to test for as many scenarios as possible, it is important that our tests are easy to understand and are clearly defined. Cucumber allows us to write very comprehensive tests without getting lost in test code because of the .feature file. Though it is more complicated than other test frameworks, we are willing to spend the extra time needed to create a more thorough and easy-to-understand test suite.

Our decision was also influenced by the fact that a member of our team (Max) had experience using Cucumber, and no one else had any experience with the others.


(You will find our unit tests in our API repository [here](https://github.com/tuftsdev/comp120-spring2016-team2-api)).

### User Testing
We asked several people for their input on our current user interface, and most of the feedback given is frontend-specific. Many of them like how the page looks; however, they do see the mostly empty space on the right side of the page as a problem. Suggestions on what to fill the unused space with were made by these users, such as putting a field that helps to see the trend of what is going on in the table. We have taken this feedback and will consider this as we further develop our frontend.

## Considering n Users
Our team has been thinking about how we will ensure that the app can handle 15,000 unique visits per day, once it is in production. As our product stands at this point in the development process, it could not handle that many users. Future improvements that we plan to look into include optimization of static content, especially since a large portion of our product involves static content. We could use Content Delivery Networks to store some of our content, use compression, and also make our static information cachable (via application cache). 

## Contributors
- [Max Ettelson](http://github.com/mdettelson)
- [Chris Hinstorff](http://github.com/chinstorff)
- [Janeth Jepkogei](http://github.com/janethjepkogei)
- [Erica Schwartz](http://github.com/ericaschwa)
- [Norman Young](http://github.com/nyoung01)
