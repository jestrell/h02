Remain Problems 

7.-"Server-side": Provide pagination and ways to access different "pages" by various "page-sizes" for the /stats/hourly endpoint. Think from an API user's perspective to achieve a good balance of flexibility and convenience.

8.-"Server-side": Implement rate limiting on one or more of the API endpoints. This is a fairly open-ended problem. If you choose to implement this, the only requirement is not to use a too obviously off-the-shelf solution such as https://flask-limiter.readthedocs.io/en/stable/ or https://www.npmjs.com/package/express-rate-limit (or one of the API gateway services).

9.-"Client-side": Implement a user interface with React.js that uses the API endpoints to provide visualizations including one or more types of charts, and a data table that works with the server-side pagination implemented in problem 7.

10.-"Geo Visualization":
Implement a map-based visualization leveraging "poi_id" column that exists in both "hourly_events" as well as "hourly_stats" tables, which can be joined with the "poi" table for their actual latitudes ("poi.lat" column) and longitudes ("poi.lon" column). The visualization should demonstrate the "intensity" of a user selected metrics (for example, "impressions") of a user selected date/time range. This problem would require modification of existing /stats/* and /events/* series of endpoints on the API side. You can check out the return of the /poi endpoint to understand what metadata are available from the "poi" table.
