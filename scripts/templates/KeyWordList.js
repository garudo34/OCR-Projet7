export default class KeyWordList {
  static init(recipes) {
    const {
      IngredientsDropdown,
      UstensilsDropdown,
      AppareilsDropdown,
    } = this.createKeywordLists(recipes);
    this.$dropdownWrapper = document.querySelector('.keyword--section');
    this.$dropdownWrapper.innerHTML = '';
    this.$dropdownWrapper.appendChild(IngredientsDropdown.render());
    this.$dropdownWrapper.appendChild(UstensilsDropdown.render());
    this.$dropdownWrapper.appendChild(AppareilsDropdown.render());
    this.onInputSearch(IngredientsDropdown, UstensilsDropdown, AppareilsDropdown);
  }

  constructor(name, type, list) {
    this.name = name;
    this.type = type;
    this.list = list;
    this.$wrapper = document.createElement('div');
    this.$wrapper.classList.add('col-3', `dropdown-${this.type.toLowerCase()}`);
    this.tags = [];
  }

  static onInputSearch(IngredientsDropdown, UstensilsDropdown, AppareilsDropdown) {
    const inputs = document.querySelectorAll('.search-list');
    Array.from(inputs).forEach((input) => {
      input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        const listId = input.id;
        let typeDropDown = null;
        if (listId === 'search-ingredients') {
          typeDropDown = IngredientsDropdown;
        } else if (listId === 'search-ustensils') {
          typeDropDown = UstensilsDropdown;
        } else if (listId === 'search-appareils') {
          typeDropDown = AppareilsDropdown;
        }
        const tagMatched = typeDropDown.list.filter((element) => element.toLowerCase().includes(query));
        this.refreshDropDown(typeDropDown, tagMatched);
      });
    });
  }

  static refreshDropDown(DropDownElement, listValue) {
    const wrapperToUpdate = document.querySelector(`.dropdown-${DropDownElement.type}`);
    const listElements = wrapperToUpdate.querySelectorAll(`[data-type="${DropDownElement.type}"]`);
    Array.from(listElements).forEach((element) => {
      const dropdownListElement = element;
      if (!listValue.includes(dropdownListElement.textContent.toLowerCase())) {
        dropdownListElement.parentElement.style.display = 'none';
      } else {
        dropdownListElement.parentElement.style.display = 'block';
      }
    });
  }

  static createKeywordLists(recipes) {
    const ArrayIngredients = [];
    const ArrayUstensils = [];
    const ArrayAppareils = [];
    recipes.forEach((recipe) => {
      if (Object.prototype.hasOwnProperty.call(recipe, '_ingredients')) {
        recipe._ingredients.forEach((ingredient) => {
          if (!ArrayIngredients.includes(ingredient.ingredient.toLowerCase())) {
            ArrayIngredients.push(ingredient.ingredient.toLowerCase());
          }
        });
      }
      if (Object.prototype.hasOwnProperty.call(recipe, '_ustensils')) {
        recipe._ustensils.forEach((ustensil) => {
          if (!ArrayUstensils.includes(ustensil.toLowerCase())) {
            ArrayUstensils.push(ustensil.toLowerCase());
          }
        });
      }
      if (Object.prototype.hasOwnProperty.call(recipe, '_appliance')) {
        if (!ArrayAppareils.includes(recipe._appliance.toLowerCase())) {
          ArrayAppareils.push(recipe.appliance.toLowerCase());
        }
      }
    });

    const IngredientsDropdown = new KeyWordList('Ingredients', 'ingredients', ArrayIngredients);
    const UstensilsDropdown = new KeyWordList('Ustensils', 'ustensils', ArrayUstensils);
    const AppareilsDropdown = new KeyWordList('Appareils', 'appareils', ArrayAppareils);

    return {
      IngredientsDropdown,
      UstensilsDropdown,
      AppareilsDropdown,
    };
  }

  static createListeElement(element, type) {
    return `<li><span class="dropdown-item" data-type="${type}">${element.charAt(0).toUpperCase() + element.slice(1)}</span></li>`;
  }

  render() {
    const $dropdownList = `
            <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${this.name}
                    <i class="fa-solid fa-chevron-down"></i>
                    <i class="fa-solid fa-chevron-up"></i>
                </button>
                <ul class="dropdown-menu shadow-sm">
                    <li>
                        <div class="input-group mb-3 px-2">
                            <input type="search" class="form-control search-list" id="search-${this.name.toLowerCase()}" aria-label="${this.name.toLowerCase()}" aria-describedby="basic-addon1">
                            <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                        </div>
                    </li>
                    ${this.list.map((element) => this.constructor.createListeElement(element, this.type)).join('')}
                </ul>
            </div>
        `;
    this.$wrapper.innerHTML = $dropdownList;
    return this.$wrapper;
  }
}
