function button(data) {
	return `
        <button
            type="${data.type ? data.type : "button"}"
            class="button ${data.classNames ? data.classNames : ""}"
            id="${data.id}"
        >${data.textContent}</button>
    `
}

export default button
