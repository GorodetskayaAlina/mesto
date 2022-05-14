const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__error_visible'
};

// Функция, которая добавляет класс с ошибкой
function addInputError(form, input, errorMessage, formObject) {
    const formError = form.querySelector((`#${input.id}-error`));
    input.classList.add(formObject.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(formObject.errorClass);
};
  
// Функция, которая удаляет класс с ошибкой
function deleteInputError(form, input, formObject) {
    const formError = form.querySelector((`#${input.id}-error`));
    input.classList.remove(formObject.inputErrorClass);
    formError.classList.remove(formObject.errorClass);
    formError.textContent = '';
};

// Функция, которая проверяет валидность поля
function checkValid (form, input) {
    if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    addInputError(form, input, input.validationMessage, formObject);
    } else {
    // Если проходит, скроем
    deleteInputError(form, input, formObject);
    }
};

// Функция, которая проверяет валидность всех полей
function checkValidAllInput (inputList) {
  return inputList.some(function (input) {
    return !input.validity.valid;
  })
};

//Функция, которая делает кнопку неактивной
function getButtonDisabled (button, formObject) {
  button.classList.add(formObject.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

//Функция, которая делает кнопку активной
function getButtonActive (button, formObject) {
  button.classList.remove(formObject.inactiveButtonClass);
  button.removeAttribute('disabled');
}

// Функция, которая управляет активацией кнопки
function activateSubmitButton (inputList, button) {
  if (checkValidAllInput(inputList)) {
    getButtonDisabled(button, formObject);
  } else {
    getButtonActive(button, formObject);
  }
}; 

//Функция, которая добавляет обработчики всем полям формы
function tagEventListeners (form, formObject) {
    // массив полей форм
    const inputList = Array.from(form.querySelectorAll(formObject.inputSelector));
    const button = form.querySelector(formObject.submitButtonSelector);
    activateSubmitButton(inputList, button);
    // в каждом поле проверяется валидность и активируется кнопка
    inputList.forEach(function (input) {
      input.addEventListener('input', function () {
        checkValid(form, input)
        activateSubmitButton(inputList, button);
      });
    });
}; 

//Функция, которая добавляет обработчики всем формам
function enableValidation (formObject) {
    // массив форм
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));
      formList.forEach(function (form) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      tagEventListeners(form, formObject);
    });
};

enableValidation(formObject);