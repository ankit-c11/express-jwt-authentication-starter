const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.CONNECTION_URL;

const connection = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new mongoose.Schema({
    username:String,
    hash:String,
    salt:String
})

const User = connection.model('User',UserSchema)
// console.log(connection)
module.exports = connection

// const mongoose = require('mongoose');

// require('dotenv').config();

// /**
//  * -------------- DATABASE ----------------
//  */

// /**
//  * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
//  * string into the `.env` file
//  * 
//  * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
//  * DB_STRING_PROD=<your production database string>
//  */ 

// const devConnection = process.env.DB_STRING;
// const prodConnection = process.env.DB_STRING_PROD;

// // Connect to the correct environment database
// if (process.env.NODE_ENV === 'production') {
//     mongoose.connect(prodConnection, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//     });
// } else {
//     mongoose.connect(devConnection, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//     });
// }

