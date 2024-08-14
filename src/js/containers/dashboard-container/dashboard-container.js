import CartService from "../../services/cart/cart.service.js"
import cartItem from "../../ui/components/cart-item/cart-item.js"
import paragraph from "../../ui/components/paragraph/paragraph.js"

class DashboardContainer {
	constructor() {
		this.cartService = new CartService()
		this.cart = this.cartService.getAllCartItems()
		this.dashboardCartSection = document.getElementById("dashboard-cart")
		this.dashboardActionsSection =
			document.getElementById("dashboard-actions")
		this.onInit()
	}

	onInit() {
		if (typeof this.cart !== "string") {
			for (const el of this.cart) {
				new Promise((resolve, reject) => {
					this.dashboardCartSection.innerHTML += cartItem(el)
				})
			}
		} else {
			this.dashboardCartSection = paragraph({
				content: "Aucun article dans votre panier actuellement"
			})
		}
	}
}

export default DashboardContainer
