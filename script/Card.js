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
      this._buttonLike.classList.toggle('card__button-like_active');
    }
  
    //метод удаления карточек
    _deleteCard () {
      this._buttonDelete.closest('.card').remove();
    }
  
    //слушатели
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._handleLikeButton();
      });
  
      this._buttonDelete.addEventListener('click', () => {
        this._deleteCard();
      });
  
      this._cardImage.addEventListener('click', () => {
        this._openImageWindowCard();
      });
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._buttonLike = this._element.querySelector('.card__button-like');
      this._buttonDelete = this._element.querySelector('.card__button-delete');
      this._cardImage = this._element.querySelector('.card__image');

      this._setEventListeners();
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector('.card__name').textContent = this._name;
  
      return this._element;
    }
  }