export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createRecipeCard() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('col');

    const $recipeCard = `
      <div class="card">
        <span class="card-cooking-time">${this.recipe.time}min</span>
        <img src="${this.recipe.image}" class="card-img-top" alt="${this.recipe.name}">
        <div class="card-body">
          <h4 class="card-title">${this.recipe.name}</h4>
          <h5>RECETTE</h5>
          <p class="card-text text-clamping">${this.recipe.description}</p>
          <h5>INGREDIENTS</h5>
          <div class="d-flex flex-column flex-wrap card-ingredient">
    ${this.recipe.ingredients.map((ingredient) => {
    let ingredientQuantity = '';
    let ingredientUnit = '';
    if (ingredient.quantity) {
      ingredientQuantity = `${ingredient.quantity}`;
    }
    if (ingredient.unit) {
      ingredientUnit = `${ingredient.unit}`;
    }
    return `<div class="p-2">
      <div class="ingredient-title">${ingredient.ingredient}</div>
      <div class="ingredient-quantity">${ingredientQuantity} ${ingredientUnit}</div>
    </div>`;
  }).join('')}
          </div>
        </div>
      </div>
    `;
    $wrapper.innerHTML = $recipeCard;
    return $wrapper;
  }
}
