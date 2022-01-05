const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/contract');
const auth = require('../middleware/auth');


router.post('/', auth ,productCtrl.createProduct);
router.get('/:id', auth ,productCtrl.getOneProduct);
router.put('/:id', auth ,productCtrl.modifyProduct);
router.delete('/:id', auth ,productCtrl.deleteProduct);
router.get('/',auth, productCtrl.getAllProduct);

module.exports = router;