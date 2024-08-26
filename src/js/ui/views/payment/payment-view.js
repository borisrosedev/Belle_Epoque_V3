function paymentView() {
	return `
        <main class="app__main payment__main">
            <section class="payment__welcome">    
            </section>
            <section id="payment-methods-and-form">
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
