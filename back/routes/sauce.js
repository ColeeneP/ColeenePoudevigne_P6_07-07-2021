const express = require('express');
const router = express.Router(); //création du router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, multer, sauceCtrl.getAllSauces);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/:id', auth, multer, sauceCtrl.getOneSauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router; //exportation du router