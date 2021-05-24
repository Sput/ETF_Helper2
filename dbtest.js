const db = require('./models');

function fetchCars () {
    db.etfData.findAll()
    .then(cars => {
        console.log(cars);
    })
    .catch(err => {
        console.log(err);
    })
}
 fetchCars();