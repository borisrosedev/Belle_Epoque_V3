import button from "../button/button.js"
import field from "../field/field.js"

function form(data) {
	return `
        <form class="form" id="${data.id}">
                <section class="form__fields">
                    ${data.fields.map((el) => field(el)).join("")}
               
                </section>
                <section class="form__buttons">
                ${data.buttons.map((el) => button(el)).join("")}
                </section>
                <section class="form__errors"></section>
            </form>
    
    `
}

export default form
