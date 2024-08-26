import AuthenticationService from "../../services/authentication/authentication.server.js";
import CartService from "../../services/cart/cart.service.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import NotificationService from "../../services/notification/notification.service.js";
import button from "../../ui/components/button/button.js";
import cartItem from "../../ui/components/cart-item/cart-item.js";
import paragraph from "../../ui/components/paragraph/paragraph.js";

class HeaderContainer {
	constructor(onNavigate) {
		this.onNavigate = onNavigate;
		this.hash = window.location.hash;
		if (this.hash == "#dashboard") {
			this.dashboardCartSection =
				document.getElementById("dashboard-cart");
			this.dashboardPaymentSection =
				document.getElementById("dashboard-payment");
		}

		// j'ai besoin de connaître des informations sur l'utilisateur actuel de
		// l'application
		this.user = new LocalStorageService().getSpecificItem("user");

		// j'aurai sans doute besoin de modifier le cart dans les méthodes de cette classe
		// donc je fais en sorte de pouvoir utiliser le service de panier partout dans mon application
		// en le transformant en attribut avec le mot clé this
		this.cartService = new CartService();

		// j'aurai besoin à un moment donné d'utiliser la méthode logout()
		// du service d'authentification
		this.authenticationService = new AuthenticationService();

		this.notificationService = new NotificationService();

		if (this.user) {
			this.cartItemsCountSpan = document.getElementById(
				"app-cart-items-count"
			);
			this.updateCartItemsCountSpanInterface();
			// On aura besoin d'afficher le menu ( display: flex ) à un moment donné
			this.appProfileMenu = document.getElementById("app-profile-menu");

			this.appProfileMenuFigure = document.getElementById(
				"app-profile-menu__figure"
			);

			// On aura besoin de cliquer sur l'image de l'utilisateur pour accéder
			// ou faire apparaître le menu à un moment donné également
			this.profileActions = document.getElementById("profile-actions");

			this.profileActions.addEventListener(
				"click",
				this.onProfileActionsClick.bind(this)
			);

			//le bouton panier représenté par le sac
			// je lui ajoute un écouteur de l'événement click
			this.appCartButton = document.getElementById("app-cart-button");

			this.appCartButton.addEventListener(
				"click",
				window.location.hash !== "#payment"
					? this.onAppCartClick.bind(this)
					: this.onAppCartClickOnPaymentPage.bind(this)
			);

			this.appCart = document.getElementById("app-cart");
			const appCartCloseButton = document.getElementById(
				"app-cart-close-button"
			);
			appCartCloseButton.addEventListener(
				"click",
				this.onAppCartCloseClick.bind(this)
			);
		}
	}

	updateCartItemsCountSpanInterface() {
		this.cartService.getCartItemsCount().then((count) => {
			if (count > 0) {
				this.cartItemsCountSpan.innerText = count;
			} else {
				this.cartItemsCountSpan.innerText = "";
			}
		});
	}

	onAppCartClickOnPaymentPage() {
		this.notificationService.setNotification({
			type: "info",
			content:
				"Vous ne pouvez plus accéder au panier durant la phase de paiement"
		});
	}

	updateDashboarPaymentSectionInterface() {
		this.dashboardPaymentSection.innerHTML = "";
		this.dashboardPaymentSection.style.display = "none";
		this.cartService.getCartTotalCost().then((cost) => {
			if (cost) {
				this.dashboardPaymentSection.style.display = "flex";
				this.dashboardPaymentSection.innerHTML += paragraph({
					id: "dashboard-payment-cost",
					content: "Coût total de votre panier: " + cost + " $"
				});
				this.dashboardPaymentSection.innerHTML += button({
					textContent: "Procéder au paiement",
					classNames: "custom-button",
					id: "dashboard-payment-button"
				});

				const dashboardPaymentButton = document.getElementById(
					"dashboard-payment-button"
				);
				dashboardPaymentButton.addEventListener("click", () => {
					this.onNavigate("#payment");
				});
			}
		});
	}

	updateDashboarCartSectionInterface() {
		if (this.hash == "#dashboard") {
			const cart = this.cartService.getAllCartItems();
			this.dashboardCartSection.innerHTML = "";
			if (typeof cart == "string") {
				const message =
					"<p style='text-align:center; margin-block:5px;'>Aucun article dans votre panier actuellement<p>";
				this.dashboardCartSection.innerHTML = message;
			} else {
				for (const el of cart) {
					new Promise((resolve) => {
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
								this.onAppCartMinusClick(el)
							);
						})
						.then(() => {
							const plusButton = document.getElementById(
								"dashboard-cart-plus-" + el.id
							);
							plusButton.addEventListener("click", () =>
								this.onAppCartPlusClick(el)
							);
						})
						.then(() => {
							const trashButton = document.getElementById(
								"dashboard-cart-trash-" + el.id
							);
							trashButton.addEventListener("click", () =>
								this.onAppCartTrashClick(el)
							);
						});
				}
			}
		}
	}

	onAppProfileMenuCloseClick() {
		this.appProfileMenu.style.display = "none";
		this.appProfileMenuFigure.innerHTML = "";
	}

	onProfileActionsClick() {
		this.appProfileMenu.style.display = "flex";

		this.appProfileMenuFigure.innerHTML = `<img src="${this.user.url}" alt="photo de ${this.user.firstname} ${this.user.lastname}" />`;
		this.appProfileMenuFigure.addEventListener(
			"click",
			this.onAppProfileMenuCloseClick.bind(this)
		);

		const dashboardButton = document.getElementById("dashboard-button");
		const logoutButton = document.getElementById("logout-button");
		const profileButton = document.getElementById("profile-button");

		profileButton.addEventListener("click", () => {
			this.onAppProfileMenuCloseClick();
			this.onNavigate("#profile");
		});

		dashboardButton.addEventListener("click", () => {
			this.onAppProfileMenuCloseClick();
			this.onNavigate("#dashboard");
		});

		logoutButton.addEventListener("click", () => {
			this.onAppProfileMenuCloseClick();
			this.authenticationService.logout();
			this.onNavigate("");
		});
	}

	updateCartItemsInterface() {
		const cartItems = document.getElementById("cart-items");
		const cart = this.cartService.getAllCartItems();
		cartItems.innerHTML = "";
		if (typeof cart == "string") {
			const message =
				"<p style='text-align:center; margin-block:5px;'>Aucun article dans votre panier actuellement<p>";
			cartItems.innerHTML = message;
		} else {
			for (const el of cart) {
				new Promise((resolve) => {
					cartItems.innerHTML += cartItem(el);
					resolve();
				})
					.then(() => {
						const minusButton = document.getElementById(
							"cart-minus-" + el.id
						);
						minusButton.addEventListener("click", () =>
							this.onAppCartMinusClick(el)
						);
					})
					.then(() => {
						const plusButton = document.getElementById(
							"cart-plus-" + el.id
						);
						plusButton.addEventListener("click", () =>
							this.onAppCartPlusClick(el)
						);
					})
					.then(() => {
						const trashButton = document.getElementById(
							"cart-trash-" + el.id
						);
						trashButton.addEventListener("click", () =>
							this.onAppCartTrashClick(el)
						);
					});
			}
		}
	}

	onAppCartMinusClick(data) {
		if (data.quantity == 1) {
			this.onAppCartTrashClick(data);
		}

		if (data.quantity > 1) {
			const updatedCartItem = { ...data, quantity: data.quantity - 1 };
			new Promise((resolve) => {
				this.cartService.updateCartItem(updatedCartItem);
				resolve();
			})
				.then(() => {
					this.updateCartItemsInterface();
				})
				.then(() => {
					this.updateDashboarCartSectionInterface();
					this.updateDashboarPaymentSectionInterface();
					this.updateCartItemsCountSpanInterface();
				})
				.then(() => {
					this.notificationService.setNotification({
						type: "success",
						content: "Panier mis à jour"
					});
				});
		}
	}

	onAppCartPlusClick(data) {
		const updatedCartItem = { ...data, quantity: data.quantity + 1 };
		new Promise((resolve) => {
			this.cartService.updateCartItem(updatedCartItem);
			resolve();
		})
			.then(() => {
				this.updateCartItemsInterface();
			})
			.then(() => {
				this.updateDashboarCartSectionInterface();
				this.updateDashboarPaymentSectionInterface();
				this.updateCartItemsCountSpanInterface();
			})
			.then(() => {
				this.notificationService.setNotification({
					type: "success",
					content: "Panier mis à jour"
				});
			});
	}

	onAppCartTrashClick(data) {
		new Promise((resolve) => {
			this.cartService.removeOneItem(data.name);
			resolve();
		})
			.then(() => {
				this.updateCartItemsInterface();
			})
			.then(() => {
				this.updateDashboarCartSectionInterface();
				this.updateDashboarPaymentSectionInterface();
				this.updateCartItemsCountSpanInterface();
			})
			.then(() => {
				this.notificationService.setNotification({
					type: "success",
					content: "Panier mis à jour"
				});
			});
	}

	onAppCartCloseClick() {
		this.appCart.style.display = "none";
		this.appCart.setAttribute("aria-expanded", false);
	}

	onAppCartClick() {
		this.appCart.style.display = "flex";
		this.appCart.setAttribute("aria-expanded", true);
		this.updateCartItemsInterface();
	}
}

export default HeaderContainer;
