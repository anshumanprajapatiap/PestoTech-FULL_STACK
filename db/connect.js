
const mongoose = require('mongoose')
// const {dbName, dbHost, password, method, projectName, instanceName} = require('../PasswordMongoDB')

// const connectingString = `${method}://${dbHost}:${password}@${projectName}.${instanceName}/${dbName}?retryWrites=true&w=majority`;

const connectDB = (url) =>{
    return mongoose
    .connect(url)
    .then(()=>console.log('CONNECTED TO DATABASE'))
    .catch((err)=>console.log(`Error ${err}`))
}

module.exports = connectDB
