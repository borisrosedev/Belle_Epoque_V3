const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST)
module.exports = { stripeInstance: stripe } 