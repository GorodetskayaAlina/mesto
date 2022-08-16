import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {buttonOpeningProfile, formProfileElement, popupNameInputValue, 
  popupJobInputValue, buttonOpeningCardForm, formCardElement, validationConfig, initialCards}  from '../utils/constants.js';

//Подключение валидации
const profileFormValid = new FormValidator(validationConfig, formProfileElement);
profileFormValid.enableValidation();

const cardAddPopupValid = new FormValidator(validationConfig, formCardElement);
cardAddPopupValid.enableValidation();

//отрисовка модального окна с картинками
const popupImageModal = new PopupWithImage('.popup-card');
popupImageModal.setEventListeners();

// Добавление массива карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '#template-card', () => {popupImageModal.open(cardItem.link, cardItem.name)});
    cardsList.addItem(card.generateCard());
    }
  }, 
  '.grid'
  );

cardsList.renderItems();

//отрисовка попапа добавления карточек
const popupCardForm = new PopupWithForm('.popup-refill', (cardItem) => {
  const card = new Card({name: cardItem.cardname, link: cardItem.cardurl}, '#template-card', () => {popupImageModal.open(cardItem.cardurl, cardItem.cardname)});
  cardsList.addItem(card.generateCard());
  cardAddPopupValid.getButtonDisabled();
}, () => {cardAddPopupValid.deleteFormError()});
  
popupCardForm.setEventListeners();

//открытие попапа добавления новых карточек
buttonOpeningCardForm.addEventListener('click', function openPopupCardForm() {
  popupCardForm.open();
});

//отрисовка попапа профиля
const popupProfileForm = new PopupWithForm('.popup-edit', (userInfo) => {
  profileUserInfo.setUserInfo(userInfo.profilename, userInfo.profilejob);
}, () => {profileFormValid.deleteFormError()});

popupProfileForm.setEventListeners();

//Открытие попапа с профилем
buttonOpeningProfile.addEventListener('click', () => {
  popupNameInputValue.value = profileUserInfo.getUserInfo().name;
  popupJobInputValue.value = profileUserInfo.getUserInfo().job;
  profileFormValid.getButtonActive();
  popupProfileForm.open();
});

//экземпляр класса информации о пользователе
const profileUserInfo = new UserInfo({userNameSelector: '.profile__name', userJobSelector: '.profile__activity'});