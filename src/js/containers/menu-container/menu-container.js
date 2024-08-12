import dialogMenuItem from "../../ui/components/dialog-menu-item/dialog-menu-item.js"
import menuItem from "../../ui/components/menu-item/menu-item.js"

class MenuContainer {
	constructor() {
		// j'appelle dans le constructeur de la classe une méthode onInit
		// si vous voyez un .then() derrière c'est qu'elle retourne nécessairement
		// une promise
		// si il y a une promosse c'est qu'une ressource
		//n'arrive pas instantanément dans cette histoire
		this.onInit().then(() => {
			console.log("this.menu", this.menu)

			const startersSection = document.getElementById("starters")

			this.appDialog = document.getElementById("app-dialog")

			this.initialAppDialogInnerHTML = this.appDialog.innerHTML

			for (const starter of this.menu.starters) {
				startersSection.innerHTML += menuItem(starter)
				setTimeout(() => {
					const itemFigure = document.getElementById(
						"figure-" + starter.id
					)
					itemFigure.addEventListener("click", () =>
						this.onItemFigureClick(starter)
					)
				})
			}

			const mainsSection = document.getElementById("mains")

			this.menu.mains.forEach((el) => {
				mainsSection.innerHTML += menuItem(el)
				setTimeout(() => {
					const itemFigure = document.getElementById(
						"figure-" + el.id
					)
					itemFigure.addEventListener("click", () =>
						this.onItemFigureClick(el)
					)
				})
			})

			const dessertsSection = document.getElementById("desserts")

			for (const index in this.menu.desserts) {
				dessertsSection.innerHTML += menuItem(this.menu.desserts[index])
				setTimeout(() => {
					const itemFigure = document.getElementById(
						"figure-" + this.menu.desserts[index].id
					)
					itemFigure.addEventListener("click", () =>
						this.onItemFigureClick(this.menu.desserts[index])
					)
				})
			}
		})
	}

	onItemFigureClick(starter) {
		if (this.appDialog.hasAttribute("open")) {
			return
		}

		this.appDialog.innerHTML += dialogMenuItem(starter)
		this.appDialog.setAttribute("open", "")
		this.appDialog.style.display = "flex"
		const appDialogCloseButton = document.getElementById(
			"app-dialog-close-button"
		)
		appDialogCloseButton.addEventListener("click", () => {
			this.appDialog.innerHTML = this.initialAppDialogInnerHTML
			this.appDialog.removeAttribute("open")
			this.appDialog.style.display = "none"
		})
	}

	async onInit() {
		this.menu = await this.getMenuFromJSONFile()
	}

	async getMenuFromJSONFile() {
		const result = await fetch("./data/menu/menu.json")
		const menu = await result.json()
		return menu
	}
}

export default MenuContainer
