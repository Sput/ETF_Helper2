const axios = require('axios');
const ticker_for_api = 'XLF';
const 


URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker_for_api}&apikey=BTMZPVP11OHBO0FJ`
axios.get(URL)
.then(response => {
    console.log('*************************');
    console.log(response.data);
    const ticker_data = response.data;
    console.log('*************************');
    console.log(ticker_data)
});