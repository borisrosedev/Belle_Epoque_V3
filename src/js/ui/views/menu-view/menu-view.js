function menuView () {

    return `
    
        <main class="app__main menu__main">
            <section class="menu__section menu___starters">
               <header>
                    <h2>Entrées</h2>
                </header>
                <section class="menu-mains__list" id="starters">
                </section>
            </section>
            <section class="menu__section menu___mains">
                <header>
                    <h2>Plâts principaux</h2>
                </header>
                <section class="menu-mains__list" id="mains">
                </section>
            </section>
            <section class="menu__section menu__desserts">
                <header>
                    <h2>Desserts</h2>
                </header>
                <section class="menu-desserts__list" id="desserts">
                </section>  
            </section>
            <secton class="menu__section menu___drinks"></secton>
        
        </main>

    
    
    `

}


export default menuView