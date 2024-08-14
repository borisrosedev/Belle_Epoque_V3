class LocalStorageService {
	constructor() {}
	getSpecificItem(itemKey) {
		const result = window.localStorage.getItem(itemKey)
		const itemValue = JSON.parse(result)
		return itemValue
	}

	removeSpecificItem(itemKey) {
		window.localStorage.removeItem(itemKey)
	}

	setSpecificItem(itemKey, itemValue) {
		window.localStorage.setItem(itemKey, JSON.stringify(itemValue))
	}
}

export default LocalStorageService
