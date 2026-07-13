const bcrypt = require("bcrypt");
const User = require("../models/User");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        done(null, false);
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
