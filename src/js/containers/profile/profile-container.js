import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import userCard from "../../ui/components/user-card/user-card.js";

class ProfileContainer {
    constructor(onNavigate) {
        this.onNavigate = onNavigate;
        this.localStorageService = new LocalStorageService();
        const user = this.localStorageService.getSpecificItem('user');
        if(!user){
            this.onNavigate("#login");
            return;
        }
        this.user = user;
        this.profileUserSection = document.getElementById('profile-user-section');
        this.createUserCardInterface();
    }

    createUserCardInterface () {
        this.profileUserSection.innerHTML = userCard(this.user);
    }

}

export default ProfileContainer;