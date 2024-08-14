function appCart() {
	return `

        <aside id="app-cart" aria-label="panier de l'utilisateur">
            <header>
                <h2>Panier</h2>
                <button id="app-cart-close-button">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            </header>
            <section id="cart-items"></section>
        </aside>
    
    `;
}

export default appCart;
