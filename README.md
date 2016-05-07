# DIRT: Durham Incident Report Tracker
A simple solution to Tina's problems

Hosted at [dirt.frontfish.net](http://dirt.frontfish.net).
API hosted at [api.dirt.frontfish.net](http://api.dirt.frontfish.net).

Access the API repository [here](https://github.com/chinstorff/dirt-api).
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
  - [Cucumber](https://cucumber.io) for API testing
  - [Amazon Web Services Ruby SDK](https://aws.amazon.com/sdk-for-ruby/) for uploading and retrieving photos from S3
- MySQL
- [Amazon S3](https://aws.amazon.com/s3/) for photo storage
- [RabbitMQ](https://www.rabbitmq.com/)

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
- [RabbitMQ](https://www.rabbitmq.com/)

### Hosting
- [Digital Ocean](http://digitalocean.com) LEMP stack

## MVP Details
- Time spent learning ruby: 1-2 hours
- Time spent implementing MVP: 20 hours

##API Design choices
We built our API using sinatra.  We chose Sinatra because of it is very
lightweight compared to Rails and therefore easier to manage for a simple
CRUD application like DIRT.  We built an API at the beginning of our
project because it allows for complete separation of concerns between
the frontend and the backend.  This separation means creating new interfaces
(ie. mobile web, iOS/Android app, etc) doesn't require any adjustments to be
made on the server side.  We also planned to create a refresh-free version of
our interface in the future, and this is very easy to implement
when using an API. 

### User Testing
We asked several people for their input on our current user interface, and most of the feedback given is frontend-specific. Many of them like how the page looks; however, they do see the mostly empty space on the right side of the page as a problem. Suggestions on what to fill the unused space with were made by these users, such as putting a field that helps to see the trend of what is going on in the table. We have taken this feedback and will consider this as we further develop our frontend.

### Static Content Optimization
Initially our website was really slow, loading about 800 incidents in 11.67 seconds. We therefore decided to perform some static content optimization, and when that was done we saw a great improvement of about 50%; the current issue display page now loads the same number of incidents in 5.6 seconds. Our optimization was performed using the following techniques: removing expired pages, uglifying and minifying css and htlm pages, combining all our javascript files and introducing pagination in the issue display page. Some of the tools that we used were Yslow and Google Chrome development tools(the audits and the network tab).

### Photo Uploading
After researching possible ways to deal with them, our team decided to use S3 to store images that the user can upload with an incident.  Instead of using our server as a middleman between client and S3, we originally wanted to retrieve a one-time-use upload link from S3 that would be passed to the front-end.  Using this method, however, proved much more complicated than anticipated due to poor documentation.  We are currently passing images from our front-end to our API, which then uploads the files to S3 and stores a link to the image in our database as part of the corresponding incident.  The link allows anyone with it to view the image.  File sizes are limited via nginx.

## Final Leg: RabbitMQ and Digital Ocean

### Message Queues
For the final leg of this project, our team decided to implement message queue middleware. Message queues allow for further decoupling of the backend from the frontend and scalability. This also helps efficiency of information flow whenever there are spikes in the number of users using our app. 

### RabbitMQ
RabbitMQ is a messaging broker that offers a common platform for our frontend and backend to send and receive messages. RabbitMQ uses the technology of websockets, so it makes real-time communications between our frontend and backend possible, and replaces our previous need to poll the server every few seconds. Some features that RabbitMQ offers include reliability, flexible routing, and a variety of plugins for specific needs. For our frontend, we had to use the Web-Stomp Plugin, which makes it possible to use RabbitMQ from web browsers by exposing the STOMP protocol over websockets. By using this plugin, we can simply follow the STOMP protocol to receive incoming messages from the backend. For our backend, we simply create a queue called "incidents" for each client we are communicating with, and send new and edited incidents through a fanout exchange (the fanout exchange simply a type of routing that sends the same information to every queue).

### Digital Ocean
Several weeks before the final project was due, we noticed some inconsistencies with the server that was hosting our backend. We decided to use digital ocean to host and redo the server-side of the app. We did this as a team so that more members would get experience with setting up a server, and so that we would produce a server we can all understand and access. Furthermore, creating this server allowed us to demonstrate how easy it was to swap out one server with another, without needing to change things about the frontend or RabbitMQ. This highlights the independence of the backend and frontend and modularity that RabbitMQ implies.


## Contributors
- [Max Ettelson](http://github.com/mdettelson)
- [Chris Hinstorff](http://github.com/chinstorff)
- [Janeth Jepkogei](http://github.com/janethjepkogei)
- [Erica Schwartz](http://github.com/ericaschwa)
- [Norman Young](http://github.com/nyoung01)
