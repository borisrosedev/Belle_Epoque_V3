import form from "../../components/form/form.js"

function logView () {

    const formData = {
        id: "log-form",
        fields: [
            {
                arialLabel: "icône de l'email",
                spanTextContent: "mail",
                id:"email",
                type:"email",
                placeholder: "Entrez votre email",
                pattern: "[a-z0-9.]{2,40}[@]{1}[a-z0-9]{2,7}[.]{1}[a-z]{2,5}"
            
            },
            {
                placeholder: "Entrez votre mot de passe",
                ariaLabel:"icône du mot de passe",
                spanTextContent: "lock",
                type:"password",
                id:"password",
                pattern:"[a-zA-Z0-9ï!?ûéàè]{12,20}"
            }
        ],
    
        buttons: [
            {
                id:"submit-button",
                type:"submit",
                classNames: "custom-button",
                textContent: "Valider"
            }, 
            {
                id: "reset-button",
                type:"reset",
                classNames: "custom-button",
                textContent: "Réinitialiser"
            }
        ]

    }

    


    return `
    
        
    <main class="app__main login__main">

        <section>
            <header>
                 <h1>Connexion</h1>
            </header>
            ${form(formData)}
        </section>
 

    </main>
    
    
    `
}

export default logView