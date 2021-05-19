require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
//PP middlware
app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session


app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());            // flash middleware

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/historic/historic', (req, res) => {
  res.render('historic/historic');
});

app.get('/historic', async (req, res) => {
  const fetchTickers = await db.historic.findAll();
  res.render('historic/index', {historics: fetchTickers});
})

app.post('/historic/historic', async (req, res) => {
  const {ticker, currentHighend, currentLowend} = req.body;
  console.log(ticker, currentHighend, currentLowend);
  const newTicker = await db.historic.create({ticker: ticker, currentHighend: currentHighend, currentLowend: currentLowend});
  console.log(newTicker);
  res.redirect('/historic')
})

app.use('/auth', require('./controllers/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
