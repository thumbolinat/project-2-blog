const path = require('path'); 
const express = require('express');
const router = require('express').Router();
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
  secret: 'Super secret secret',
  cookie: {}, // 5 min
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    //checkExpirationInterval: 5 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    //expiration: 1 * 5 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
  })
};

app.use(session(sess));

// tell Handlebars.js about the helpers file
const helpers = require('./utils/helpers'); // for help formatting dates

// pass the helpers to the existing exphbs.create() statement
const hbs = exphbs.create({ helpers });



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // link static files

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));

  });
