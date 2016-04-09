# DIRT: Durham Incident Report Tracker - Polling and Memory Caching

Hosted at [dirt.frontfish.net](http://dirt.frontfish.net).
API hosted at [api.dirt.frontfish.net](http://api.dirt.frontfish.net).

Access the API repository [here](https://github.com/tuftsdev/comp120-spring2016-team2-api).

## Polling - Design
For this leg, we initially implemented a naive solution, polling the server every 5 seconds 
for new and edited incidents. When new incidents arrive, our frontend will poll the server, and 
a new button will appear at the top right hand side of the page, showing the number of 
new incidents since the last refresh. Once users click the button, the page will refresh, 
the new incidents will show on the page, and the button will disappear.

## Benefits and Costs
The benefit for this design is that it is easy to implement and incorporate into our current structure.
For obvious reasons, this naive design is costly. Since our app will not be used constantly, polling
every 5 seconds (or even every 60 seconds) will mean a lot of data sent back and forth whenever
the page is left open on a browser. When our data becomes large, this can be extremely problematic 
and inefficient.

## Further plans
We are beginning to implement a message queue to replace our current design. This message queue will
act as middleware between our server and frontend, and will take away the necessity of constant polling
from the server. However, it requires more time to fully incorporate into our code.

## Memory Caching - Design

## Benefits and Costs

## Further plans


## Contributors
- [Max Ettelson](http://github.com/mdettelson)
- [Chris Hinstorff](http://github.com/chinstorff)
- [Janeth Jepkogei](http://github.com/janethjepkogei)
- [Erica Schwartz](http://github.com/ericaschwa)
- [Norman Young](http://github.com/nyoung01)