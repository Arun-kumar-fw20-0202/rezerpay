const { RazerpayRoutes } = require("./razerpay/Razerpay.routes");

const express = require('express');
const AllRoutes = express.Router();


AllRoutes.use('/razerpay', RazerpayRoutes)


module.exports = { AllRoutes };