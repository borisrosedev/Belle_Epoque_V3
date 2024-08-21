import anchor from "../../components/anchor/anchor.js";
import form from "../../components/form/form.js";
import message from "../../components/message/message.js";
import paragraph from "../../components/paragraph/paragraph.js";

function paymentView() {
	return `
        <main class="app__main payment__main">
            <section class="payment__welcome">    
            </section>
            <section id="payment-methods-and-form">
                <section>
                    ${paragraph({ 
                        content: 'Autoriser d\'autres méthodes de paiement' + anchor({ 
                            textContent: "sur votre tableau de bord Stripe", 
                            href: "https://dashboard.stripe.com/settings/payment_methods"
                        }) 
                    })}
                </section>
                <form id="payment-form">
                    <section id="link-authentication-element"></section>
                    <section id="payment-element"></section>

                    <section class="payment-form__buttons">
                        <button id="payment-submit-button">Payer maintenant</button>
                    <section>
                    
                    <section id="payment-errors"></section>
                </form>
            </section>
        </main>
    `;
}

export default paymentView;
