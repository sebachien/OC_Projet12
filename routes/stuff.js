const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth , multer ,stuffCtrl.createThing);
router.get('/:id', auth ,stuffCtrl.getOneThing);
router.put('/:id', auth ,multer ,stuffCtrl.modifyThing);
router.delete('/:id', auth ,stuffCtrl.deleteThing);
router.get('/', auth ,stuffCtrl.getAllThing);

module.exports = router;