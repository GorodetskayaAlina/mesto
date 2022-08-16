import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImg = this._popup.querySelector('.popup-card__body');
    this._popupCardName = this._popup.querySelector('.popup-card__title');
    }
  
    open(link, name) {    
      this._popupCardImg.src = link;
      this._popupCardImg.alt = name;
      this._popupCardName.textContent = name;
      this._popup.classList.add('popup_opened');
    }
  }