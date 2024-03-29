export class FormValidator {
    constructor(validationConfig, formElement) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._formElement = formElement;
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
    _deleteInputError(input) {
        const formError = this._formElement.querySelector((`#${input.id}-error`));
        input.classList.remove(this._inputErrorClass);
        formError.classList.remove(this._errorClass);
        formError.textContent = '';
    }

    //Метод удаляет класс с ошибкой у всех инпутов формы
    deleteFormError() {
        this._inputList.forEach((input) => {
            this._deleteInputError(input);
        });
    }


    // Метод проверяет валидность поля
    _checkValid(input) {
        if (!input.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._addInputError(input);
        } else {
            // Если проходит, скроем
            this._deleteInputError(input);
        }
    }

    // Метод проверяет валидность всех полей
    _checkValidAllInput() {
        return this._inputList.some(function (input) {
            return !input.validity.valid;
        })
    }

    //Метод делает кнопку неактивной
    setButtonDisabled() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true);
    }

    //Метод делает кнопку активной
    setButtonActive() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled');
    }

    // Метод управляет активацией кнопки
    _toggleButtonState() {
        if (this._checkValidAllInput()) {
            this.setButtonDisabled();
        } else {
            this.setButtonActive();
        }
    }

    //Метод добавляет обработчики всем полям формы
    _setEventListeners() {
        this._toggleButtonState();
        // в каждом поле проверяется валидность и активируется кнопка
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkValid(input);
                this._toggleButtonState();
            });
        });
    }

    //Функция, которая добавляет обработчики всем формам
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}