import paragraph from "./paragraph.js";

describe("Paragraph Unit Test Suite", function () {
	let root;
	const paragraphData = {
		content: "Bienvenue sur l'application Belle Epoque"
	};
	beforeAll(function () {
		root = document.createElement("div");
		root.id = "root";
		document.body.appendChild(root);
		root.innerHTML += paragraph(paragraphData);
	});
	tests();
});

function tests() {
	test("should have a paragrah in the root div", function () {
		expect(root.innerHTML).toBe(
			'<p class="paragraph">Bienvenue sur l\'application Belle Epoque</p>'
		);
	});

	test("should have a class paragraph", function () {
		expect(root.firstChild.classList[0]).toBe("paragraph");
	});

	test("should have a textcontent starting with Bienvenue", () => {
		const textContent = root.firstChild.textContent;
		expect(textContent.startsWith("Bienvenue")).toBe(true);
	});
}
