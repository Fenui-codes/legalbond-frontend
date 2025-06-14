const express = require('express');
const router = express.Router();

const { initializePayment, verifyPayment } = require('../controllers/paymentController');

router.post('/initiate', initializePayment);
router.get('/verify', verifyPayment);

module.exports = router;
