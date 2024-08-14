class ButtonModel {
	constructor(data) {
		this.classNames = data.classNames ? data.classNames : ""
		if (!data.id) {
			throw new Error("the button has no id !!!")
		}
		this.id = data.id
		this.textContent = data.textContent
		this.type = data.type ? data.type : "button"
	}
}

export default ButtonModel
