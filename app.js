require('dotenv').config();
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const passportConfig = require('./config/passport');
const Household = require('./models/Household');

const app = express();


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost/ssh_app' }),
  })
);


app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);


app.use(async (req, res, next) => {
  res.locals.activePage = '';
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.info_msg = req.flash('info_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;

  if (req.user) {
    try {
      const household = await Household.findById(req.user.household).lean();
      res.locals.household = household;
    } catch (err) {
      console.error('Error fetching household:', err);
      res.locals.household = null;
    }
  }

  next();
});


const authRoutes = require('./routes/auth');
const sshRoutes = require('./routes/ssh');
app.use('/', authRoutes);
app.use('/ssh', sshRoutes);

module.exports = app;
