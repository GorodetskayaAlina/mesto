import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  buttonOpeningProfile, formProfileElement, popupNameInputValue,
  popupJobInputValue, buttonOpeningCardForm, formCardElement, validationConfig, initialCards
} from '../utils/constants.js';

//Подключение валидации
const profileFormValid = new FormValidator(validationConfig, formProfileElement);
profileFormValid.enableValidation();

const cardAddPopupValid = new FormValidator(validationConfig, formCardElement);
cardAddPopupValid.enableValidation();

//отрисовка модального окна с картинками
const popupImageModal = new PopupWithImage('.popup-card');
popupImageModal.setEventListeners();

//функция добавления карточек
function createCard(cardItem) {
  const card = new Card(cardItem, '#template-card', () => { popupImageModal.open(cardItem.link, cardItem.name) });
  return card;
}


// Добавление массива карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardsList.addItem(card.generateCard());
  },
},
  '.grid'
);

cardsList.renderItems();

//отрисовка попапа добавления карточек
const popupCardForm = new PopupWithForm('.popup-refill',
  (cardItem) => {
    const card = createCard({ name: cardItem.cardname, link: cardItem.cardurl });
    cardsList.addItem(card.generateCard());
  },
  () => { cardAddPopupValid.deleteFormError() });

popupCardForm.setEventListeners();

//открытие попапа добавления новых карточек
buttonOpeningCardForm.addEventListener('click', function openPopupCardForm() {
  popupCardForm.open();
  cardAddPopupValid.setButtonDisabled();
});

//отрисовка попапа профиля
const popupProfileForm = new PopupWithForm('.popup-edit', (userInfo) => {
  profileUserInfo.setUserInfo(userInfo.profilename, userInfo.profilejob);
}, () => { profileFormValid.deleteFormError() });

popupProfileForm.setEventListeners();

//Открытие попапа с профилем
buttonOpeningProfile.addEventListener('click', () => {
  const { name, job } = profileUserInfo.getUserInfo()
  popupNameInputValue.value = name;
  popupJobInputValue.value = job;
  profileFormValid.setButtonActive();
  popupProfileForm.open();
});

//экземпляр класса информации о пользователе
const profileUserInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__activity' });