/**
 * Import
 */
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');

require('./models/User');
require('./services/passport');

const app = express();

/**
 * Middlewares
 */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Connection MongoDB
 */
mongoose.connect(keys.mongoURI);

/**
 * Routes
 */
require('./routes/authRoutes')(app);

/**
 * Lancement du serveur
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
