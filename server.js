require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const axios = require('axios');

const SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.get('/etfs/weekly', (req, res) => {
  res.render('etfs/weekly');
});

app.get('/etfs/new', (req, res) => {
  res.render('etfs/new');
});

app.get('/etfs', (req, res) => {
  db.etf_weekly3.findAll()
  .then (etf_weekly3s => { 
    console.log(etf_weekly3s)
    res.render('etfs/index', {etf_weekly3s});
  })
})

app.get('/etfs/myetfs', (req, res) => {
  db.etfdata.findAll()
  .then (etfdatas => { 
    console.log(etfdatas)
    res.render('etfs/myetfs', {etfdatas});
  })
})

app.delete('/etfs/myetfs/entryId', (req, res) => {
  const etfToDelete = await db.etfdata.Destroy({
    where: {
      entryId: req.body.entryId
    }

  })
  res.redirect("/etfs/myetfs");
});

app.get('/etfs/edit', (req, res) => {
  res.render('etfs/edit');
});


router.put('/etfs/myetfs/entryId', function (req, res) {
  const symbol = req.body.symbol;
  const longName = req.body.longName;
  const industry = req.body.industry;

  const etfToUpdate = await db.etfdata.update({ symbol: 'symbol' })
    where: {
      symbol: req.body.symbol
    }

  const etfToUpdate = await db.etfdata.update({ longName: 'longName' })
    where: {
      longName: req.body.longName
    }
    const etfToUpdate = await db.etfdata.update({ industry: 'industry' })
    where: {
      industry: req.body.industry
    }

  )
  res.redirect("/etfs/myetfs");
});


const API_KEY = process.env.API_KEY;

app.post('/etfs/weekly', async (req, res) => {
  const [ticker, currentLowend, currentHighend, trend] = [req.body.ticker, req.body.highEnd, req.body.lowEnd, req.body.trend]
  //const {ticker, currentHighend, currentLowend} = req.body;
  console.log(req.body)
  const ticker_for_api = req.body.ticker;
  const upper = req.body.highEnd;
  const lower = req.body.lowEnd;
  URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker_for_api}&apikey=${API_KEY}`
  axios.get(URL)
  .then(response => {
    const tickerData = response.data;
    const price = tickerData['Global Quote']["05. price"]
    const ratio = ((price-lower) / (upper - lower)).toFixed(2);
    db.etf_weekly3.create({ticker: ticker, highEnd: currentHighend, lowEnd: currentLowend, trend:trend, currentPrice:price, ratio:ratio})
    .then(newTicker=> console.log(newTicker));
    res.redirect('/etfs')
  })  
})

app.post('/etfs/new', async (req, res) => {
  const [symbol, long_name, industry] = [req.body.symbol, req.body.long_name, req.body.industry]
  //const {ticker, currentHighend, currentLowend} = req.body;
  console.log(symbol, long_name, industry);
  const newTicker = await db.etfData.create({symbol: symbol, long_name: long_name, industry: industry});
  res.redirect('/etfs')
})

app.use('/auth', require('./controllers/auth'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
