import form from "../../components/form/form.js";
import message from "../../components/message/message.js";

function paymentView() {
	const formData = {
		id: "buying-form",
		fields: [
			{
				id: "card-number",
				placeholder: "Numéro de carte",
				spanTextContent: "credit_card",
				pattern: "[0-9]{15}"
			},
			{
				id: "card-owner",
				placeholder: "Nom inscrit sur la carte",
				spanTextContent: "person",
				pattern: "[a-zéüïèà]{2,30}"
			},
			{
				id: "card-expiration-date",
				placeholder: "Date d'expiration",
				spanTextContent: "calendar_month",
				pattern: "[0-9]{2}[/]{1}[0-9]{2}"
			},
			{
				id: "card-verification-code",
				placeholder: "CVC",
				spanTextContent: "lock",
				pattern: "[0-9]{3}"
			}
		],
		buttons: [
			{
				id: "submit-button",
				type: "submit",
				classNames: "custom-button",
				textContent: "Valider"
			},
			{
				id: "reset-button",
				type: "reset",
				classNames: "custom-button",
				textContent: "Réinitialiser"
			}
		]
	};

	return `
        <main class="app__main payment__main">
            <section class="payment__welcome">    
                ${message({
					content:
						"Nous vous invitons à compléter le formulaire pour réserver vos produits"
				})}
            </section>
            <section>
                    ${form(formData)}
            </section>
        </main>
    `;
}

export default paymentView;
