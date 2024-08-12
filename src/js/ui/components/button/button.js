function button(data) {
	return `
        <button
            type="${data.type}"
            class="${data.classNames}"
            id="${data.id}"
        >${data.textContent}</button>
    `
}

export default button
