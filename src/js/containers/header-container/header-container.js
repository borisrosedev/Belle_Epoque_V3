import AuthenticationService from "../../services/authentication-service/authentication.server.js"
import CartService from "../../services/cart/cart.service.js"
import LocalStorageService from "../../services/local-storage-service/local-storage.service.js"
import cartItem from "../../ui/components/cart-item/cart-item.js"

class HeaderContainer {
	constructor() {
		this.user = new LocalStorageService().getSpecificItem("user")
		this.cartService = new CartService()
		this.authenticationService = new AuthenticationService()
		if (this.user) {
			this.appProfileMenu = document.getElementById("app-profile-menu")
			this.appProfileMenuFigure = document.getElementById(
				"app-profile-menu__figure"
			)
			this.profileActions = document.getElementById("profile-actions")
			this.profileActions.addEventListener(
				"click",
				this.onProfileActionsClick.bind(this)
			)
			this.appCartButton = document.getElementById("app-cart-button")
			this.appCartButton.addEventListener(
				"click",
				this.onAppCartClick.bind(this)
			)
			this.appCart = document.getElementById("app-cart")
			const appCartCloseButton = document.getElementById(
				"app-cart-close-button"
			)
			appCartCloseButton.addEventListener(
				"click",
				this.onAppCartCloseClick.bind(this)
			)
		}
	}

	onAppProfileMenuCloseClick() {
		this.appProfileMenu.style.display = "none"
		this.appProfileMenuFigure.innerHTML = ""
	}

	onProfileActionsClick() {
		this.appProfileMenu.style.display = "flex"

		this.appProfileMenuFigure.innerHTML = `<img src="${this.user.url}" alt="photo de ${this.user.firstname} ${this.user.lastname}" />`
		this.appProfileMenuFigure.addEventListener(
			"click",
			this.onAppProfileMenuCloseClick.bind(this)
		)

		const dashboardButton = document.getElementById("dashboard-button")
		const logoutButton = document.getElementById("logout-button")

		dashboardButton.addEventListener("click", () => {
			this.onAppProfileMenuCloseClick()
			window.location.hash = "#dashboard"
		})

		logoutButton.addEventListener("click", () => {
			this.onAppProfileMenuCloseClick()
			this.authenticationService.logout()
			window.location.hash = ""
		})
	}

	onAppCartCloseClick() {
		this.appCart.style.display = "none"
		this.appCart.setAttribute("aria-expanded", false)
	}

	onAppCartClick() {
		this.appCart.style.display = "flex"
		this.appCart.setAttribute("aria-expanded", true)
		const cartItems = document.getElementById("cart-items")
		const cart = this.cartService.getAllCartItems()
		cartItems.innerHTML = ""
		if (typeof cart == "string") {
			const message =
				"<p style='text-align:center; margin-block:5px;'>Aucun article dans votre panier actuellement<p>"
			cartItems.innerHTML = message
		} else {
			for (const el of cart) {
				new Promise((resolve, reject) => {
					cartItems.innerHTML += cartItem(el)
					resolve()
				})
			}
		}
	}
}

export default HeaderContainer
