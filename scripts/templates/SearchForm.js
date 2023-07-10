class SearchForm {
    constructor() {
        this.$wrapper = document.createElement('div')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
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
        this.$searchFormWrapper.appendChild(this.$wrapper)
    }
}