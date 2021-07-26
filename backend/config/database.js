const mongoose = require('mongoose');

const connectDatabase = () => {
    // DB__LOCAL_URI
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;