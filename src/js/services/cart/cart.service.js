import LocalStorageService from "../local-storage-service/local-storage.service.js"

class CartService {
	constructor() {
		this.localStorageService = new LocalStorageService()
	}

	addOneItem(data) {
		const cart = this.localStorageService.getSpecificItem("cart")
		if (cart) {
			const itemWithTheSameName = cart.find((el) => el.name === data.name)
			if (itemWithTheSameName) {
				const indexOfIf = cart.indexOf(itemWithTheSameName)
				cart[indexOfIf] = {
					...itemWithTheSameName,
					quantity: itemWithTheSameName.quantity + 1
				}
			} else {
				cart.push({ ...data, quantity: 1 })
			}
			this.localStorageService.setSpecificItem("cart", cart)
		} else {
			this.localStorageService.setSpecificItem("cart", [
				{ ...data, quantity: 1 }
			])
		}
	}

	removeOneItem(name) {
		const cart = this.localStorageService.getSpecificItem("cart")
		if (cart) {
			const updatedCart = cart.filter((el) => el.name !== name)
			this.localStorageService.setSpecificItem("cart", updatedCart)
		} else {
			return "cart not found"
		}
	}

	getOneCartItem(name) {
		const cart = this.localStorageService.getSpecificItem("cart")
		if (cart) {
			const item = cart.find((el) => el.name === name)
			if (!item) {
				return `item with name ${name} not found`
			} else {
				return item
			}
		}
	}

	getAllCartItems() {
		const cart = this.localStorageService.getSpecificItem("cart")
		if (!cart) {
			return "cart not found"
		}
		return cart
	}
}

export default CartService
