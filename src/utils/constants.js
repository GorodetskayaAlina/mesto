  export const buttonOpeningProfile = document.querySelector('.profile__button-edit');
  export const profilePopup = document.querySelector('.popup-edit');
  export const formProfileElement = profilePopup.querySelector('.popup__form-edit');
  export const popupNameInputValue = profilePopup.querySelector('.popup__form-item_user-info_name');
  export const popupJobInputValue = profilePopup.querySelector('.popup__form-item_user-info_job');
  export const buttonOpeningCardForm = document.querySelector('.profile__button-refill');
  export const cardFormModalWindow = document.querySelector('.popup-refill');
  export const formCardElement = cardFormModalWindow.querySelector('.popup__form-refill');

  //валидация
  export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__error_visible'
  };
  
  // массив карточек
  export const initialCards = [
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