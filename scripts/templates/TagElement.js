export default class TagElement {
  constructor(libelle, type) {
    this.libelle = libelle;
    this.type = type;
    this.$wrapper = document.createElement('li');
    this.$wrapper.classList.add('tag');
    this.$taglist = document.querySelector('.tags--list');
  }

  render() {
    const tagItem = `
            <span>${this.libelle}</span>
            <i class="fa-solid fa-xmark delete-tag" data-item="${this.libelle}" data-type="${this.type}"></i>
        `;
    this.$wrapper.innerHTML = tagItem;
    this.$taglist.prepend(this.$wrapper);
  }
}
