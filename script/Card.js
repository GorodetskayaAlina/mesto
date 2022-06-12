export class Card {
    constructor(data, selector, openImageWindowCard) {
      this._selector = selector;
      this._name = data.name;
      this._link = data.link;
      this._openImageWindowCard = openImageWindowCard;
    }
  
    _getTemplate() {
      const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
  
      return cardElement;
    }
  
    // метод реализации лайка
    _handleLikeButton() {
      this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
    }
  
    //метод удаления карточек
    _deleteCard () {
      this._element.querySelector('.card__button-delete').closest('.card').remove();
    }
  
    //слушатели
    _setEventListeners() {
      this._element.querySelector('.card__button-like').addEventListener('click', () => {
        this._handleLikeButton();
      });
  
      this._element.querySelector('.card__button-delete').addEventListener('click', () => {
        this._deleteCard();
      });
  
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._openImageWindowCard();
      });
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__image').alt = this._name;
      this._element.querySelector('.card__name').textContent = this._name;
  
      return this._element;
    }
  }