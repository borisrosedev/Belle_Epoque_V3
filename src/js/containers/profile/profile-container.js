import AuthRequiredContainer from "../../models/auth-required-container/auth-required-container.js";
import LocalStorageService from "../../services/local-storage/local-storage.service.js";
import userCard from "../../ui/components/user-card/user-card.js";

class ProfileContainer extends AuthRequiredContainer {
    constructor(onNavigate) {
        super(onNavigate);
        this.profileUserSection = document.getElementById('profile-user-section');
        this.createUserCardInterface();
    }

    createUserCardInterface () {
        this.profileUserSection.innerHTML = userCard(this.user);
    }

}

export default ProfileContainer;