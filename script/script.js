const openPopupButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const closePopupButton = popupEdit.querySelector('.popup__close-edit');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__activity');
let formElement = popupEdit.querySelector('.popup__form-edit');
let popupName = popupEdit.querySelector('.popup__form-item_user-info_name');
let popupJob = popupEdit.querySelector('.popup__form-item_user-info_job');

//открытие попапа
function popupOpen(elem) {
    elem.classList.add('popup_opened');
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
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    popupClose(popupEdit);
}

//кнопка сохранения профиля
formElement.addEventListener('submit', formSubmitHandler);

//открытие и закрытие попапа добавления новых карточек
const openPopupButtonRefill = document.querySelector('.profile__button-refill');
const popupRefill = document.querySelector('.popup-refill');
const closePopupButtonRefill = popupRefill.querySelector('.popup__close-refill');

openPopupButtonRefill.addEventListener('click', function popupOpenRefill() {
  popupOpen(popupRefill);
});

function popupCloseRefill() {
  popupClose(popupRefill);
}

closePopupButtonRefill.addEventListener('click', popupCloseRefill);

let popupRefillForm = popupRefill.querySelector('.popup__form-refill');
let popupCardName = popupRefill.querySelector('.popup__form-item_refill-card-name');
let popupCardUrl = popupRefill.querySelector('.popup__form-item_refill-card-url');

//функция добавления новых карточек
function newCardRefill(evt) {
    evt.preventDefault();
    
    cardRefillTemplate({name: popupCardName.value, link: popupCardUrl.value});
    popupCardName.value = '';
    popupCardUrl.value = '';
    popupCloseRefill();
}
  
//клик по кнопке пополнения контента
popupRefillForm.addEventListener('submit', newCardRefill);

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
function cardRefill(item) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__image').alt = item.name;
  card.querySelector('.card__name').textContent = item.name;
  return card;
}

//функция реализации карточек
function cardRefillTemplate(item) {
  gridSection.prepend(cardRefill(item));

  //реализация лайка
  const likeButton = document.querySelector('.card__button-like');
  likeButton.addEventListener('click', function makeLike (evt) {
  evt.target.classList.toggle('card__button-like_active');});

  //удаление карточки
  const deleteButton = document.querySelector('.card__button-delete');
  deleteButton.addEventListener('click', function deleteCard (evt) {
    evt.target.closest('.card').remove();
  });

  //открытие и закрытие попапа с картинками
  let image = document.querySelector('.card__image');
  const popupImg = document.querySelector('.popup-card');
  const popupCloseImg = document.querySelector('.popup__close-img');
  
  image.addEventListener('click', function openImage(evt) {
    popupOpen(popupImg);
    popupImg.querySelector('.popup-card__body').src = evt.target.src;
    popupImg.querySelector('.popup-card__body').alt = evt.target.alt;
    popupImg.querySelector('.popup-card__title').textContent = evt.target.alt;
  });

  popupCloseImg.addEventListener('click', function closeImage () {
   popupClose(popupImg);
  });
}

//проходим по массиву карточек
initialCards.forEach(function (item) {
  cardRefillTemplate(item);
});