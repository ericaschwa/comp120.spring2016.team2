# DIRT: Durham Incident Report Tracker

###Optimization Techniques
- Used cache manifest files to cache all resources used by our html pages
- Added expires headers to all html pages to allow for caching
- Uglified/minified CSS and Javascript
- Combined Javascript into larger files to reduce calls to our server
- Shrank DOM using an ng-repeat template
- Specified image sizes on index.html
- Removed unnecessary use of cookies
- Removed many extraneous CSS rules

###Tools Used to Measure Performace
 - Google Chrome Developer Tools (particularly the 'audits' tab)
 - YSlow
 
###Performance Improvements
The optimizations we have performed have drastically improved the loading times of our html pages, especially our incident table page.  Before our optimizations, our incident table page loaded approximately 800 incidents in 11.67 seconds.  After our optimizations, load times were reduced to 5.6 seconds.  The other pages saw slight speed improvements, but already loaded quickly before our optimizations.

To see screenshots of our YSLOW audits before and after optimizations, please see the folders titled `performanceBEFORE` and `performanceAFTER`.

###Limitations of Github Pages CDN
Since we are hosting our site on Github Pages, we are using the built-in Github Pages CDN.  Though this did save us time during this leg, it does come with some limitations.

The first is that 


###Lingering Potential Performance Issues
There are two potential performance issues that we were unable to resolve during this leg.  The first is that we have extraneous CSS rules in all of our CSS files.  We attempted to use the `purify-css` script to solve this problem, but it did not remove all unnecessary rules. The only way to completely resolve this issue would be to manually go through our CSS files and attempt to do what the script should have done.  This requires many man-hours and was unfeasible for our team to complete in only a week's time.

The second potential problem involves adding photo uploads to incident reports.  We plan to use a CDN to store our photos, but we can't be sure how exactly this will affect the performance of our site until it has been fully implemented.






One optimization for future consideration is, "Reduce the Number of DOM Elements." The reason why we fail this check is because our database currently contains over 800 incidents, and all of them are displayed on the issuedisplay3.html page. Because of this, there is a huge number of DOM elements. There is not much we can do about this, given the interface that our page currently has. We predict that when this page is eventually used, it is highly unlikely that there will ever be over 800 unresolved incidents (or even, over 50). Because of this, the number of DOM elements is unlikely to be an issue. However, we did discuss paginating the results when they reach a certain threshold (possibly limiting each page to 20 incidents), which would ensure that our DOM is limited regardless of the amount of data we get from the server.

One optimization that we did make, although yslow did not sense it, was the use of a CDN. yslow by default does not recognize gh-pages as a CDN. However, once we added github pages as a CDN, our grade on this parameter went up to an A. Other domains that yslow failed to identify as CDNs include maps.gstatic.com (from form.html), maps.googleapis.com (from form.html and issuedisplay3.html), and ajax.googleapis.com (from all pages). We do not have control over the CDN status of these pages, as we do not host them.

Although gh-pages did not permit us to make a couple of the optimizations present on the yslow, we concluded that it is still worth using, because of all of the benefits it offers us, especially its CDN.
