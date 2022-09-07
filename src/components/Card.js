export class Card {
  constructor(data, selector, user, handleCardClick, makeCardLike, deleteCardLike, confirmDeleteCard) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this.isLiked = true;
    this._makeCardLike = makeCardLike;
    this._deleteCardLike = deleteCardLike;
    this._confirmDeleteCard = confirmDeleteCard;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  //проверка наличия лайка на карточке
   _isCardLiked() {
    if (this._likes.some(elem => elem._id === this._user)) {
      this._buttonLike.classList.add('card__button-like_active');
      this.isLiked = false;
    } 
  }

  //метод обновления суммы лайков
  updateSumCardLikes(data) {
    this._likes = data.likes;
    this._sumLikes.textContent = this._likes.length;
  }

  // метод реализации лайка
  _handleLikeButton() {
    if (this.isLiked) {
    this._buttonLike.classList.add('card__button-like_active');
    this._makeCardLike();
    }
    else {this._buttonLike.classList.remove('card__button-like_active');
    this._deleteCardLike();
    }
  }

  // метод проверки владельца карточки
  _haveDeleteButton() {
    if (this._user !== this._cardOwnerId) {
      this._buttonDelete.remove();
    }
  }

  //метод удаления карточек
  deleteCard() {
    this._buttonDelete.closest('.card').remove();
  }

  //слушатели
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton();
      this.isLiked = !this.isLiked;
    });

    this._buttonDelete.addEventListener('click', () => {
      this._confirmDeleteCard(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__button-like');
    this._buttonDelete = this._element.querySelector('.card__button-delete');
    this._cardImage = this._element.querySelector('.card__image');
    this._sumLikes = this._element.querySelector('.card__sum-like');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._sumLikes.textContent = this._likes.length;
    this._element.querySelector('.card__name').textContent = this._name;
    this._isCardLiked();
    this._haveDeleteButton();

    return this._element;
  }
}