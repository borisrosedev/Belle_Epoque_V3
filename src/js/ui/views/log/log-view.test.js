import logView from "./log-view.js"
import { screen } from "@testing-library/dom"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

describe("Log View Integration Test Suite", () => {
	beforeAll(() => {
		const root = document.createElement("div")
		root.id = "root"
		document.body.appendChild(root)
		root.innerHTML = logView()
	})
	tests()
})

function tests() {
	test("should have a main element", () => {
		expect(screen.getByRole("main")).toBeInTheDocument()
	})

	test("should have a form element", () => {
		expect(screen.getByTestId("log-form")).toBeInTheDocument()
	})

	test("should have an input with the placeholder : Entrez votre email", () => {
		expect(screen.getByPlaceholderText("Entrez votre email")).toBeTruthy()
	})

	test("should have an email input with value 10Caroline10 when user types it in it", async () => {
		const passwordInput = screen.getByPlaceholderText(
			"Entrez votre mot de passe"
		)
		await userEvent.type(passwordInput, "10Caroline10")
		expect(passwordInput.value).toBe("10Caroline10")
	})
}
