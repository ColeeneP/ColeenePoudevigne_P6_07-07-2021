const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// modèle de stockage des données users
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });;

userSchema.plugin(uniqueValidator); //plugin permettant de vérifier qu'un mail ne peut être utilisé que pour un compte

module.exports = mongoose.model('User', userSchema);