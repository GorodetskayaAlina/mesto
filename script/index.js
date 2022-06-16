import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
};
const buttonOpeningProfile = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.popup-edit');
const buttonClosingProfile = profilePopup.querySelector('.popup__close-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');
const formProfileElement = profilePopup.querySelector('.popup__form-edit');
const popupNameInputValue = profilePopup.querySelector('.popup__form-item_user-info_name');
const popupJobInputValue = profilePopup.querySelector('.popup__form-item_user-info_job');
const popupImageModal = document.querySelector('.popup-card');
const buttonClosingImageModal = document.querySelector('.popup__close-img');
const buttonOpeningCardForm = document.querySelector('.profile__button-refill');
const cardFormModalWindow = document.querySelector('.popup-refill');
const buttonClosingCardForm = cardFormModalWindow.querySelector('.popup__close-refill');
const formCardElement = cardFormModalWindow.querySelector('.popup__form-refill');
const popupCardInputValue = cardFormModalWindow.querySelector('.popup__form-item_refill-card-name');
const popupUrlInputValue = cardFormModalWindow.querySelector('.popup__form-item_refill-card-url');
const gridSection = document.querySelector('.grid');
const popupCardImg = popupImageModal.querySelector('.popup-card__body');
const popupCardName = popupImageModal.querySelector('.popup-card__title');

//Подключение валидации
const profileFormValid = new FormValidator(validationConfig, formProfileElement);
profileFormValid.enableValidation();

const cardAddPopupValid = new FormValidator(validationConfig, formCardElement);
cardAddPopupValid.enableValidation();

//открытие попапа
function openPopup(popup) {
  popup.addEventListener('click', closePopupOverlayClick);
  document.addEventListener('keydown', closePopupEscClick);
  popup.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(popup) {
  popup.removeEventListener('click', closePopupOverlayClick);
  document.removeEventListener('keydown', closePopupEscClick);
  popup.classList.remove('popup_opened');
}

//Функция закрытия попапа кликом на оверлей
function closePopupOverlayClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
}

//Функция закрытия попапа кликом на Esc
function closePopupEscClick(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}  

//Открытие и закрытие попапа с профилем
buttonOpeningProfile.addEventListener('click', () => {
  popupNameInputValue.value = profileName.textContent;
  popupJobInputValue.value = profileJob.textContent;
  profileFormValid.getButtonActive();
  openPopup(profilePopup);
});

buttonClosingProfile.addEventListener('click', () => {
  closePopup(profilePopup);
  profileFormValid.deleteFormError();
});

//функция добавляет данные, введенные пользователем, в профиль
function handleProfileData (evt) {
    evt.preventDefault();

    profileName.textContent = popupNameInputValue.value;
    profileJob.textContent = popupJobInputValue.value;

    closePopup(profilePopup);
}

//кнопка сохранения профиля
formProfileElement.addEventListener('submit', handleProfileData);

//открытие и закрытие попапа добавления новых карточек
buttonOpeningCardForm.addEventListener('click', function openPopupCardForm() {
  formCardElement.reset();
  openPopup(cardFormModalWindow);
  });

buttonClosingCardForm.addEventListener('click', function closePopupCardForm() { 
  closePopup(cardFormModalWindow);
  cardAddPopupValid.deleteFormError();
});

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция, которая создает новые карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#template-card', openImageWindowCard);
  return card;
}

//проходим по массиву карточек
initialCards.forEach(function (cardElement) {

//Добавляем карточки в секцию
  gridSection.prepend(createCard(cardElement).generateCard());
});

//функция добавления новых карточек
function addNewCard(evt) {
  evt.preventDefault();
    
  gridSection.prepend(createCard({name: popupCardInputValue.value, link: popupUrlInputValue.value}).generateCard());
  closePopup(cardFormModalWindow);
  cardAddPopupValid.getButtonDisabled();
}
  
//клик по кнопке пополнения контента
formCardElement.addEventListener('submit', addNewCard);

//открытие попапа с карточками
function openImageWindowCard() {
  popupCardImg.src = this._link;
  popupCardImg.alt = this._name;
  popupCardName.textContent = this._name;
  openPopup(popupImageModal);
};

//закрытие попапа с карточками
buttonClosingImageModal.addEventListener('click', function closeImage () {
  closePopup(popupImageModal);
 });