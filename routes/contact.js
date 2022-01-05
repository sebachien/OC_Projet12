const express = require('express');
const router = express.Router();

const contactCtrl = require('../controllers/contact');
const auth = require('../middleware/auth');


router.get('/:id', auth ,contactCtrl.getOneContact);
router.put('/:id', auth ,contactCtrl.modifyContact);
router.delete('/:id', auth ,contactCtrl.deleteContact);
router.get('/',contactCtrl.getAllContact);

router.post('/register', contactCtrl.register);
router.post('/login', contactCtrl.login);

module.exports = router;