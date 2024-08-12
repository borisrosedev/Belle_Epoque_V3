import button from "../../ui/components/button/button.js"
import message from "../../ui/components/message/message.js"

class LandingContainer {

    constructor(){
        
        this.onInit()
        const landingMenuButton = document.getElementById("landing-menu-button")
        landingMenuButton.addEventListener('click', this.onClick)
        
    
    }

    onInit() {
        const main = document.getElementsByTagName('main')[0]

        main.innerHTML += message({ content: "Bienvenue sur l'application du restaurant Belle Epoque. Nous sommes heureux et heureuses de vous compter parmi nous."})
        main.innerHTML += button({
            id:"landing-menu-button",
            type:"button",
            classNames:"custom-button",
            textContent: "Découvrir notre menu"
        })

    }

    onClick() {
        window.location.hash = "#menu"
    }
}

export default LandingContainer