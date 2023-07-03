class Search {
    constructor(Recipes) {
        this.Recipes = Recipes
    }

    search(query) {
        return this.filterRecipes(query)
    }
}

class RecipeNameSearch extends Search {
    constructor(Recipes) {
        super(Recipes)
    }

    // Array.filter(condition) retourne un tableau avec les éléments du tableau qui satisfont la condition
    // Array.includes(value)   retourne True si la valeur est contenu dans le tableau (ou une String)
    // Array.find(condition)   retourne le premier élément qui satisfait la condition
    // Array.some(condition)   retourne true si un élément satisfait la condition

    filterRecipes(query) {
        query = query.toLowerCase()
        return this.Recipes.filter(Recipe =>
            Recipe.name.toLowerCase().includes(query) ||
            Recipe.description.toLowerCase().includes(query) ||
            Recipe.ingredients.some(el => el.ingredient.toLowerCase().includes(query))
        )
    }

    filterRecipesV2(query) {
        const recipesArray = []
        query = query.toLowerCase()
        for (var i = 0; i < this.Recipes.length; i++) {
            if (
                this.Recipes[i].name.toLowerCase().includes(query) || 
                this.Recipes[i].description.toLowerCase().includes(query) || 
                this.Recipes[i].ingredients.some((el) => el.ingredient.toLowerCase().includes(query))
            ) {
                recipesArray.push(this.Recipes[i]);
            }
        }
        return recipesArray
    }
}