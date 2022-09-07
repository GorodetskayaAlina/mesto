import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButton = this._popup.querySelector('.popup-confirmation__save');
  }

  submitCallback(submit) {
    this._submitForm = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitForm();
      this.close();
    });
  }
}