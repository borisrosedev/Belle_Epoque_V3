import paragraph from "../components/paragraph/paragraph.js";

function appSpinner() {
	return `
        <aside id="app-spinner" aria-label="indicateur d'un temps de chargement">
              <div class="outer-spinner" aria-label="spinner externe">
                 <div class="inner-spinner" aria-label="spinner interne"></div>
              </div>

              <section id="app-spinner-message"></section>
        </aside>
    `;
}

export default appSpinner;
