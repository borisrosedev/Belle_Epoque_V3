import DashboardContainer from "./src/js/containers/dashboard/dashboard-container.js";
import HeaderContainer from "./src/js/containers/header/header-container.js";
import LandingContainer from "./src/js/containers/landing/landing-container.js";
import LogContainer from "./src/js/containers/log/log-container.js";
import MenuContainer from "./src/js/containers/menu/menu-container.js";
import appCart from "./src/js/ui/layout/app-cart.js";
import appDialog from "./src/js/ui/layout/app-dialog.js";
import appHeader from "./src/js/ui/layout/app-header.js";
import appNotification from "./src/js/ui/layout/app-notification.js";
import appProfileMenu from "./src/js/ui/layout/app-profile-menu.js";
import paymentView from "./src/js/ui/views/payment/payment-view.js";
import dashboardView from "./src/js/ui/views/dashboard/dashboard-view.js";
import landingView from "./src/js/ui/views/landing/landing-view.js";
import logView from "./src/js/ui/views/log/log-view.js";
import menuView from "./src/js/ui/views/menu/menu-view.js";
import notFoundView from "./src/js/ui/views/not-found/not-found-view.js";
import PaymentContainer from "./src/js/containers/payment/payment-container.js";
import completedView from "./src/js/ui/views/completed/completed-view.js";
import CompletedContainer from "./src/js/containers/completed/completed-container.js";
import profileView from "./src/js/ui/views/profile/profile-view.js";
import ProfileContainer from "./src/js/containers/profile/profile-container.js";
import appSpinner from "./src/js/ui/layout/app-spinner.js";

const root = document.getElementById("root");

function setPageLayout() {
	root.innerHTML = "";
	return appHeader() + appNotification() + appCart() + appProfileMenu();
}

window.onNavigate = function (h) {
	renderViewDependingOnTheHash(h);
};

function renderViewDependingOnTheHash(h) {
	window.history.pushState({}, "", window.location.pathname + h);

	switch (h) {
		case "":
			root.innerHTML = setPageLayout() + landingView();
			new HeaderContainer(window.onNavigate);
			new LandingContainer(window.onNavigate);
			break;
		case "#login":
			root.innerHTML = setPageLayout() + logView(true);
			new HeaderContainer(window.onNavigate);
			new LogContainer(window.onNavigate);
			break;
		case "#register":
			root.innerHTML = setPageLayout() + logView(false);
			new HeaderContainer(window.onNavigate);
			new LogContainer(false);
			break;
		case "#profile":
			root.innerHTML = setPageLayout() + profileView();
			new HeaderContainer(window.onNavigate);
			new ProfileContainer(window.onNavigate);
			break;
		case "#dashboard":
			root.innerHTML = setPageLayout() + dashboardView();
			new HeaderContainer(window.onNavigate);
			new DashboardContainer(window.onNavigate);
			break;
		case "#payment":
			root.innerHTML = setPageLayout() + paymentView();
			new HeaderContainer(window.onNavigate);
			new PaymentContainer(window.onNavigate);
			break;
		case "#completed":
			root.innerHTML = setPageLayout() + completedView();
			new CompletedContainer(window.onNavigate);
			break;
		case "#menu":
			root.innerHTML =
				setPageLayout() + menuView() + appDialog() + appSpinner();
			new HeaderContainer(window.onNavigate);
			new MenuContainer();
			break;
		default:
			root.innerHTML = notFoundView();
			break;
	}
}

window.onpopstate = function () {
	renderViewDependingOnTheHash(window.location.hash);
};

renderViewDependingOnTheHash(window.location.hash);
