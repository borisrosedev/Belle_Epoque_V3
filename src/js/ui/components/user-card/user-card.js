import paragraph from "../paragraph/paragraph.js";

function userCard(data) {
	return `
        <article class="user-card">
            <header>
                <section>
                    <figure>
                        <img src="${data.url}" alt="photo de l'utilisateur ${data.firstname} ${data.lastname}" />
                    </figure>
                </section>
                <section>
                    <h2>${data.firstname} ${data.lastname}</h2>
                </section>
            </header>
            <section>
                ${paragraph({ content: "<b>Age : </b>" + data.age + " ans" })}
                ${paragraph({ content: "<b>Email : </b>" + data.email })}
            </section>
        </article>
    
    `;
}

export default userCard;
