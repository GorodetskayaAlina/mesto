import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, removeFormError) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._removeFormError = removeFormError;
    this._inputList = this._popup.querySelectorAll('.popup__form-item');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSaveButton = this._popup.querySelector('.popup__save');
    this._popupSaveButtonValue = this._popupSaveButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._removeFormError();
  }

  submitLoading(isLoading) {
    if (isLoading) {
      this._popupSaveButton.textContent = 'Сохранение...'
    } else {
      this._popupSaveButton.textContent = this._popupSaveButtonValue;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}