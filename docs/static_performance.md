# DIRT: Durham Incident Report Tracker

###Optimization Techniques
- Used cache manifest files to cache all resources used by our html pages
- Added expires headers to all html pages to allow for caching
- Uglified/minified CSS and Javascript
- Combined Javascript into larger files to reduce calls to our server
- Shrank DOM using an ng-repeat template and pagination
- Removed many extraneous CSS rules

###Tools Used to Measure Performace
 - Google Chrome Developer Tools (particularly the 'audits' and 'network' tabs)
 - YSlow
 
###Performance Improvements
The optimizations we have performed have drastically improved the loading times of our html pages, especially our incident table page.  Before our optimizations, our incident table page loaded approximately 800 incidents in 11.67 seconds.  After our optimizations, load times were reduced to 5.6 seconds.  The other pages saw slight speed improvements, but already loaded quickly before our optimizations.

We were also able to reduce the number of CSS rules in our files significantly.  Using the `purify-css` script, we removed 43.1% of our css rules for our incident table page and 54.9% for our incident report form page.

To see screenshots of our YSLOW audits before and after optimizations, please see the folders titled `/performanceBEFORE` and `/performanceAFTER` (and in appendix A, below).

###Limitations of Github Pages CDN and foreign sources
Since we are hosting our site on Github Pages, we are using the built-in Github Pages CDN.  Though this did save us time during this leg, it does come with some limitations.

The first is that we were unable to add expires header to non-html files.  This is typically done by the server serving the static content. GitHub runs the servers hosting GitHub Pages and does not give us the ability to add expires headers.

Cloudflare, which is managing our DNS and providing additional caching for content, sends the user a cookie called `__cfduid ` for security purposes. It barely affects performance, and the benefit of the Cloudflare caching most likely outweighs the harm of a single cookie.

Another optimization we were unable to complete was scaling images on form.html. The three images that are unscaled are all from maps.gstatic.com (the Google Maps API), and so we cannot control the fact that these images are unscaled.


###Lingering Potential Performance Issues
There are two potential performance issues that we were unable to resolve during this leg.  The first is that we have extraneous CSS rules in all of our CSS files.  We attempted to use the `purify-css` script to solve this problem, but it did not remove all unnecessary rules. The only way to completely resolve this issue would be to manually go through our CSS files and attempt to do what the script should have done.  This requires many man-hours and was unfeasible for our team to complete in only a week's time. We also hope to remove vendor-prefixed CSS rules, as our Chrome audits suggested.

The second potential problem involves adding photo uploads to incident reports.  We plan to use a CDN to store our photos, but we can't be sure how exactly this will affect the performance of our site until it has been fully implemented.

## Appendix A: YSLOW screenshots
![alt-text](/performanceBEFORE/issuereportyslow.png)
