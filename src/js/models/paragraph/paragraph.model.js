class ParagraphModel {
	constructor(data) {
		if (!data.content) {
			throw new Error("No content for the paragraph");
		}
		this.content = data.content;
	}
}
