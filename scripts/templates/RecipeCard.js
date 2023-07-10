class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
        
    }

    createRecipeCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('col')

        const $recipeCard = `
            <div class="card">
                <span class="card-cooking-time">${this._recipe.time}min</span>
                <img src="${this._recipe.image}" class="card-img-top" alt="${this._recipe.name}">
                <div class="card-body">
                    <h4 class="card-title">${this._recipe.name}</h4>
                    <h5>RECETTE</h5>
                    <p class="card-text text-clamping">${this._recipe.description}</p>
                    <h5>INGREDIENTS</h5>
                    <div class="d-flex flex-column flex-wrap card-ingredient">
                    ${this._recipe.ingredients.map(function(ingredient) {
                        let ingredientQuantity = ""
                        let ingredientUnit = ""
                        if (ingredient.quantity) {
                            ingredientQuantity = `${ingredient.quantity}`
                        }
                        if (ingredient.unit) {
                            ingredientUnit = `${ingredient.unit}`
                        }
                        return `<div class="p-2">
                            <div class="ingredient-title">${ingredient.ingredient}</div>
                            <div class="ingredient-quantity">${ingredientQuantity} ${ingredientUnit}</div>
                        </div>`
                    }).join("")}
                    </div>
                </div>
            </div>
        `
        $wrapper.innerHTML = $recipeCard
        return $wrapper
    }
}
