import CartService from "../../services/cart/cart.service.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import cartItem from "../../ui/components/cart-item/cart-item.js";
import message from "../../ui/components/message/message.js";
import paragraph from "../../ui/components/paragraph/paragraph.js";

class DashboardContainer {
	constructor() {
		this.cartService = new CartService();
		this.user = new LocalStorageService().getSpecificItem("user");
		this.cart = this.cartService.getAllCartItems();

		this.dashboardWelcomeSection =
			document.getElementById("dashboard-welcome");
		this.dashboardCartSection = document.getElementById("dashboard-cart");
		this.onInit();
	}

	getUpdatedCart() {
		this.cart = this.cartService.getAllCartItems();
	}

	onCartMinusClick(data) {
		if (data.quantity == 1) {
			this.onCartTrashClick(data);
		}

		if (data.quantity > 1) {
			new Promise((resolve) => {
				this.cartService.updateCartItem({
					...data,
					quantity: data.quantity - 1
				});
				resolve();
			}).then(() => {
				this.onInit();
			});
		}
	}

	onCartPlusClick(data) {
		new Promise((resolve) => {
			this.cartService.updateCartItem({
				...data,
				quantity: data.quantity + 1
			});
			resolve();
		}).then(() => {
			this.onInit();
		});
	}

	onCartTrashClick(data) {
		console.log("into", data);
		new Promise((resolve) => {
			this.cartService.removeOneItem(data.name);
			resolve();
		}).then(() => {
			console.log("ici");
			this.onInit();
		});
	}

	updateDashboarCartSection() {
		for (const el of this.cart) {
			new Promise((resolve, reject) => {
				this.dashboardCartSection.innerHTML += cartItem(
					el,
					"dashboard-cart"
				);
				resolve();
			})
				.then(() => {
					const minusButton = document.getElementById(
						"dashboard-cart-minus-" + el.id
					);
					minusButton.addEventListener("click", () =>
						this.onCartMinusClick(el)
					);
				})
				.then(() => {
					const plusButton = document.getElementById(
						"dashboard-cart-plus-" + el.id
					);
					plusButton.addEventListener("click", () =>
						this.onCartPlusClick(el)
					);
				})
				.then(() => {
					const trashButton = document.getElementById(
						"dashboard-cart-trash-" + el.id
					);
					trashButton.addEventListener("click", () =>
						this.onCartTrashClick(el)
					);
				});
		}
	}

	onInit() {
		this.getUpdatedCart();
		this.dashboardCartSection.innerHTML = "";
		if (typeof this.cart !== "string") {
			new Promise((resolve, reject) => {
				this.dashboardWelcomeSection.innerHTML = message({
					content:
						"Bienvenue sur votre dashboard " + this.user.firstname,
					actions: [
						{
							id: "empty-cart",
							textContent: "Vider votre panier"
						}
					]
				});
				resolve();
			}).then(() => {
				const emptyCartButton = document.getElementById("empty-cart");
				emptyCartButton.addEventListener("click", () => {
					this.cartService.removeAllCartItems();
					this.dashboardCartSection.innerHTML = "";
					this.getUpdatedCart();
					this.onInit();
				});
			});

			this.updateDashboarCartSection();
		} else {
			this.dashboardWelcomeSection.innerHTML = message({
				content: "Bienvenue sur votre dashboard " + this.user.firstname
			});

			this.dashboardCartSection.innerHTML = paragraph({
				content: "Aucun article dans votre panier actuellement"
			});
		}
	}
}

export default DashboardContainer;
