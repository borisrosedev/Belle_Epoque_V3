import CartService from "../../services/cart/cart.service.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import NotificationService from "../../services/notification/notification.service.js";
import dialogMenuItem from "../../ui/components/dialog-menu-item/dialog-menu-item.js";
import menuItem from "../../ui/components/menu-item/menu-item.js";

class MenuContainer {
	constructor() {
		this.user = new LocalStorageService().getSpecificItem("user");
		console.log(this.user);
		// j'appelle dans le constructeur de la classe une méthode onInit
		// si vous voyez un .then() derrière c'est qu'elle retourne nécessairement
		// une promise
		// si il y a une promosse c'est qu'une ressource
		//n'arrive pas instantanément dans cette histoire
		this.notificationService = new NotificationService();

		this.cartService = new CartService();

		this.notificationService.setNotification({
			content: "Vous êtes sur la page du Menu"
		});

		this.onInit().then(() => {
			console.log("this.menu", this.menu);

			const startersSection = document.getElementById("starters");

			this.appDialog = document.getElementById("app-dialog");

			this.initialAppDialogInnerHTML = this.appDialog.innerHTML;

			for (const starter of this.menu.starters) {
				new Promise((resolve, reject) => {
					startersSection.innerHTML += menuItem(starter);
					resolve();
				}).then(() => {
					const itemFigure = document.getElementById(
						"figure-" + starter.id
					);
					itemFigure.addEventListener("click", () =>
						this.onItemFigureClick(starter)
					);

					const addToCartButton = document.getElementById(
						"add-item-" + starter.id
					);
					addToCartButton.addEventListener("click", () =>
						this.onAddToCartClick(starter)
					);
				});
			}

			const mainsSection = document.getElementById("mains");

			this.menu.mains.forEach((el) => {
				new Promise((resolve, reject) => {
					mainsSection.innerHTML += menuItem(el);
					resolve();
				}).then(() => {
					const itemFigure = document.getElementById(
						"figure-" + el.id
					);
					itemFigure.addEventListener("click", () =>
						this.onItemFigureClick(el)
					);

					const addToCartButton = document.getElementById(
						"add-item-" + el.id
					);
					addToCartButton.addEventListener("click", () =>
						this.onAddToCartClick(el)
					);
				});
			});

			const dessertsSection = document.getElementById("desserts");

			for (const index in this.menu.desserts) {
				new Promise((resolve, reject) => {
					dessertsSection.innerHTML += menuItem(
						this.menu.desserts[index]
					);
					resolve();
				}).then(() => {
					const itemFigure = document.getElementById(
						"figure-" + this.menu.desserts[index].id
					);
					itemFigure.addEventListener("click", () =>
						this.onItemFigureClick(this.menu.desserts[index])
					);

					const addToCartButton = document.getElementById(
						"add-item-" + this.menu.desserts[index].id
					);
					addToCartButton.addEventListener("click", () =>
						this.onAddToCartClick(this.menu.desserts[index])
					);
				});
			}
		});
	}

	onAddToCartClick(data) {
		if (this.user) {
			this.cartService.addOneItem(data);
		} else {
			if (this.appDialog.hasAttribute("open")) {
				return;
			}

			this.appDialog.style.height = "fit-content";
			this.appDialog.style.width = "300px";
			this.appDialog.innerHTML += `<p>Vous devez être connecté(e) pour ajouter des produits à votre panier</p><a href="#login">Se connecter</a>`;
			this.appDialog.setAttribute("open", "");
			this.appDialog.style.display = "flex";
			const appDialogCloseButton = document.getElementById(
				"app-dialog-close-button"
			);

			appDialogCloseButton.addEventListener("click", () => {
				this.appDialog.style.height = "auto";
				this.appDialog.style.width = "auto";
				this.appDialog.innerHTML = this.initialAppDialogInnerHTML;
				this.appDialog.removeAttribute("open");
				this.appDialog.style.display = "none";
			});
		}
	}

	onItemFigureClick(el) {
		if (this.appDialog.hasAttribute("open")) {
			return;
		}

		this.appDialog.innerHTML += dialogMenuItem(el);

		this.appDialog.style.height = "500px";
		this.appDialog.style.width = "500px";

		setTimeout(() => {
			const dialogButtonAddItem = document.getElementById(
				"dialog-add-item-" + el.id
			);
			dialogButtonAddItem.addEventListener("click", () =>
				this.onAddToCartClick(el)
			);

			this.appDialog.setAttribute("open", "");
			this.appDialog.style.display = "flex";
			const appDialogCloseButton = document.getElementById(
				"app-dialog-close-button"
			);

			appDialogCloseButton.addEventListener("click", () => {
				this.appDialog.style.height = "auto";
				this.appDialog.style.width = "auto";
				this.appDialog.innerHTML = this.initialAppDialogInnerHTML;
				this.appDialog.removeAttribute("open");
				this.appDialog.style.display = "none";
			});
		});
	}

	async onInit() {
		this.menu = await this.getMenuFromJSONFile();
	}

	async getMenuFromJSONFile() {
		const result = await fetch("./data/menu/menu.json");
		const menu = await result.json();
		return menu;
	}
}

export default MenuContainer;
