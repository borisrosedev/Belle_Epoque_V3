function message(data) {
	return `
        <section class="message ${data.classNames ? data.classNames : ""}"  id="${data.id ?? ""}">
            <section>
                <figure>
                    <img src="./assets/avatar-woman.jpg" alt="avatar de femme">
                </figure>
            </section>
            <section>
                <p>${data.content}</p>
            </section>
        </section>
    `
}

export default message
