import message from "../../ui/components/message/message.js"

class NotificationService {
	notificationAside = document.getElementById("app-notification")

	constructor() {}

	setNotification(data) {
		this.notificationAside.style.display = "flex"
		this.notificationAside.innerHTML = message({
			id: "notification-message",
			content: data.content
		})

		const notificationMessage = document.getElementById(
			"notification-message"
		)
		notificationMessage.classList.add("notification-message")

		setTimeout(() => {
			this.notificationAside.style.display = "none"
			this.notificationAside.innerHTML = ""
		}, 7000)
	}
}

export default NotificationService
