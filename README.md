# DIRT: Durham Incident Report Tracker
A simple solution to Tina's problems

##Goals For Product:

According to Tina, the email feedback form on her institution's website 
is "hardly used".  In creating DIRT,  we aimed to remove as many barriers
the user may have had when reporting incidents in the past.

Since this system will be used for all incidents big and
small, and major incidents should be reported as quickly as possible, 
we created a system that would allow for fast incident reporting
and tracking.

In order to streamline the process of reporting and tracking incidents, we used
two primary goals in developing our product:

 - Accessing the system (ie. logging in) should be quick and painless 
 for those that have access to the system.
 - Do as much work for the user as possible.  The less information the user
has to manually add during reporting, the better.
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
- Ruby 2.3.0
  - [Sinatra](http://www.sinatrarb.com/)
   
   #####Why Sinatra?
   Though Rails provides a lot of pre-built structures to work with,
   it can be easy to lose sight of what exactly is going on behind-the-scenes.
   Sinatra lacks these structures, but since this app is relatively small, having
   more control over our codebase and spending a little extra time for simplicity's sake
   seemed like an advantage for our group.  In addition, one member of our group had 
   experience with Sinatra, whereas no one had experience with Rails.
  - [DataMapper](http://datamapper.org/)
- MySQL

 #####Why MySQL?
   We chose MySQL because of its thorough documentation and active community.
   One member of our group had some experience with MySQL, but this was not a
   deciding factor in our decision.
   

## Contributors
- [Max Ettelson](http://github.com/mdettelson)
- [Chris Hinstorff](http://github.com/chinstorff)
- [Janeth Jepkogei](http://github.com/janethjepkogei)
- [Erica Schwartz](http://github.com/ericaschwa)
- [Norman Young](http://github.com/nyoung01)
