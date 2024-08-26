import DataSource from "../../data-sources/data-source.js";
import AuthRequiredContainer from "../../models/auth-required-container/auth-required-container.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import NotificationService from "../../services/notification/notification.service.js";
import paragraph from "../../ui/components/paragraph/paragraph.js";

class CompletedContainer extends AuthRequiredContainer {
    constructor(onNavigate){
        super(onNavigate);
        if(!this.checkAuth()) return;
        this.dataSource = new DataSource();        
        this.notificationService = new NotificationService();
        this.paymentResultSection = document.getElementById("payment-result");
        this.dataSource.get('http://localhost:3000/api/stripe/config')
            .then(({ publishableKey }) => {
                if(!publishableKey){
                    this.notificationService.setNotification({ content: "Echec de la connexion entre notre serveur et Stripe", type: "failure" });
                    return;
                }
                
                const stripe = Stripe(publishableKey);
 
                const clientSecret = this.localStorageService.getSpecificItem('payment_intent_client_secret').client_secret;
                stripe.retrievePaymentIntent(
                    clientSecret
                ).then(({ error, paymentIntent }) => {
                    if(error) {
                        this.notificationService.setNotification({ content: error.message, type: "failure" });
                        return; 
                    }


                    this.paymentResultSection.innerHTML = this.createSuccessInterface();
               

                    this.notificationService.setNotification({ content: `Paiement réussi; ${paymentIntent.id}`, type: "success"});
                    this.localStorageService.removeSpecificItem('payment_intent_client_secret');
                    setTimeout(() => {
                            this.onNavigate("");  
                    }, 4000);
                });
                
            
               
            }).catch((err) => {
                this.paymentResultSection.innerHTML = this.createFailureInterface();
                this.notificationService.setNotification({ content: 'Erreur', type: 'failure' });
            });
     


    }


    createSuccessInterface() {
        return `
             <i class="fa-solid fa-check success"></i>
            ${paragraph({ content: "Paiement réussi !" })} 
        `;
    } 
    
    
    createFailureInterface() {
        return `
                <i class="fa-solid fa-xmark failure"></i>
                ${paragraph({ content: "Erreur" })}      
        `;
    }
}


export default CompletedContainer;