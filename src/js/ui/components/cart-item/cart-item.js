function cartItem(data, context = "cart") {
	return `
        <article class="cart-item" id="cart-item-${data.id}">
            <figure>
                <img src="${data.url}" alt="image de ${data.name}" />
            </figure>
            <section>
                <section>
                    <span aria-label="nom du produit">${data.name}</span> 
                    <span aria-label="prix et quantité du produit">${data.price} * ${data.quantity}</span> 
                </section>
                <section>
                    <button id="${context}-minus-${data.id}"><i class="fa-solid fa-minus"></i></button>
                    <button id="${context}-plus-${data.id}"><i class="fa-solid fa-plus"></i></button>
                    <button id="${context}-trash-${data.id}"><i class="fa-solid fa-trash"></i></button>
                </section>
            </section>
        </article>
    `;
}

export default cartItem;
