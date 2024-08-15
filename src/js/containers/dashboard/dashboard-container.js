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

	onInit() {
		if (typeof this.cart !== "string") {
			new Promise((resolve, reject) => {
				this.dashboardWelcomeSection.innerHTML += message({
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

			for (const el of this.cart) {
				new Promise((resolve, reject) => {
					this.dashboardCartSection.innerHTML += cartItem(el,"dashboard-cart");
					resolve();
				});
			}
		} else {
			this.dashboardWelcomeSection.innerHTML = message({
				content: "Bienvenue sur votre dashboard "
			});

			this.dashboardCartSection.innerHTML = paragraph({
				content: "Aucun article dans votre panier actuellement"
			});
		}
	}
}

export default DashboardContainer;
