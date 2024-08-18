import message from "../../ui/components/message/message.js";

class NotificationService {

	constructor() {
		// je récupère l'élément html ci-dessous qui est déjà à ce niveau-là présent 
		// dans mon élément html ayant comme id root
		// et j'en fais un attribut de la classe NotifificationService

		this.notificationAside = document.querySelector("#app-notification");
	}

	setNotification(data, duration = 7000) {

		if(!data || !data.content) {
			throw new Error("Vous devez définir un objet data et une propriété content dedans pour la méthode SetNotifcation");
		} 

		this.duration = duration;

		if(this.timeOutId){
			clearTimeout(this.timeOutId);
		}
	
		this.notificationAside.style.display = "flex";
		this.notificationAside.innerHTML = message({
			id: "notification-message",
			content: data.content
		});

		const notificationMessage = document.getElementById(
			"notification-message"
		);
		notificationMessage.classList.add("notification-message");

		this.timeOutId = setTimeout(this.displayNotification, this.duration);
	}

	displayNotification() {
		this.notificationAside.style.display = "none";
		this.notificationAside.innerHTML = "";
	}
}

export default NotificationService;
