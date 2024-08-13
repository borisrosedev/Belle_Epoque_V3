function field(data) {
	return `
    
        <article class="form__field">
                        <section class="form__field-icon-label-input">
                            <span class="material-symbols-outlined" aria-label="${data.ariaLabel}">
                               ${data.spanTextContent}
                            </span>
                            <section class="form__label-and-input">
                                <label for="${data.id}"></label>
                                <input 
                                    id="${data.id}"
                                    type="${data.type}"
                                    name="${data.id}"
                                    pattern="${data.pattern}"
                                    required
                                    placeholder="${data.placeholder}"
                                    aria-required="true"
                                />
                            </section>
                        </section>
                        <section class="form__field-error" id="${data.id}-error">


                        </section>
         </article>
    
    
    `
}

export default field
