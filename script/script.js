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
const buttonSavingCard = document.querySelector('.popup__save-refill');
const buttonSavingProfile = document.querySelector('.popup__save-edit');

//открытие попапа
function openPopup(popup) {
  popup.addEventListener('click', closePopupOverlayClick);
  document.addEventListener('keydown', closePopupEscClick);
  popup.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(popup) {
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

buttonOpeningProfile.addEventListener('click', function openPopupProfile() {
  popupNameInputValue.value = profileName.textContent;
  popupJobInputValue.value = profileJob.textContent;
  getButtonActive(buttonSavingProfile, formObject);
  openPopup(profilePopup);
});

buttonClosingProfile.addEventListener('click', function closePopupProfile() {
  closePopup(profilePopup);
  deleteInputError(formProfileElement, popupNameInputValue, formObject);
  deleteInputError(formProfileElement, popupJobInputValue, formObject);
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
  deleteInputError(formCardElement, popupCardInputValue, formObject);
  deleteInputError(formCardElement, popupUrlInputValue, formObject);
});

//функция добавления новых карточек
function addNewCard(evt) {
    evt.preventDefault();
    
    addCardTemplate({name: popupCardInputValue.value, link: popupUrlInputValue.value});
    closePopup(cardFormModalWindow);
    getButtonDisabled(buttonSavingCard, formObject);
}
  
//клик по кнопке пополнения контента
formCardElement.addEventListener('submit', addNewCard);

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

//нашли темплейт
const cardTemplate = document.querySelector('#template-card').content;
const gridSection = document.querySelector('.grid');


//функция добавления каждой карточки
function addCardList(cardElement) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__button-like');
  const buttonDeleteCard = card.querySelector('.card__button-delete');
  const imageCard = card.querySelector('.card__image');
  imageCard.src = cardElement.link;
  imageCard.alt = cardElement.name;
  card.querySelector('.card__name').textContent = cardElement.name;

  //реализация лайка
  likeButton.addEventListener('click', function handleLikeButton (evt) {
    evt.target.classList.toggle('card__button-like_active');
    });

    //удаление карточки
    buttonDeleteCard.addEventListener('click', function deleteCard (evt) {
    evt.target.closest('.card').remove();
  });

  //открытие и закрытие попапа с картинками
  imageCard.addEventListener('click', function openImageWindowCard(evt) {
    popupImageModal.querySelector('.popup-card__body').src = evt.target.src;
    popupImageModal.querySelector('.popup-card__body').alt = evt.target.alt;
    popupImageModal.querySelector('.popup-card__title').textContent = evt.target.alt;
    openPopup(popupImageModal);
  });

  return card;
}

//функция реализации карточек
function addCardTemplate(cardElement) {
  gridSection.prepend(addCardList(cardElement)); 
}

//закрытие попапа с карточками
buttonClosingImageModal.addEventListener('click', function closeImage () {
  closePopup(popupImageModal);
 });

//проходим по массиву карточек
initialCards.forEach(function (cardElement) {
  addCardTemplate(cardElement);
});