import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm, removalFormError) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._removalFormError = removalFormError;
    this._inputList = this._popup.querySelectorAll('.popup__form-item');
    this._popupForm = this._popup.querySelector('.popup__form');
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
      this._removalFormError();
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