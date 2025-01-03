const mongoose = require('mongoose');
// process.env.NODE_ENV
const connectDatabase = () => {
    // DB__LOCAL_URI
    
    mongoose.connect(process.env.DB_URI).then(con => {
        console.log(`MongoDB connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;