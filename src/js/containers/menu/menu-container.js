import DataSource from "../../data-sources/data-source.js";
import CartService from "../../services/cart/cart.service.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import NotificationService from "../../services/notification/notification.service.js";
import dialogMenuItem from "../../ui/components/dialog-menu-item/dialog-menu-item.js";
import menuItem from "../../ui/components/menu-item/menu-item.js";
import paragraph from "../../ui/components/paragraph/paragraph.js";

class MenuContainer {
	constructor() {
		this.user = new LocalStorageService().getSpecificItem("user");

		this.notificationService = new NotificationService();
		this.dataSource = new DataSource();
		this.cartService = new CartService();
		this.appSpinner = document.getElementById("app-spinner");
		this.appSpinnerMessageSection = document.getElementById("app-spinner-message");
		
		this.notificationService.setNotification({
			content: "Vous êtes sur la page du Menu"
		});

		this.onInit().then(() => {
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

	updateCartItemsCountSpanInterface() {
		this.cartItemsCountSpan = document.getElementById("app-cart-items-count");
		this.cartService.getCartItemsCount()
			.then((count) => {
				if(count > 0) {
					this.cartItemsCountSpan.innerText = count;
				} else {
					this.cartItemsCountSpan.innerText = "";
				}
			});
	}


	onAddToCartClick(data) {
		if (this.user) {
			this.updateCartItemsCountSpanInterface();
			this.cartService.addOneItem(data);
			this.notificationService.setNotification({
				content: `Ajout de ${data.name} au panier`
			});
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

		this.appDialog.style.width =
			window.innerWidth > 500 ? "500px" : `${window.innerWidth - 30}px`;
		this.appDialog.style.height = "600px";

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
		this.appSpinner.style.display = "flex";
		this.appSpinnerMessageSection.innerHTML += paragraph({ content: "Chargement du menu en cours ..."});
		this.menu = await this.getMenuFromJSONFile();
		this.appSpinner.style.display = "none";
		this.appSpinnerMessageSection.innerHTML = "";	
	}

	async getMenuFromJSONFile() {
		return await this.dataSource.get("./data/menu/menu.json");
	}
}

export default MenuContainer;
