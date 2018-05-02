const express = require('express')
const pg = require('pg')

const app = express()
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
const pool = new pg.Pool()

//Starts Juan's Code
var path = require('path');
  // bodyParser = require('body-parser'),
  // cons = require('consolidate'),
  // dust = require('dustjs-helpers');

var Pool = require('pg').Pool;
var config = {
  host: 'work-samples-db.cx4wctygygyq.us-east-1.rds.amazonaws.com',
  user: 'readonly',
  password: 'w2UIO@#bg532!',
  database: 'work_samples',
  port: 5432
};
var pool02 = new Pool(config);
async function get_hits() {
  var response = await pool02.query("select * from information_schema.collations LIMIT 3");
  console.log(response.rows);
  //  document.write(response.rows);
}
get_hits();

//Finishes Juan's Code

const queryHandler = (req, res, next) => {
  pool02.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

app.get('/', (req, res) => {
  res.send('Welcome to Messy Works 😎')
  console.log('Test');
  
})

app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  let id=next;
  res.send(`
        <html>
            <body style="background:red">
                <h1>The user id is ${id}</h1>
            </body>
        </html>
  `);
  return next()
}, queryHandler)

app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
