import message from "../../components/message/message.js"

function logoutView() {
	return `
        <main class="app__main logout__main">
            
            <section>
              ${message({
					content: "Au revoir et à bientôt"
				})}
            </section>
               
        </main>
    
    `
}

export default logoutView
