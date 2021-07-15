const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user'); // importation des controllers
const auth = require('../middleware/auth'); // à ajouter aux routes qui demandent une vérif d'authentification

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// Utilisation de routes POST car le front doit d'abord fournir des informations

module.exports = router;