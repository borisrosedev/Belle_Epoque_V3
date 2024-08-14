import button from "../button/button.js";
import paragraph from "../paragraph/paragraph.js";

function message(data) {
	return `
        <section class="message ${data.classNames ? data.classNames : ""}"  id="${data.id ?? ""}">
            <section>
                <figure>
                    <img src="./assets/avatar-woman.jpg" alt="avatar de femme">
                </figure>
            </section>
            <section>
                ${paragraph({ content: data.content })}
                ${
					data.actions
						? `
                    <ul>
                        ${data.actions.map((el) => "<li>" + button(el) + "</li>").join("")}
                    </ul>
                `
						: ""
				}
            </section>
        </section>
    `;
}

export default message;
