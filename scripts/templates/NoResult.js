export default class NoResult {
  constructor(query) {
    this.query = query;
  }

  createNoResult() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('col');

    const $noresult = `
      <div class="alert alert-light" role="alert">
        Aucune recette ne contient '${this.query}' vous pouvez chercher « tarte aux pommes », « poisson », etc...
      </div>
    `;
    $wrapper.innerHTML = $noresult;
    return $wrapper;
  }
}
