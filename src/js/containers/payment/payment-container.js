import paragraph from "../../ui/components/paragraph/paragraph.js";
import AuthRequiredContainer from "../../models/auth-required-container/auth-required-container.js";
import CartService from "../../services/cart/cart.service.js";
import StripeService from "../../services/stripe/stripe.service.js";

class PaymentContainer  extends AuthRequiredContainer {
    constructor(onNavigate){
        super(onNavigate);
        if(!this.checkAuth()) return;
        this.submitted = false;
        this.cartService = new CartService();
        this.paymentForm = document.getElementById('payment-form');
        this.paymentElementSection = document.getElementById('payment-element');
        this.paymentErrorsSection = document.getElementById('payment-errors');
        this.paymentForm.addEventListener("submit",this.onSubmit.bind(this));
        this.stripeService = new StripeService();
        this.stripeService.getPublishableKey()
            .then((pk) => {
                this.publishableKey = pk; 
                this.stripe = Stripe(this.publishableKey);
            }).then(async() => {
                const orderAmount = await this.cartService.getCartTotalCost();
                const { error, clientSecret } = await this.stripeService.getClientSecretOrError({ orderAmount: orderAmount * 100 });
                if(error){
                    this.paymentErrorsSection.innerHTML = paragraph({ content: error.message });
                    return;
                } 
                this.clientSecret = clientSecret;
                this.initializeStripeElements();
            });

    }

    initializeStripeElements () {
        const loader = "auto";
        new Promise((resolve) => {
            this.elements = this.stripe.elements({ clientSecret: this.clientSecret, loader });
            resolve();
        }).then(() => {
            const paymentElement= this.elements.create('payment');
            return paymentElement;
        }).then((paymentElement) => {
            paymentElement.mount("#payment-element");
        }).then(() => {
            const linkAuthenticationElement = this.elements.create("linkAuthentication");
            linkAuthenticationElement.mount("#link-authentication-element", {
                 defaultValues: {
                   email: 'john@example.com',
                }
            });
        });
     
    }

    async onSubmit(e) {
        e.preventDefault();
        if(this.submitted) { return; }
        this.submitted = true;
        this.paymentForm.querySelector('button').disabled = true;
    
        this.stripe.confirmPayment({
            elements: this.elements,
            redirect: "if_required"
        })
        .then((res) => {
            if (res.error) {
                this.paymentErrorsSection.innerHTML = paragraph({ content: res.error.message });
                this.submitted = false;
                this.paymentForm.querySelector('button').disabled = false;
                return;
            } else {
                this.paymentErrorsSection.innerHTML = "";
                this.localStorageService.setSpecificItem('payment_intent_client_secret', res.paymentIntent);
                this.onNavigate("#completed");
            
            }

        });
    
       
    };
    
}

export default PaymentContainer;