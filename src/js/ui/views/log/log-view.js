import form from "../../components/form/form.js";

function logView(isLoggingIn = true) {
	const formData = {
		id: "log-form",
		fields: [
			{
				arialLabel: "icône de l'email",
				spanTextContent: "mail",
				id: "email",
				type: "email",
				placeholder: "Entrez votre email",
				pattern: "[a-z0-9.]{2,40}[@]{1}[a-z0-9]{2,7}[.]{1}[a-z]{2,5}"
			},
			{
				placeholder: "Entrez votre mot de passe",
				ariaLabel: "icône du mot de passe",
				spanTextContent: "lock",
				type: "password",
				id: "password",
				pattern: "[a-zA-Z0-9ï!?ûéàè]{12,20}"
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

	if (isLoggingIn == false) {
		const passwordData = formData.fields.pop();
		const emailData = formData.fields.pop();
		formData.fields.push(
			{
				arialLabel: "icône du prénom",
				spanTextContent: "person",
				id: "firstname",
				type: "text",
				placeholder: "Entrez votre prénom",
				pattern: "[a-zéüïèà]{2,30}"
			},
			{
				arialLabel: "icône du nom",
				spanTextContent: "person",
				id: "lastname",
				type: "text",
				placeholder: "Entrez votre nom",
				pattern: "[a-zéüïèà]{2,30}"
			},
			emailData,
			passwordData,
			{
				placeholder: "Confirmez votre mot de passe",
				ariaLabel: "icône du mot de passe",
				spanTextContent: "lock",
				type: "password",
				id: "confirmed-password",
				pattern: "[a-zA-Z0-9ï!?ûéàè]{12,20}"
			}
		);
	}

	return `
    
        
    <main class="app__main login__main">

        <section>
            <header>
                 <h1>${isLoggingIn ? "Connexion" : "Inscription"}</h1>
            </header>
            ${form(formData)}
			<section>
				${
					isLoggingIn
						? `<small>Pas encore inscrit(e) ? Cliquez <a href="#register">ici</a></small>`
						: `<small>Déjà inscrit(e) ? Cliquez <a href="#login">ici</a></small>`
				}
			</section>
        </section>
 

    </main>
    
    
    `;
}

export default logView;
