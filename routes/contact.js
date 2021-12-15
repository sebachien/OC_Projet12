const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/contact');
const auth = require('../middleware/auth');


router.post('/', auth ,stuffCtrl.createContact);
router.get('/:id', auth ,stuffCtrl.getOneContact);
//router.put('/:id', auth ,stuffCtrl.modifyContact);
//router.delete('/:id', auth ,stuffCtrl.deleteContact);
//router.get('/', auth ,stuffCtrl.getAllContact);

module.exports = router;