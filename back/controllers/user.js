const bcrypt = require('bcrypt'); // Package de cryptage des mots de passe
const User = require('../models/user'); // Récupération du schéma de données des utilisateurs
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const MaskData = require('maskdata');
const { schema } = require('../models/user');

// controller de création de compte

let schemaPassword = new passwordValidator();
schemaPassword
.is().min(8)                                    // Longueur min 8
.is().max(100)                                  // Longueur max 100
.has().uppercase()                              // Doit contenir des majuscules
.has().lowercase()                              // Doit contenir des minuscules
.has().digits(1)                                // Doit contenir un chiffre
.has().not().spaces()                           // Ne doit pas contenir d'espace

exports.signup = (req, res, next) => {
  console.log(schemaPassword.validate(req.body.password))
  if (emailValidator.validate(req.body.email) && schemaPassword.validate(req.body.password)) {
    let maskedMail = MaskData.maskEmail2(req.body.email); // masquage de l'adresse mail
    bcrypt.hash(req.body.password, 10) // hash du mdp, fonction asynchrone, algorithme exécuté 10 fois
      .then(hash => {
        const user = new User({
          email: maskedMail,
          password: hash // On récupère le hash créé et on créé un user avec ce hash
        });
        user.save() // On enregistre le user dans la BDD
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    return res.status(400).json({ message: 'Vérifiez le format de votre adresse mail, votre mot de passe doit contenir minimum 8 caractères dont des majuscules, des minucules et un chiffre'});
  }
};


// controller de connexion à un compte existant
  exports.login = (req, res, next) => {
    let maskedMail = MaskData.maskEmail2(req.body.email);
    User.findOne({ email: maskedMail }) // On cherche dans la BDD le user correspondant à l'email (unique)
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // si aucun mail correspondant n'existe
        }
        bcrypt.compare(req.body.password, user.password) // on fait appel à bcrypt pour comparer le mdp saisi à celui dans la BDD
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' }); // si mdp incorrect
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id }, // argument à encoder, permettra de sécuriser la création, modification et suppression d'objets
                process.env.TOKEN, // attribution d'un token d'authentification
                { expiresIn: '2h' } // expiration du token
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };