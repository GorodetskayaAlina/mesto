const openPopupButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

function popupOpenToggle() {
    popup.classList.toggle('popup_opened');
}

function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupOpenToggle();
    }
}

openPopupButton.addEventListener('click', popupOpenToggle);
closePopupButton.addEventListener('click', popupOpenToggle);
popup.addEventListener('click', popupOverlayClickHandler);



let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__activity'); 
let profileNameValue = profileName.textContent;
let profileJobValue = profileJob.textContent;

let inputs = document.querySelectorAll('input');

inputs[0].value = profileNameValue;
inputs[1].value = profileJobValue;



let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-item_user-info_name');
let jobInput = document.querySelector('.popup__form-item_user-info_job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', popupOverlayClickHandler);