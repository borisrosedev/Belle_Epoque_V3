function figure (data) {

    if(!("url" in data) && !("src" in data)){
        throw new Error("l'objet passé au composant figure doit avoir soit une propriété src soit une propriété url sans oublier qu'il doit avoir soit une propriété alt soit une propriété name");
    }

    if(!("alt" in data) && !("name" in data)) {
        throw new Error("l'objet passé au composant figure doit avoir soit une propriété alt soit une propriété name");
    }

    return `
        <figure class="custom-figure ${data.classNames ? data.classNames : ''}">
            <img src="${data.src ? data.src : data.url}" alt="image de ${data.alt ? data.alt : data.name}" />
        </figure>
    `;
}

export default figure;