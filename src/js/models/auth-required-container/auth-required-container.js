import LocalStorageService from "../../services/local-storage/local-storage.service.js";

class AuthRequiredContainer {
	constructor(onNavigate) {
		this.onNavigate = onNavigate;
		this.localStorageService = new LocalStorageService();
		this.user = this.localStorageService.getSpecificItem("user");
	}

	checkAuth() {
		if (!this.user) {
			this.onNavigate("");
			return false;
		} else {
			return true;
		}
	}
}

export default AuthRequiredContainer;
