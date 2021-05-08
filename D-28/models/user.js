const mongoose = require('mongoose')


const nombreCollectionUsers = 'users';

// -------------------------------------------------------------
//                         SCHEMA
// -------------------------------------------------------------

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});


module.exports = mongoose.model(nombreCollectionUsers, userSchema);

