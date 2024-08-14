class DataSource {
	constructor() {}
	async get(url) {
		const result = await fetch(url)
		return await result.json()
	}

	async post(data, url, method = "POST") {
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		return await response.json()
	}
}

export default DataSource
