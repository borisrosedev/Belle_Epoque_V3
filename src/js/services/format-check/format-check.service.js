class FormatCheckService {
	constructor() {}

	checkEmail(e) {
		const pattern = new RegExp(
			/^[a-z0-9.]{2,40}[@]{1}[a-z0-9]{2,7}[.]{1}[a-z]{2,5}$/
		)
		return pattern.test(e)
	}

	checkPassword(p) {
		const pattern = new RegExp(/^[a-zA-Z0-9ï!?ûéàè]{12,20}$/)
		return pattern.test(p)
	}

	checkName(n) {
		const pattern = new RegExp(/^[a-zéüïèà]{2,30}$/)
		return pattern.test(n)
	}
}

export default FormatCheckService
