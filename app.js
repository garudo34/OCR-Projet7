class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipe--section')
        this.tags = []
        this.allRecipes = recipes.map(recipe => new Recipe(recipe))
        this.filteredRecipes = this.allRecipes
        this.IngredientsTags = []
        this.UstensilsTags = []
        this.AppareilsTags = []
        this.Search = null
    }

    searchWithTags(ingredientsTags, ustensilsTags, appareilsTags) {
        ingredientsTags = ingredientsTags.map(tag => tag.toLowerCase());
        ustensilsTags = ustensilsTags.map(tag => tag.toLowerCase());
        appareilsTags = appareilsTags.map(tag => tag.toLowerCase());

        for (let i = 0; i < ingredientsTags.length; i++) {
            this.filteredRecipes = this.filteredRecipes.filter((recipe) => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(ingredientsTags[i])))
        }

        for (let i = 0; i < ustensilsTags.length; i++) {
            this.filteredRecipes = this.filteredRecipes.filter((recipe) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensilsTags[i])))
        }

        for (let i = 0; i < appareilsTags.length; i++) {
            this.filteredRecipes = this.filteredRecipes.filter((recipe) => recipe.appliance.toLowerCase().includes(appareilsTags[i]))
        }

        // prendre en compte la recherche principale si besoin
        
        return this.filteredRecipes
    }

    clearRecipeWrapper() {
        this.$recipesWrapper.innerHTML = ""
    }

    onTagSelect() {
        const listElements = document.querySelectorAll('.dropdown-item')
        Array.from(listElements).forEach((element) => {
            element.addEventListener('click', (event) => {
                if (!this.tags.includes(event.target.innerText)) {
                    let tag = event.target.innerText
                    let type = event.target.getAttribute('data-type')
                    this.tags.push(tag)
                    // on affiche les tags sélectionnés
                    const Tag = new TagElement(tag, type)
                    Tag.render()
                    // on met à jour les listes des tags selectionnés
                    if (type === 'ingredients') {
                        this.IngredientsTags.push(tag)
                    }
                    if (type === 'ustensils') {
                        this.UstensilsTags.push(tag)
                    }
                    if (type === 'appareils') {
                        this.AppareilsTags.push(tag)
                    }
                    // on fait une recherche avec les tags de chaque type
                    this.filteredRecipes = this.searchWithTags(this.IngredientsTags, this.UstensilsTags, this.AppareilsTags)
                    this.clearRecipeWrapper()
                    this.filteredRecipes.forEach(recipe => {
                        const Template = new RecipeCard(recipe)
                        this.$recipesWrapper.appendChild(
                            Template.createRecipeCard()
                        )
                    })
                    // mettre à jour la liste des mots clés dans les dropdown
                    KeyWordList.init(this.filteredRecipes)
                    this.onTagSelect()
                }
            })
        })
    }

    onTagRemove() {
        document.addEventListener('click', (e) => {
            this.filteredRecipes = this.allRecipes
            if (e.target.tagName === 'I' && e.target.classList.contains('delete-tag') && this.tags.includes(e.target.getAttribute('data-item'))) {
                const value = e.target.getAttribute('data-item')
                const index = this.tags.indexOf(value)
                this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)]
                const type = e.target.getAttribute('data-type')
                if (type === 'ingredients') {
                    const indexType = this.IngredientsTags.indexOf(value)
                    this.IngredientsTags = [...this.IngredientsTags.slice(0, indexType), ...this.IngredientsTags.slice(indexType + 1)]
                } else if (type === 'ustensils') {
                    const indexType = this.UstensilsTags.indexOf(value)
                    this.UstensilsTags = [...this.UstensilsTags.slice(0, indexType), ...this.UstensilsTags.slice(indexType + 1)]
                } else if (type === 'appareils') {
                    const indexType = this.AppareilsTags.indexOf(value)
                    this.AppareilsTags = [...this.AppareilsTags.slice(0, indexType), ...this.AppareilsTags.slice(indexType + 1)]
                }
                const tagToDelete = document.querySelector(`[data-item="${value}"]`);
                tagToDelete.parentElement.remove()
                // on fait une recherche avec les tags de chaque type
                this.filteredRecipes = this.searchWithTags(this.IngredientsTags, this.UstensilsTags, this.AppareilsTags)
                KeyWordList.init(this.filteredRecipes)
                this.onTagSelect()
                this.clearRecipeWrapper()
                this.filteredRecipes.forEach(recipe => {
                    const Template = new RecipeCard(recipe)
                    this.$recipesWrapper.appendChild(
                        Template.createRecipeCard()
                    )
                })
            }
        })
    }

    main() {
        this.Search = new SearchForm(this.filteredRecipes)
        this.Search.render()
        KeyWordList.init(this.filteredRecipes)
        this.onTagSelect()
        this.onTagRemove()
        this.filteredRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesWrapper.appendChild(
                Template.createRecipeCard()
            )
        })
    }
}



const app = new App()
app.main()