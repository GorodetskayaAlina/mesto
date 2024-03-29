export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //Информация о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        method: 'GET',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //загрузка аватара
  getProfileAvatar(urlAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: urlAvatar
        })
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //Обновление информации о пользователе
  updateUserInfo(userName, userJob) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        body: JSON.stringify({
          name: userName,
          about: userJob
        }),
        method: 'PATCH',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //загрузка начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        method: 'GET',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //загрузка новых карточек
  createNewCards(name, link) {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        }),
        method: 'POST',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //постановка лайка
  makeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: 'PUT',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //удаление лайка
  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //удаление карточки
  deleteCardItem(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }
}