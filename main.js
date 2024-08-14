import HeaderContainer from "./src/js/containers/header-container/header-container.js"
import LandingContainer from "./src/js/containers/landing-container/landing-container.js"
import LogContainer from "./src/js/containers/log-container/log-container.js"
import LogoutContainer from "./src/js/containers/logout-container/logout-container.js"
import MenuContainer from "./src/js/containers/menu-container/menu-container.js"
import appCart from "./src/js/ui/layout/app-cart.js"
import appDialog from "./src/js/ui/layout/app-dialog.js"
import appHeader from "./src/js/ui/layout/app-header.js"
import appNotification from "./src/js/ui/layout/app-notification.js"
import appProfileMenu from "./src/js/ui/layout/app-profile-menu.js"
import dashboardView from "./src/js/ui/views/dashboard-view/dashboard-view.js"
import landingView from "./src/js/ui/views/landing-view/landing-view.js"
import logView from "./src/js/ui/views/log-view/log-view.js"
import logoutView from "./src/js/ui/views/logout-view/logout-view.js"
import menuView from "./src/js/ui/views/menu-view/menu-view.js"
import notFoundView from "./src/js/ui/views/not-found-view/not-found-view.js"

const root = document.getElementById("root")

function setPageLayout() {
	root.innerHTML = ""
	return appHeader() + appNotification() + appCart() + appProfileMenu()
}

function renderViewDependingOnTheHash(h) {
	switch (h) {
		case "":
			root.innerHTML = setPageLayout() + landingView()
			new HeaderContainer()
			new LandingContainer()
			break
		case "#login":
			root.innerHTML = setPageLayout() + logView(true)
			new HeaderContainer()
			new LogContainer(true)
			break
		case "#register":
			root.innerHTML = setPageLayout() + logView(false)
			new HeaderContainer()
			new LogContainer(false)
			break
		case "#dashboard":
			root.innerHTML = setPageLayout() + dashboardView()
			new HeaderContainer()
			break
		case "#logout":
			root.innerHTML = logoutView()
			new LogoutContainer()
			break
		case "#menu":
			root.innerHTML = setPageLayout() + menuView() + appDialog()
			new HeaderContainer()
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
