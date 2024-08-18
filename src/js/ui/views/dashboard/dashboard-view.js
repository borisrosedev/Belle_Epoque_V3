function dashboardView() {
	return `
        <main class="app__main dashboard__main">
            <section class="dashboard__welcome" id="dashboard-welcome"></section>
            <section class="dashboard__cart-section">
                <h2 style="font-family:'Parisienne', cursive; color: #fff"> Votre panier </h2>
                <section id="dashboard-cart"></section>
            </section>
     
            <section class="dashboard__payment-section" id="dashboard-payment"></section
        </main>
    
    `;
}

export default dashboardView;
