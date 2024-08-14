import message from "../../components/message/message.js"

function buyingView() {
	return `
        <main class="app__main buying__main">
            ${message({
				content: "Bienvenue sur la page d'achat"
			})}
        </main>
    `
}

export default buyingView
