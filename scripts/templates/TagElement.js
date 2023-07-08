class TagElement{

    constructor(libelle, type) {
        this._libelle = libelle
        this._type = type
        this.$wrapper = document.createElement('li')
        this.$wrapper.classList.add('tag')
        this.$taglist = document.querySelector('.tags--list')
    }

    render () {
        const tagItem = `
            <span>${this._libelle}</span>
            <i class="fa-solid fa-xmark delete-tag" data-item="${this._libelle}" data-type="${this._type}"></i>
        `;
        this.$wrapper.innerHTML = tagItem;
        this.$taglist.prepend(this.$wrapper);
    }
}