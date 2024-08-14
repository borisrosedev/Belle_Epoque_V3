import AuthenticationService from "../../services/authentication-service/authentication.server.js"

class LogoutContainer {
	constructor() {
		new AuthenticationService().logout()
		setTimeout(() => {
			window.location.hash = ""
		}, 3000)
	}
}

export default LogoutContainer
