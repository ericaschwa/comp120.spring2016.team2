# DIRT
Durham Incident Report Tracker: A simple solution to Tina's problems

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

## Interface
- Simple and clean to avoid distraction
- User is immediately prompted to log in
- Home Page only has two options: Report Incidents and View Incidents
- Reporting uses a single-page form
- Viewing is a single table that can be sorted by time, departments, or other
  values

## Technology
- Ruby 2.3.0
  - Sinatra
  - DataMapper
- MySQL

## Contributors
- Max Ettelson
- Chris Hinstorff
- Janeth Jepkogei Rotich
- Erica Schwartz
- Norman Young
