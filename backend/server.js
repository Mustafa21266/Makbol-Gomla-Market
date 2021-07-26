const app = require('./app');
const connectDatabase = require('./config/database');
//Handle Uncaught Exception Errors
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    server.close(()=>{
        process.exit(1);
    })
})


//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})


///////////////////////////dotenv config
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path: "backend/config/config.env"})

//Handling unhandled promise rejeection error
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
})