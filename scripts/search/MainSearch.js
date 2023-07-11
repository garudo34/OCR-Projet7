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
}
