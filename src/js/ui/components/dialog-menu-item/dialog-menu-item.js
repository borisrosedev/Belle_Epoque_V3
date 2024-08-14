function dialogMenuItem(data) {
	return `

             <article id="dialog-menu-item">
                    <figure>
                        <img 
                            src="${data.url}" 
                            alt="Image de/du ${data.name}"
                        />
                    </figure>
                    <section>
                        <h3>${data.name}</h3>
                        <p>${data.description}</p>
                        <section>
                            <span aria-label="prix du produit" style="font-family: 'Poppins', sans-serif">${data.price}$</span>
                            <button
                                data-itemid="${data.id}" 
                                id="dialog-add-item-${data.id}"
                            >
                                <span class="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                            </button>
                        </section>
                    </section>
                </article>
    
    
    `
}

export default dialogMenuItem
