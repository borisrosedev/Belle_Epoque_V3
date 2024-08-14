import LocalStorageService from "../../services/local-storage/local-storage.service.js";

function appHeader() {
	const user = new LocalStorageService().getSpecificItem("user");

	return `
    
     <header class="app__header landing__header flex-between fixed-top">
            <a class="custom-anchor"href="">Belle Epoque</a>

            <section class="app-header__actions-and-nav">
            ${
				user
					? `<section class="app-header__actions">
                        <button type="button" id="app-cart-button">
                            <i class="fa-solid fa-bag-shopping"></i>
                        </button>
                    </section>`
					: ""
			}    
           
                <nav>
                    <ul>
                        <li>
                            <a class="custom-anchor" href="#menu">Menu</a>
                        </li>

                        ${
							!user
								? `<li>
                                        <a class="custom-anchor" href="#login">Login</a>
                                    </li>`
								: ""
						}
                    

                    </ul>
                </nav>

            
                ${
					user
						? `<figure 
                    id="profile-actions"
                    class="app-header__profile-actions" tabindex="0" 
                    aria-label="moyen d'accéder au menu du profil personnel de l'utilisateur"
                >
                    <img src="${user.url}" alt="photo de ${user.firstname} ${user.lastname}"/>
                </figure>`
						: ""
				}
                   
               

            </section>
            
        </header>
    
    `;
}

export default appHeader;
