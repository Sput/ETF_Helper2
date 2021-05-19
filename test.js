const db = require('./models');


const findData = () => {
    db.etfdata.findAll()
    .then(foundData =>{
        console.log(foundData)
    })
}
findData()