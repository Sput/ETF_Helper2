const db = require('./models');


const findData = () => {
    db.etfData.findAll()
    .then(foundData =>{
        console.log(foundData)
    })
}
findData()