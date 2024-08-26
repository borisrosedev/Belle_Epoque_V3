const { stripeInstance } = require("../config/stripe/connect.cjs");

const stripeController = {
	config: (req, res) => {
		res.send({
			publishableKey: process.env.STRIPE_PK_TEST
		});
	},

	createPaymentIntent: async (req, res) => {
		let orderAmount = req.body.orderAmount;
		let paymentIntent;

		try {
			paymentIntent = await stripeInstance.paymentIntents.create({
				currency: "eur",
				amount: orderAmount,
				automatic_payment_methods: { enabled: true }
			});

			res.send({
				clientSecret: paymentIntent.client_secret
			});
		} catch (err) {
			return res.status(400).send({
				error: {
					message: err.message
				}
			});
		}
	},

	webhook: (req, res) => {
		const sig = req.headers["stripe-signature"];
		let event;

		try {
			event = stripeInstance.webhooks.constructEvent(
				req.body,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET_TEST
			);
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		console.log(`Unhandled event type ${event.type}`);

		res.send();
	}
};

module.exports = stripeController;
