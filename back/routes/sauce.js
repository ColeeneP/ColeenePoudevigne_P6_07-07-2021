const express = require('express');
const router = express.Router(); //création du router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');
// const { route } = require('./user');

// router.get ou router.post + middleware
router.post('/', auth, multer, sauceCtrl.createSauce); // Récupération du controller de création de sauce
router.get('/', auth, multer, sauceCtrl.getAllSauces);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/:id', auth, multer, sauceCtrl.getOneSauce); // Récupération du controller d'accessibilité à un objet
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

router.post('/:id/like', auth, sauceCtrl.likeSauce);


module.exports = router; //exportation du router