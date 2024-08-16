import DataSource from "../../data-sources/data-source.js";
import NotificationService from "../../services/notification/notification.service.js";

class CompletedContainer {
    constructor(onNavigate){
        this.onNavigate = onNavigate;
        this.dataSource = new DataSource();
        this.notificationService = new NotificationService();
        const { publishableKey } = this.dataSource.get('http://localhost:3000/api/string/config');
        if(!publishableKey){
            this.notificationService.setNotification({ content: "Echec de la connexion entre notre serveur et Stripe", type: "failure" });
            return;
        }

        const stripe = Stripe(publishableKey);

        const url = new URL(window.location);
        const clientSecret = url.searchParams.get('payment_intent_client_secret');

        stripe.retrievePaymentIntent(
            clientSecret
        ).then(({ error, paymentIntent }) => {
            if(error) {
                this.notificationService.setNotification({ content: error.message, type: "failure" });
                return; 
            }
            this.notificationService.setNotification({ content: `Paiement ${paymentIntent.status}; ${paymentIntent.id}`, type: "success"});
        });

    }
}


export default CompletedContainer;