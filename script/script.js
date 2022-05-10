const openPopupButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const closePopupButton = popupEdit.querySelector('.popup__close-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');
const formElement = popupEdit.querySelector('.popup__form-edit');
const popupName = popupEdit.querySelector('.popup__form-item_user-info_name');
const popupJob = popupEdit.querySelector('.popup__form-item_user-info_job');
const popupImg = document.querySelector('.popup-card');
const popupCloseImg = document.querySelector('.popup__close-img');

//открытие попапа
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

//закрытие попапа
function popupClose(popup) {
    popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', function popupOpenEdit() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  popupOpen(popupEdit);
});

closePopupButton.addEventListener('click', function popupCloseEdit() {
  popupClose(popupEdit);
});

//функция добавляет данные, введенные пользователем, в профиль
function handleProfileData (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    popupClose(popupEdit);
}

//кнопка сохранения профиля
formElement.addEventListener('submit', handleProfileData);

//открытие и закрытие попапа добавления новых карточек
const openCardFormButton = document.querySelector('.profile__button-refill');
const cardFormModalWindow = document.querySelector('.popup-refill');
const closeCardFormButton = cardFormModalWindow.querySelector('.popup__close-refill');

openCardFormButton.addEventListener('click', function popupOpenCardForm() {
  popupOpen(cardFormModalWindow);
});

closeCardFormButton.addEventListener('click', () => popupClose(cardFormModalWindow));

const popupCardForm = cardFormModalWindow.querySelector('.popup__form-refill');
const popupCardName = cardFormModalWindow.querySelector('.popup__form-item_refill-card-name');
const popupCardUrl = cardFormModalWindow.querySelector('.popup__form-item_refill-card-url');

//функция добавления новых карточек
function addNewCard(evt) {
    evt.preventDefault();
    
    addCardTemplate({name: popupCardName.value, link: popupCardUrl.value});
    popupCardName.value = '';
    popupCardUrl.value = '';
    popupClose(cardFormModalWindow);
}
  
//клик по кнопке пополнения контента
popupCardForm.addEventListener('submit', addNewCard);

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
function addCard(cardElement) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__button-like');
  const deleteButton = card.querySelector('.card__button-delete');
  const image = card.querySelector('.card__image');
  card.querySelector('.card__image').src = cardElement.link;
  card.querySelector('.card__image').alt = cardElement.name;
  card.querySelector('.card__name').textContent = cardElement.name;

  //реализация лайка
  likeButton.addEventListener('click', function makeLike (evt) {
    evt.target.classList.toggle('card__button-like_active');
    });

    //удаление карточки
   deleteButton.addEventListener('click', function deleteCard (evt) {
    evt.target.closest('.card').remove();
  });

  //открытие и закрытие попапа с картинками
    image.addEventListener('click', function openImage(evt) {
    popupOpen(popupImg);
    popupImg.querySelector('.popup-card__body').src = evt.target.src;
    popupImg.querySelector('.popup-card__body').alt = evt.target.alt;
    popupImg.querySelector('.popup-card__title').textContent = evt.target.alt;
  });

  return card;
}

//функция реализации карточек
function addCardTemplate(cardElement) {
  gridSection.prepend(addCard(cardElement)); 
}

//закрытие попапа с карточками
popupCloseImg.addEventListener('click', function closeImage () {
  popupClose(popupImg);
 });

//проходим по массиву карточек
initialCards.forEach(function (cardElement) {
  addCardTemplate(cardElement);
});