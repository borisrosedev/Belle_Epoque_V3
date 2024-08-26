import CartService from "../../services/cart/cart.service.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import button from "../../ui/components/button/button.js";
import cartItem from "../../ui/components/cart-item/cart-item.js";
import message from "../../ui/components/message/message.js";
import paragraph from "../../ui/components/paragraph/paragraph.js";
import AuthRequiredContainer from "../../models/auth-required-container/auth-required-container.js";

class DashboardContainer extends AuthRequiredContainer {
	constructor(onNavigate) {
		super(onNavigate);
		if(!this.checkAuth()) return;
		this.cartService = new CartService();
		this.cart = this.cartService.getAllCartItems();
		this.dashboardPaymentSection = document.getElementById("dashboard-payment");
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




	updateDashboardPaymentSection() {
	
		this.dashboardPaymentSection.innerHTML = "";
		this.dashboardPaymentSection.style.display = "none";
		this.cartService.getCartTotalCost()
			.then((cost) => {
				console.log(cost);
				if(cost){
					this.dashboardPaymentSection.style.display = "flex";
					this.dashboardPaymentSection.innerHTML += paragraph({ id: "dashboard-payment-cost", content: 'Coût total de votre panier: ' + cost + ' $' });
					this.dashboardPaymentSection.innerHTML += button({ 
						textContent: 'Procéder au paiement' , 
						classNames: "custom-button", 
						id: "dashboard-payment-button" 
					});

					const dashboardPaymentButton = document.getElementById("dashboard-payment-button");
					dashboardPaymentButton.addEventListener("click", () => {
						this.onNavigate("#payment");
					});

				}
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
		this.updateDashboardPaymentSection();
	}
}

export default DashboardContainer;
