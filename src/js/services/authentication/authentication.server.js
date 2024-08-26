import DataSource from "../../data-sources/data-source.js";
import LocalStorageService from "../local-storage/local-storage.service.js";

class AuthenticationService {
	constructor() {
		this.dataSource = new DataSource();
		this.localStorageService = new LocalStorageService();
	}

	async login(data) {
		const users = await this.dataSource.get("./data/users/users.json");

		const user = users.find((el) => el.email == data.email);
		if (!user) {
			return "Identifiant/Mot de passe incorrect";
		}

		if (!(user.password === data.password)) {
			return "Identifiant/Mot de passe incorrect";
		}

		delete user.password;
		this.localStorageService.setSpecificItem("user", user);
	}

	register() {}

	logout() {
		this.localStorageService.removeSpecificItem("user");
	}
}

export default AuthenticationService;
