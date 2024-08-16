import DataSource from "../../data-sources/data-source.js";
import paragraph from "../../ui/components/paragraph/paragraph.js";

class PaymentContainer {
    constructor(){
        this.submitted = false;
        this.paymentForm = document.getElementById('payment-form');
        this.paymentElementSection = document.getElementById('payment-element');
        this.paymentErrorsSection = document.getElementById('payment-errors');
        this.dataSource = new DataSource();
        this.dataSource.get('http://localhost:3000/api/stripe/config')
            .then((res) => {
                console.log(res);
                this.publishableKey = res.publishableKey;
                this.stripe = Stripe(this.publishableKey);
                console.log(this.stripe);
            })
            .then(async() => {
                const { error, clientSecret } = await this.dataSource.get('http://localhost:3000/api/stripe/create-payment-intent');
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
        this.elements = this.stripe.elements({ clientSecret: this.clientSecret, loader });
        const paymentElement= this.elements.create('payment');
        paymentElement.mount("#payment-element");

        const linkAuthenticationElement = this.elements.create("linkAuthentication");
        linkAuthenticationElement.mount("#link-authentication-element", {
             defaultValues: {
               email: 'john@example.com',
            }
        });
    }

    onSubmit() {
        async (e) => {
            e.preventDefault();
    
            if(this.submitted) { return; }
            this.submitted = true;
            this.paymentForm.querySelector('button').disabled = true;
        
            const nameInput = document.querySelector('#name');
        
            const {error: stripeError} = await this.stripe.confirmPayment({
              elements: this.elements,
              confirmParams: {
                return_url: `${window.location.origin}/index.html#completed`,
              }
            });
        
            if (stripeError) {
              this.paymentErrorsSection.innerHTML = paragraph({ content: stripeError.message });
              this.submitted = false;
              this.paymentForm.querySelector('button').disabled = false;
              return;
            } else {
                this.paymentErrorsSection.innerHTML = "";
            }
          };
    }
}

export default PaymentContainer;