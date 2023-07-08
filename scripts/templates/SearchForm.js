class SearchForm {
    constructor(Recipes) {
        this.Recipes = Recipes
        this.RecipeMainSearch = new RecipeMainSearch(Recipes)

        this.$wrapper = document.createElement('div')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$recipesWrapper = document.querySelector('.recipe--section')
        this.$noresultWrapper = document.querySelector('.noresult--section')
    }

    search(query) {
        const SearchedRecipes = this.RecipeMainSearch.search(query)
        this.displayRecipes(SearchedRecipes, query)
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
    }

    clearNoResultWrapper() {
        this.$noresultWrapper.parentElement.classList.add('d-none')
        this.$noresultWrapper.innerHTML = ""
    }

    displayRecipes(Recipes, query) {
        this.clearRecipesWrapper()
        this.clearNoResultWrapper()

        if (Object.keys(Recipes).length === 0) {
            const EmptyContent = new NoResult(query)
            this.$noresultWrapper.appendChild(EmptyContent.createNoResult())
            this.$noresultWrapper.parentElement.classList.remove('d-none')
        } else {
            Recipes.forEach(Recipe => {
                const Template = new RecipeCard(Recipe)
                this.$recipesWrapper.appendChild(Template.createRecipeCard())
            })
        }
    }

    onSearch() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('keyup', e => {
                const query = e.target.value
                if (query.length >= 3) {
                    this.search(query)
                } else if (query.length === 0) {
                    this.displayRecipes(this.Recipes)
                }
            })
    }

    render() {
        const searchForm = `
        <form action="#" class="form-search-header" id="form-search-header">
            <div class="input-group mb-3 input-group-search">
                <input type="search" class="form-control form-control-lg"
                    placeholder="Rechercher une recette, un ingrédient, ..."
                    aria-label="Rechercher une recette, un ingrédient, ..."
                    aria-describedby="form-search-header-button">
                <button class="btn" type="button" id="form-search-header-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </form>
        `

        this.$wrapper.innerHTML = searchForm
        this.onSearch()
        this.$searchFormWrapper.appendChild(this.$wrapper)
    }
}