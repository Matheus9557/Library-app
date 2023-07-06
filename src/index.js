const fs = require('fs');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const flash = require('connect-flash');
const dotenv = require('dotenv').config();
const SQLiteStore = require('connect-sqlite3')(session);
const { isCelebrateError } = require('celebrate');
const { serve, setup } = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const routes = require('./routes');
const Seed = require('./seeders');
const Migration = require('./migrations');
const { dbFile } = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(logger('tiny'));
app.use(cookieParser());
app.use(flash());
  session({
    store: new SQLiteStore(),
    secret: process.env.SECRET_KEY,
    name: 'sessionId',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  });

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library App API',
      version: '1.0.0',
      description: 'API documentation for the Library App',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', serve, setup(swaggerDocs));

app.set('view engine', 'njk');

nunjucks.configure('src/views', {
  express: app,
  autoescape: true,
  noCache: true,
});

(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();
    await Seed.up();
  }
})();

app.use(routes);

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

app.use((err, req, res, next) => {
  console.log(err);

  if (isCelebrateError(err)) {
    const message =
      err.message +
      ': ' +
      Object.fromEntries(err.details).body.details[0].message;
    if (!req.originalUrl.includes('api')) {
      // joi error comes from the web app, so redirect with a flash
      req.flash('error', message);
      return res.redirect(req.originalUrl);
    }

    // joi error comes from an API request, so send an error response
    return res.status(400).json({ error: message });
  } else {
    res.status(500).send('Internal server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Library App is running!');
});
