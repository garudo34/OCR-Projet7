class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipe--section')
        this.AllRecipes = []
        this.searchByTags = []
    }

    fetchRecipes() {
        this.AllRecipes = recipes.map(recipe => new Recipe(recipe))
    }

    

    main() {
        this.fetchRecipes()

        const Search = new SearchForm(this.AllRecipes)
        Search.render()

        KeyWordList.init(this.AllRecipes)
        this.AllRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesWrapper.appendChild(
                Template.createRecipeCard()
            )
        })
    }
}



const app = new App()
app.main()