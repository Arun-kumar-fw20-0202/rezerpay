const express = require('express');
const { CreateOrder, CapturePayment } = require('../../controllers/Razerpay/RazerPay.controller');
const isAuth = require('../../middlewares/isAuth');

const RazerpayRoutes = express.Router();

RazerpayRoutes.post('/create_order', CreateOrder)
RazerpayRoutes.post('/payment',  CapturePayment)




module.exports = { RazerpayRoutes };