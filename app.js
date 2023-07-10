class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipe--section')
        this.$noresultWrapper = document.querySelector('.noresult--section')
        this.allRecipes = []
        this.tags = []
        this.IngredientsTags = []
        this.UstensilsTags = []
        this.AppareilsTags = []
        this.onSearch = this.onSearch.bind(this)
        this.onTagRemove = this.onTagRemove.bind(this)
        document.querySelector('form').addEventListener('keyup', this.onSearch)
        document.addEventListener('click', this.onTagRemove)
    }

    fetchRecipes() {
        this.allRecipes = recipes.map(recipe => new Recipe(recipe))
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
    }

    clearNoResultWrapper() {
        this.$noresultWrapper.parentElement.classList.add('d-none')
        this.$noresultWrapper.innerHTML = ""
    }

    search(query) {
        const RecipeMainSearch = new MainSearch(this.allRecipes)
        const foundedRecipes = RecipeMainSearch.search(query)
        return foundedRecipes
    }


    onSearch(e) {
        e.preventDefault()
        const query = e.target.value
        if (query.length >= 3) {
            this.allRecipes = this.search(query)
            this.displayRecipes(this.allRecipes, query)
            KeyWordList.init(this.allRecipes)
            this.onTagSelect()
        } else if (query.length === 0) {
            this.fetchRecipes()
            this.allRecipes = this.searchWithTags(this.IngredientsTags, this.UstensilsTags, this.AppareilsTags)
            this.displayRecipes(this.allRecipes)
            KeyWordList.init(this.allRecipes)
            this.onTagSelect()
        }
    }

    onTagRemove(e) {
        if (e.target.tagName === 'I' && e.target.classList.contains('delete-tag') && this.tags.includes(e.target.getAttribute('data-item'))) {
            e.preventDefault()
            this.fetchRecipes()
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
            this.allRecipes = this.searchWithTags(this.IngredientsTags, this.UstensilsTags, this.AppareilsTags)
            this.displayRecipes(this.allRecipes)
            KeyWordList.init(this.allRecipes)
            this.onTagSelect()
        }
    }

    displayRecipes(recipesToDisplay, query) {
        this.clearRecipesWrapper()
        this.clearNoResultWrapper()

        if (Object.keys(recipesToDisplay).length === 0) {
            const EmptyContent = new NoResult(query)
            this.$noresultWrapper.appendChild(EmptyContent.createNoResult())
            this.$noresultWrapper.parentElement.classList.remove('d-none')
        } else {
            recipesToDisplay.forEach(Recipe => {
                const Template = new RecipeCard(Recipe)
                this.$recipesWrapper.appendChild(Template.createRecipeCard())
            })
        }
        
        // affichage du nombre de recettes trouvé
        const $recipeQuantityWrapper = document.querySelector('.recipe-quantity--section')
        let numberRecipes = recipesToDisplay.length
        let recette = (numberRecipes>1 ? "recettes" : "recette")
        $recipeQuantityWrapper.innerHTML = `${numberRecipes} ${recette}`
    }

    searchWithTags(ingredientsTags, ustensilsTags, appareilsTags) {
        ingredientsTags = ingredientsTags.map(tag => tag.toLowerCase());
        ustensilsTags = ustensilsTags.map(tag => tag.toLowerCase());
        appareilsTags = appareilsTags.map(tag => tag.toLowerCase());
        var recipesByTags = [...this.allRecipes]

        for (let i = 0; i < ingredientsTags.length; i++) {
            recipesByTags = recipesByTags.filter((recipe) => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(ingredientsTags[i])))
        }

        for (let i = 0; i < ustensilsTags.length; i++) {
            recipesByTags = recipesByTags.filter((recipe) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensilsTags[i])))
        }

        for (let i = 0; i < appareilsTags.length; i++) {
            recipesByTags = recipesByTags.filter((recipe) => recipe.appliance.toLowerCase().includes(appareilsTags[i]))
        }

        return recipesByTags
    }

    onTagSelect() {
        const listElements = document.querySelectorAll('.dropdown-item')
        Array.from(listElements).forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault()
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
                    this.allRecipes = this.searchWithTags(this.IngredientsTags, this.UstensilsTags, this.AppareilsTags)
                    this.displayRecipes(this.allRecipes)
                    // mettre à jour la liste des mots clés dans les dropdown
                    KeyWordList.init(this.allRecipes)
                    this.onTagSelect()
                }
            })
        })
    }

    main() {
        this.fetchRecipes()
        KeyWordList.init(this.allRecipes)
        this.onTagSelect()
        this.displayRecipes(this.allRecipes)
    }
}

const app = new App()
app.main()