export class FormValidator {
    constructor(obj, formElement) {
        this._formSelector = obj.formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        this._formElement = formElement;
        this._input = this._formElement.querySelector('.popup__form-item');
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._button = this._formElement.querySelector(this._submitButtonSelector)
    }

    // метод добавляет класс с ошибкой
    _addInputError(input) {
        const formError = this._formElement.querySelector((`#${input.id}-error`));
        input.classList.add(this._inputErrorClass);
        formError.textContent = input.validationMessage;
        formError.classList.add(this._errorClass);
    }

    // Метод удаляет класс с ошибкой
    deleteInputError(input) {
        const formError = this._formElement.querySelector((`#${input.id}-error`));
        input.classList.remove(this._inputErrorClass);
        formError.classList.remove(this._errorClass);
        formError.textContent = '';
    }

    // Метод проверяет валидность поля
    _checkValid(input) {
        if (!input.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        this._addInputError(input);
        } else {
        // Если проходит, скроем
        this.deleteInputError(input);
        }
    }

    // Метод проверяет валидность всех полей
    _checkValidAllInput () {
    return this._inputList.some(function (input) {
        return !input.validity.valid;
    })
    }

    //Метод делает кнопку неактивной
    getButtonDisabled () {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true);
    }

    //Метод делает кнопку активной
    getButtonActive () {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled');
    }

    // Метод управляет активацией кнопки
    _activateSubmitButton () {
        if (this._checkValidAllInput()) {
            this.getButtonDisabled();
        } else {
            this.getButtonActive();
        }
    }

    //Метод добавляет обработчики всем полям формы
    _tagEventListeners () {
        this._activateSubmitButton();
        // в каждом поле проверяется валидность и активируется кнопка
        this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
            this._checkValid(input);
            this._activateSubmitButton();
        });
        });
    }

    //Функция, которая добавляет обработчики всем формам
    enableValidation () {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._tagEventListeners();
        }
}