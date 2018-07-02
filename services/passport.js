const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // permet le chemin relatif de callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id } = profile;
      const existingUser = await User.findOne({ googleId: id });

      if (existingUser) {
        return done(null, existingUser);
      }

      // On ne trouve pas d'user correspondant a l'id, on en crée un nouveau
      const newUser = await new User({ googleId: id }).save();
      done(null, newUser);
    }
  )
);
