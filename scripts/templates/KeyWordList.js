class KeyWordList {

    static init(recipes) {
        const { IngredientsDropdown, UstensilsDropdown, AppareilsDropdown } = this.createKeywordLists(recipes);
        this.$dropdownWrapper = document.querySelector('.keyword--section')
        this.$dropdownWrapper.appendChild(IngredientsDropdown.render())
        this.$dropdownWrapper.appendChild(UstensilsDropdown.render())
        this.$dropdownWrapper.appendChild(AppareilsDropdown.render())
    }

    constructor(name, type, list) {
        this._name = name
        this._type = type
        this._list = list
        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('col-3')
        this._tags = []

    }

    static createKeywordLists(recipes) {
        const ArrayIngredients = [];
        const ArrayUstensils = [];
        const ArrayAppareils = [];

        for (var recipe of recipes) {
            if (recipe.hasOwnProperty("_ingredients")) {
                recipe._ingredients.forEach(ingredient => {
                    if (!ArrayIngredients.includes(ingredient.ingredient.toLowerCase())) {
                        ArrayIngredients.push(ingredient.ingredient.toLowerCase());
                    }
                });
            }
            if (recipe.hasOwnProperty("_ustensils")) {
                recipe._ustensils.forEach(ustensil => {
                    if (!ArrayUstensils.includes(ustensil.toLowerCase())) {
                        ArrayUstensils.push(ustensil.toLowerCase());
                    }
                });
            }
            if (recipe.hasOwnProperty("_appliance")) {
                if (!ArrayAppareils.includes(recipe._appliance.toLowerCase())) {
                    ArrayAppareils.push(recipe._appliance.toLowerCase());
                }
            }
        }
        const IngredientsDropdown = new KeyWordList('Ingredients', 'ingredients', ArrayIngredients);
        const UstensilsDropdown = new KeyWordList('Ustensils', 'ustensils', ArrayUstensils);
        const AppareilsDropdown = new KeyWordList('Appareils', 'appareils',  ArrayAppareils);
        
        return { IngredientsDropdown, UstensilsDropdown, AppareilsDropdown };
    }

    handleList() {
        const listElements = this.$wrapper.querySelectorAll('.dropdown-item')
        Array.from(listElements).forEach((element) => {
            element.addEventListener('click', (event) => {
                if (!this._tags.includes(event.target.innerText)) {
                    this._tags.push(event.target.innerText)
                    console.log(this._type, this._tags)
                    const Tag = new TagElement(event.target.innerText)
                    Tag.render()
                    // effectuer une recherche de recette
                    if (this._type === 'ingredients') {
                        
                    }
                    if (this._type === 'ustensils') {
                        
                    }
                    if (this._type === 'appareils') {
                        
                    }
                }
                
                // mettre à jour la liste des mots clés dans les dropdown
            })
        })
    }

    removeElement() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'I' && e.target.classList.contains('delete-tag') && this._tags.includes(e.target.getAttribute('data-item'))) {
                const value = e.target.getAttribute('data-item')
                const index = this._tags.indexOf(value)
                this._tags = [...this._tags.slice(0, index), ...this._tags.slice(index +1)]
                const tagToDelete = document.querySelector(`[data-item="${value}"]`);
                tagToDelete.parentElement.remove()
            }
        })
    }

    render() {
        const $dropdownList = `
            <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${this._name}
                    <i class="fa-solid fa-chevron-down"></i>
                    <i class="fa-solid fa-chevron-up"></i>
                </button>
                <ul class="dropdown-menu shadow-sm">
                    <li>
                        <div class="input-group mb-3 px-2">
                            <input type="search" class="form-control" aria-label="${this._name}" aria-describedby="basic-addon1">
                            <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                        </div>
                    </li>
                    ${this._list.map(function(element) {
                        return `<li><span class="dropdown-item">${element.charAt(0).toUpperCase() + element.slice(1)}</span></li>`
                    }).join("")}
                </ul>
            </div>
        `
        this.$wrapper.innerHTML = $dropdownList
        this.handleList()
        this.removeElement()
        return this.$wrapper
    }
}