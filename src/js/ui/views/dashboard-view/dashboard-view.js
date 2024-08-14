import LocalStorageService from "../../../services/local-storage-service/local-storage.service.js"
import message from "../../components/message/message.js"

function dashboardView() {
	const user = new LocalStorageService().getSpecificItem("user")

	return `
        <main class="app__main dashboard__main">
            <section>
                ${message({
					content: "Bienvenue sur votre dashboard " + user.firstname
				})}
            </section>
        </main>
    
    `
}

export default dashboardView
