const express = require("express")
const stripeController = require("../controllers/stripe.cjs")
const router = express.Router()

router.post('/webhook', express.raw({type: 'application/json'}), stripeController.webhook)
router.get('/create-payment-intent', stripeController.createPaymentIntent)
router.get('/config', stripeController.config)
module.exports = router