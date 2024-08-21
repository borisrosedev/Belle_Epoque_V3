import DataSource from "../../data-sources/data-source.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import NotificationService from "../../services/notification/notification.service.js";

class CompletedContainer {
    constructor(onNavigate){
        this.onNavigate = onNavigate;
        this.dataSource = new DataSource();
        this.localStorageService = new LocalStorageService();
        this.notificationService = new NotificationService();
        this.dataSource.get('http://localhost:3000/api/stripe/config')
            .then(({ publishableKey }) => {
                if(!publishableKey){
                    this.notificationService.setNotification({ content: "Echec de la connexion entre notre serveur et Stripe", type: "failure" });
                    return;
                }
                
                const stripe = Stripe(publishableKey);

                const clientSecret = this.localStorageService.getSpecificItem('payment_intent_client_secret').client_secret;

                if(clientSecret){
                    stripe.retrievePaymentIntent(
                        clientSecret
                    ).then(({ error, paymentIntent }) => {
                        if(error) {
                            this.notificationService.setNotification({ content: error.message, type: "failure" });
                            return; 
                        }
                        this.notificationService.setNotification({ content: `Paiement réussi; ${paymentIntent.id}`, type: "success"});
                        this.localStorageService.removeSpecificItem('payment_intent_client_secret');
                        
                    });
                } else {
                    this.notificationService.setNotification({ content: 'Erreur', type: 'failure' });
                }

               
            });
     


    }
}


export default CompletedContainer;