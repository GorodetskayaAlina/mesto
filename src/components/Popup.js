export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
    }
  
    open() {
      this._popup.classList.add('popup_opened');
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  
      this._buttonClose = this._popup.querySelector('.popup__close');
      this._buttonClose.addEventListener('click', () => {
        this.close();
      });
  
      this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
      });
    }
  }