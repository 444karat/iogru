const mongo = require('mongoose');

const UserScheme  = new mongo.Schema({
    login : {type: String, unique : true, required: true},
    password : {type: String , required: true}
})

module.exports = UserScheme;