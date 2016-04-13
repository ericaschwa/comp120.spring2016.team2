# DIRT: Durham Incident Report Tracker - Polling and Memory Caching

Hosted at [dirt.frontfish.net](http://dirt.frontfish.net).
API hosted at [api.dirt.frontfish.net](http://api.dirt.frontfish.net).

Access the API repository [here](https://github.com/tuftsdev/comp120-spring2016-team2-api).

## Design
For this leg, we initially implemented a naive solution, polling the server every 5 seconds 
for the most recently created and edited incidents. When new incidents arrive, our frontend will poll the server, and a new button will appear at the top right hand side of the page, showing the number of new incidents since the last refresh. Once users click the button, the page will refresh, the new incidents will show on the page, and the button will disappear. For caching, we are currently implementing a message queue service by using RabbitMQ. Information will be stored in this intermediary queue, with the frontend receiving information and the backend sending it.

## Benefits, Costs and Future Plans
We chose to use our current polling solution because it was easy to implement and incorporate into our current structure.  Only small adjustments were made on both the front and back end.
For obvious reasons, this naive design is costly. Since our app will not be used constantly, polling every 5 seconds (or even every 60 seconds) means a lot of data will be sent back and forth whenever the page is left open in a browser. As size of our dataset increases, this can become extremely problematic and inefficient.
We are still in the process of inocorporating a message queue into our current design. This message queue will act as middleware between our server and frontend, and will take away the necessity of constant polling from the server. The server will send data of new and edited incidents to the message queue, and the frontend will receive the cached information from the other end of the queue. However, it requires more time to fully incorporate into our code, as it requires some restructuring.


## Contributors
- [Max Ettelson](http://github.com/mdettelson)
- [Chris Hinstorff](http://github.com/chinstorff)
- [Janeth Jepkogei](http://github.com/janethjepkogei)
- [Erica Schwartz](http://github.com/ericaschwa)
- [Norman Young](http://github.com/nyoung01)

