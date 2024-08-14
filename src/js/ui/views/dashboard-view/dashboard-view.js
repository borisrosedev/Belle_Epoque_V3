import LocalStorageService from "../../../services/local-storage/local-storage.service.js"
import message from "../../components/message/message.js"

function dashboardView() {
	const user = new LocalStorageService().getSpecificItem("user")

	return `
        <main class="app__main dashboard__main">
            <section class="dashboard__welcome">
                ${message({
					content: "Bienvenue sur votre dashboard " + user.firstname
				})}
            </section>
            <section class="dashboard__cart-section">
                <h2 style="font-family:'Parisienne', cursive; color: #fff"> Votre panier </h2>
                <section id="dashboard-cart"><section>
            </section>
     
            <section id="dashboard-actions">
            </section>
        </main>
    
    `
}

export default dashboardView
