const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user'); // importation des controllers
const auth = require('../middleware/auth'); // à ajouter aux routes qui demandent une vérif d'authentification
const rateLimit = require('express-rate-limit'); // middleware contre les attaques de force brute

const accountLimiter = rateLimit ({
    windowMs: 60*60*1000, // 1h par fenêtre
    max: 5, // blocage après 5 tentatives
    message:
        "Trop de requêtes envoyées depuis cette IP"
});

// Utilisation de routes POST car le front doit d'abord fournir des informations
router.post('/signup', accountLimiter, userCtrl.signup);
router.post('/login', accountLimiter, userCtrl.login);

module.exports = router;