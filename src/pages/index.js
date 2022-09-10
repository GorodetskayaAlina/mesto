import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  buttonOpeningProfile, formProfileElement, popupNameInputValue,
  popupJobInputValue, buttonOpeningCardForm, formCardElement, validationConfig, formProfileAvatar, profileAvatarButton
} from '../utils/constants.js';
import { Api } from '../components/Api.js';


//Подключение валидации
const profileFormValid = new FormValidator(validationConfig, formProfileElement);
profileFormValid.enableValidation();

const cardAddPopupValid = new FormValidator(validationConfig, formCardElement);
cardAddPopupValid.enableValidation();

const avatarPopupValid = new FormValidator(validationConfig, formProfileAvatar);
avatarPopupValid.enableValidation();

//Подключение API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '4bb8181e-602a-4a9b-b870-9855c1bb8830',
    'Content-Type': 'application/json'
  }
});

//функция добавления карточек
function createCard(cardItem) {
  const card = new Card(cardItem, '#template-card',
    profileUserInfo.getUserId(),
    () => { popupImageModal.open(cardItem.link, cardItem.name) },
    () => {
      api.makeCardLike(cardItem._id).then((data) => {
        card.updateSumCardLikes(data);
        card.toggleLikeButton();
      })
        .catch((err) => {
          console.log(err);
        })
    },
    () => {
      api.deleteCardLike(cardItem._id).then((data) => {
        card.updateSumCardLikes(data);
        card.toggleLikeButton();
      })
        .catch((err) => {
          console.log(err);
        })
    },
    (cardId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.submitCallback(
        () => {
          api.deleteCardItem(cardId)
            .then((cardId) => {
              card.deleteCard(cardId);
              popupWithConfirmation.close();
            })
            .catch((err) => {
              console.log(err);
            })
        }
      )
    }
  );
  return card;
}

// Добавление массива карточек
const cardsList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card.generateCard());
  },
},
  '.grid'
);

//отрисовка попапа добавления карточек
const popupCardForm = new PopupWithForm('.popup-refill',
  (cardItem) => {
    popupCardForm.submitLoading(true);
    api.createNewCards(cardItem.cardname, cardItem.cardurl)
      .then((data) => {
        const card = createCard(data);
        cardsList.addItem(card.generateCard());
        popupCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCardForm.submitLoading(false);
      });
  },
  () => { cardAddPopupValid.deleteFormError() });

popupCardForm.setEventListeners();

//открытие попапа добавления новых карточек
buttonOpeningCardForm.addEventListener('click', function openPopupCardForm() {
  popupCardForm.open();
  cardAddPopupValid.setButtonDisabled();
});

//отрисовка модального окна с картинками
const popupImageModal = new PopupWithImage('.popup-card');
popupImageModal.setEventListeners();

//Попап с согласием на удаление карточки
const popupWithConfirmation = new PopupWithConfirmation('.popup-confirmation');

popupWithConfirmation.setEventListeners();

//экземпляр класса информации о пользователе
const profileUserInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__activity', userAvatar: '.profile__avatar' });

//отрисовка попапа профиля
const popupProfileForm = new PopupWithForm('.popup-edit',
  (userInfo) => {
    popupProfileForm.submitLoading(true);
    api.updateUserInfo(userInfo.profilename, userInfo.profilejob)
      .then((data) => {
        profileUserInfo.setUserInfo(data.name, data.about, data._id, data.avatar);
        popupProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfileForm.submitLoading(false);
      });
  },
  () => { profileFormValid.deleteFormError() });

popupProfileForm.setEventListeners();

//Открытие попапа с профилем
buttonOpeningProfile.addEventListener('click', () => {
  const { name, job } = profileUserInfo.getUserInfo()
  popupNameInputValue.value = name;
  popupJobInputValue.value = job;
  profileFormValid.setButtonActive();
  popupProfileForm.open();
});

//Отрисовка попапа с загрузкой аватара
const popupWithAvatar = new PopupWithForm('.popup-avatar',
  (url) => {
    popupWithAvatar.submitLoading(true);
    api.getProfileAvatar(url.avatar)
      .then((data) => {
        profileUserInfo.changeProfileAvatar(data.avatar);
        popupWithAvatar.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatar.submitLoading(false);
      });
  },
  () => { avatarPopupValid.deleteFormError() }
);

popupWithAvatar.setEventListeners();

//Открытие попапа со сменой аватара
profileAvatarButton.addEventListener('click', () => {
  avatarPopupValid.setButtonDisabled();
  popupWithAvatar.open();
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    profileUserInfo.setUserInfo(userData.name, userData.about, userData._id, userData.avatar);
    profileUserInfo.getUserId();
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });