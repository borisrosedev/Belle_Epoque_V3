import AuthenticationService from "../../services/authentication-service/authentication.server.js"
import FormatCheckService from "../../services/format-check-service/format-check.service.js"

class LogContainer {
	constructor(isLoggingIn) {
		this.formatCheckService = new FormatCheckService()
		this.authenticationService = new AuthenticationService()

		this.isLoggingIn = isLoggingIn

		this.form = document.getElementById("log-form")
		this.formErrorsSection = document.getElementById("form-errors")
		this.form.addEventListener("submit", this.onSubmit.bind(this))

		this.passwordField = document.getElementById("password")
		this.passwordErrorSection = document.getElementById("password-error")

		this.emailField = document.getElementById("email")
		this.emailErrorSection = document.getElementById("email-error")

		if (!isLoggingIn) {
			this.firstnameField = document.getElementById("firstname")
			this.firstnameErrorSection =
				document.getElementById("firstname-error")

			this.lastnameField = document.getElementById("lastname")
			this.lastnameErrorSection =
				document.getElementById("lastname-error")

			this.confirmedPasswordField =
				document.getElementById("confirmed-password")
			this.confirmedPasswordErrorSection = document.getElementById(
				"confirmed-password-error"
			)
		}
	}

	checkIfRequiredFieldsHaveValue() {
		if (!this.isLoggingIn) {
			return (
				this.firstnameField.value &&
				this.lastnameField.value &&
				this.passwordField.value &&
				this.emailField.value &&
				this.confirmedPasswordField.value
			)
		} else {
			return this.passwordField.value && this.emailField.value
		}
	}

	checkFormatFieldValues() {
		const isEmailFormatValueCorrect = this.formatCheckService.checkEmail(
			this.emailField.value
		)
		if (!isEmailFormatValueCorrect) {
			this.emailErrorSection.innerHTML = `<small>L'email doit être écrit en minuscule</small>`
			return
		} else {
			this.emailErrorSection.innerHTML = ""
		}

		const isPasswordFormatValueCorrect =
			this.formatCheckService.checkPassword(this.passwordField.value)
		if (!isPasswordFormatValueCorrect) {
			this.passwordErrorSection.innerHTML = `<small>Le mot de passe doit avoir au minimum 12 caractères et au maximum 20 - vous pouvez utiliser les caractères é à è ï ...</small>`
			return
		} else {
			this.passwordErrorSection.innerHTML = ""
		}

		if (this.isLoggingIn) {
			return true
		}

		if (!this.isLoggingIn) {
			const isFirstnameFormatValueCorrect =
				this.formatCheckService.checkName(this.firstnameField.value)
			if (!isFirstnameFormatValueCorrect) {
				this.firstnameErrorSection.innerHTML = `<small>Le prénom doit être écrit en minuscule et doit avoir entre 2 et 30 caractères</small>`
				return
			} else {
				this.firstnameErrorSection.innerHTML = ""
			}

			const isLastnameFormatValueCorrect =
				this.formatCheckService.checkName(this.lastnameField.value)
			if (!isLastnameFormatValueCorrect) {
				this.lastnameErrorSection.innerHTML = `<small>Le nom doit être écrit en minuscule et doit avoir entre 2 et 30 caractères</small>`
				return
			} else {
				this.lastnameErrorSection.innerHTML = ""
			}

			const isConfirmedPasswordFormatValueCorrect =
				this.passwordField.value === this.confirmedPasswordField.value
			if (!isConfirmedPasswordFormatValueCorrect) {
				this.confirmedPasswordErrorSection.innerHTML = `<small>Les mots de passe doivent être identiques</small>`
				return
			} else {
				this.confirmedPasswordErrorSection.innerHTML = ""
			}

			return true
		}

		return false
	}

	async onSubmit(submitFormEvent) {
		console.log("into onSubmit")
		submitFormEvent.preventDefault()

		const doAllRequiredFieldsHaveValue =
			this.checkIfRequiredFieldsHaveValue()
		if (!doAllRequiredFieldsHaveValue) {
			this.formErrorsSection.innerHTML +=
				"<small>Tous les champs du formulaire doivent être remplis</small>"
			return
		}

		this.formErrorsSection.innerHTML = ""
		const areFormatFieldValuesCorrect = this.checkFormatFieldValues()
		if (!areFormatFieldValuesCorrect) {
			this.formErrorsSection.innerHTML +=
				"<small>Veuillez respecter les indications ci-dessus</small>"
			return
		}

		this.formErrorsSection.innerHTML += ""

		if (this.isLoggingIn) {
			const error = await this.authenticationService.login({
				email: this.emailField.value,
				password: this.passwordField.value
			})
			if (error) {
				this.formErrorsSection.innerHTML += `<small>${error}</small>`
			} else {
				this.formErrorsSection.innerHTML += `<small style="color: rgb(0,150,0)">Connexion en cours ...</small>`

				setTimeout(() => {
					this.formErrorsSection.innerHTML = ""
					window.location.hash = "#dashboard"
				}, 3000)
			}
		} else {
			this.authenticationService.register({
				email: this.emailField.value,
				password: this.passwordField.value,
				firstname: this.firstnameField.value,
				lastname: this.lastnameField.value
			})
		}
	}
}

export default LogContainer
