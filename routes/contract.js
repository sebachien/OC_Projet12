const express = require('express');
const router = express.Router();

const contractCtrl = require('../controllers/contract');
const auth = require('../middleware/auth');


router.post('/', auth ,contractCtrl.createContract);
router.get('/:id', auth ,contractCtrl.getOneContract);
router.put('/:id', auth ,contractCtrl.modifyContract);
router.delete('/:id', auth ,contractCtrl.deleteContract);
router.get('/:customersignedid',auth, contractCtrl.getAllContract);

module.exports = router;