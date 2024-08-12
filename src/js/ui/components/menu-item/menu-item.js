function menuItem (data) {

    return `

             <article id="${data.id}">
                    <figure tabindex="0" id="figure-${data.id}">
                        <img 
                            src="${data.url}" 
                            alt="Image de/du ${data.name}"
                        />
                    </figure>
                    <section>
                        <h3>${data.name}</h3>
                        <section>
                            <span aria-label="prix du produit" style="font-family: 'Poppins', sans-serif">${data.price}$</span>
                            <button
                                data-itemid="${data.id}" 
                                id="add-item-${data.id}"
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


export default menuItem