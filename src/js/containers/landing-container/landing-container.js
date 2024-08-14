import ButtonModel from "../../models/button/button.model.js"
import button from "../../ui/components/button/button.js"
import message from "../../ui/components/message/message.js"

class LandingContainer {
	//le constructeur va me permettre d'instancier la classe
	// Landing Container
	constructor(onNavigate) {
		this.onInit()
		this.onNavigate = onNavigate
		const landingMenuButton = document.getElementById("landing-menu-button")
		landingMenuButton.addEventListener("click", this.onClick.bind(this))
	}

	onInit() {
		const main = document.getElementsByTagName("main")[0]

		main.innerHTML += message({
			content:
				"Bienvenue sur l'application du restaurant Belle Epoque. Nous sommes heureux et heureuses de vous compter parmi nous."
		})
		main.innerHTML += button(
			new ButtonModel({
				id: "landing-menu-button",
				classNames: "custom-button",
				textContent: "Découvrir notre menu"
			})
		)
	}

	onClick() {
		this.onNavigate("#menu")
	}
}

export default LandingContainer
