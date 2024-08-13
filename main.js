import LandingContainer from "./src/js/containers/landing-container/landing-container.js"
import LogContainer from "./src/js/containers/log-container/log-container.js"
import MenuContainer from "./src/js/containers/menu-container/menu-container.js"
import appDialog from "./src/js/ui/layout/app-dialog.js"
import appHeader from "./src/js/ui/layout/app-header.js"
import appNotification from "./src/js/ui/layout/app-notification.js"
import landingView from "./src/js/ui/views/landing-view/landing-view.js"
import logView from "./src/js/ui/views/log-view/log-view.js"
import menuView from "./src/js/ui/views/menu-view/menu-view.js"
import notFoundView from "./src/js/ui/views/not-found-view/not-found-view.js"

const root = document.getElementById("root")

function setPageLayout() {
	root.innerHTML = ""
	return appHeader() + appNotification()
}

function renderViewDependingOnTheHash(h) {
	switch (h) {
		case "":
			root.innerHTML = setPageLayout() + landingView()
			new LandingContainer()
			break
		case "#login":
			root.innerHTML = setPageLayout() + logView(true)
			new LogContainer(true)
			break
		case "#register":
			root.innerHTML = setPageLayout() + logView(false)
			new LogContainer(false)
			break
		case "#menu":
			root.innerHTML = setPageLayout() + menuView() + appDialog()
			new MenuContainer()
			break
		default:
			root.innerHTML = notFoundView()
			break
	}
}

window.onpopstate = function () {
	renderViewDependingOnTheHash(window.location.hash)
}

renderViewDependingOnTheHash(window.location.hash)
