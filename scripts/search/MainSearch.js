class MainSearch {
    constructor(recipesPool) {
        this.recipes = recipesPool
    }

    /*
     *  Array.filter(condition) retourne un tableau avec les éléments du tableau qui satisfont la condition
     *  Array.includes(value)   retourne True si la valeur est contenu dans le tableau (ou une String)
     *  Array.find(condition)   retourne le premier élément qui satisfait la condition
     *  Array.some(condition)   retourne true si un élément satisfait la condition
     */

    search(query) {
        query = query.toLowerCase()
        return this.recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.ingredients.some(el => el.ingredient.toLowerCase().includes(query))
        )
    }

    filterRecipesV2(query) {
        const recipesArray = []
        query = query.toLowerCase()
        for (var i = 0; i < this.recipes.length; i++) {
            if (
                this.recipes[i].name.toLowerCase().includes(query) || 
                this.recipes[i].description.toLowerCase().includes(query) || 
                this.recipes[i].ingredients.some((el) => el.ingredient.toLowerCase().includes(query))
            ) {
                recipesArray.push(this.recipes[i]);
            }
        }
        return recipesArray
    }
}

