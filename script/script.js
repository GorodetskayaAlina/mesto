const openPopupButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__activity');
let formElement = popup.querySelector('.popup__form');
let popupName = popup.querySelector('.popup__form-item_user-info_name');
let popupJob = popup.querySelector('.popup__form-item_user-info_job');

//открытие попапа
function popupOpen() {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

//закрытие попапа
function popupClose() {
    popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);

//функция добавляет данные, введенные пользователем, в профиль
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    popupClose();
}

//кнопка сохранения профиля
formElement.addEventListener('submit', formSubmitHandler);