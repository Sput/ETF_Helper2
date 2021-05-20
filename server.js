require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const etf_weekly = require('./models/etf_weekly');
const axios = require('axios');

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




app.get('/ETFs/weekly', (req, res) => {
  res.render('ETFs/weekly');
});

app.get('/ETFs/new', (req, res) => {
  res.render('ETFs/new');
});




app.get('/ETFs', (req, res) => {
  db.etf_weekly3.findAll()
  .then (etf_weekly3s => { 
    console.log(etf_weekly3s)
    res.render('ETFs/index', {etf_weekly3s});
  })
})



app.post('/ETFs/weekly', async (req, res) => {
  const [ticker, currentLowend, currentHighend, trend] = [req.body.ticker, req.body.high_end, req.body.low_end, req.body.trend]
  //const {ticker, currentHighend, currentLowend} = req.body;
  const ticker_for_api = req.body.ticker;
  const upper = req.body.high_end;
  const lower = req.body.low_end;
  URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker_for_api}&apikey=BTMZPVP11OHBO0FJ`
  axios.get(URL)
  .then(response => {
    const ticker_data = response.data;
    const price = ticker_data['Global Quote']["05. price"]
    const ratio = ((price-lower) / (upper - lower)).toFixed(2);
    db.etf_weekly3.create({ticker: ticker, high_end: currentHighend, low_end: currentLowend, trend:trend, current_price:price, ratio:ratio})
    .then (newTicker=> console.log(newTicker));
    
    res.redirect('/ETFs')
  
  })
  
  
})




app.post('/ETFs/new', async (req, res) => {
  const [symbol, long_name, industry] = [req.body.symbol, req.body.long_name, req.body.industry]
  //const {ticker, currentHighend, currentLowend} = req.body;
  console.log(symbol, long_name, industry);
  const newTicker = await db.etfData.create({symbol: symbol, long_name: long_name, industry: industry});
  res.redirect('/ETFs')
})

app.use('/auth', require('./controllers/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
