# DIRT: Durham Incident Report Tracker - Polling and Memory Caching

Hosted at [dirt.frontfish.net](http://dirt.frontfish.net).
API hosted at [api.dirt.frontfish.net](http://api.dirt.frontfish.net).

Access the API repository [here](https://github.com/tuftsdev/comp120-spring2016-team2-api).

## Design
For this leg, we initially implemented a naive solution, polling the server every 5 seconds  for the most recently created and edited incidents. When new incidents arrive, our frontend will poll the server, and a new button will appear at the top right hand side of the page, showing the number of new incidents since the last refresh. Once users click the button, the page will refresh, the new incidents will show on the page, and the button will disappear. For caching, we are currently implementing a message queue service by using RabbitMQ. Information will be stored in this intermediary queue, with the frontend receiving information and the backend sending it. This will, once fully implemented, make it so that there is no longer a need to poll the server every 5 seconds; incidents will instead be updated automatically through the use of web sockets. 


## Benefits, Costs, and Future Plans
We chose to use our current polling solution because it was easy to implement and incorporate into our current structure.  Only small adjustments were made on both the front and back end.
For obvious reasons, this naive design is costly. Since our app will not be used constantly, polling every 5 seconds (or even every 60 seconds) means a lot of data will be sent back and forth whenever the page is left open in a browser. As size of our dataset increases, this can become extremely problematic and inefficient.

We hope to soon finish implementing a message queue (RabbitMQ). The main cost of this system was our time; we spent an extremely long amount of time researching, implementing, and debugging our RabbitMQ code. The benefit is that it will save us the necessity of polling our server every 5 seconds; this is a huge benefit, and will increase our efficiency. Also, there will not even be a 5 second delay when updating; our updates will occur immediately and automatically.

## Caching
We are still in the process of inocorporating RabbitMQ: a message queue, into our current design. The backend code for RabbitMQ is fully written, as is the frontend code, but RabbitMQ is not yet fully integrated between the backend and frontend. It should be in the next couple of days, but currently it is not because we faced a lot of issues with finding RabbitMQ examples and resources for frontend code. We ended up deciding to use Stomp, and are currently implementing that. The frontend code for rabbitMQ is in our issuedisplayController3.js file, and in our stomp.js file, and you can look at that code and test it locally via a homebrew RabbitMQ installation. 

RabbitMQ is a message queue that will act as middleware between our server and frontend, and will take away the necessity of constant polling from the server. The server will send data of new and edited incidents to the message queue, and the frontend will receive the cached information from the other end of the queue. However, it requires more time to fully incorporate into our code, as it requires some restructuring.


## Contributors
- [Max Ettelson](http://github.com/mdettelson)
- [Chris Hinstorff](http://github.com/chinstorff)
- [Janeth Jepkogei](http://github.com/janethjepkogei)
- [Erica Schwartz](http://github.com/ericaschwa)
- [Norman Young](http://github.com/nyoung01)

