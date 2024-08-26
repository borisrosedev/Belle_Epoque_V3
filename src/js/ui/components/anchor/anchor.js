function anchor(data) {
	return `
        <a href="${data.href}" target="${data.target ? data.target : "_self"}">${data.textContent}</a>
    `;
}

export default anchor;
