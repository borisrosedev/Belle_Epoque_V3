console.log("app-header.js file has been read")

function appHeader() {
	return `
    
     <header class="app__header landing__header flex-between fixed-top">
            <a class="custom-anchor"href="">Belle Epoque</a>
            <nav>
                <ul>
                    <li>
                        <a class="custom-anchor" href="#menu">Menu</a>
                    </li>
                    <li>
                        <a class="custom-anchor" href="#login">Login</a>
                    </li>

                </ul>
            </nav>
        </header>
    
    `
}

export default appHeader
