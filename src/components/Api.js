export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Информация о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        method: 'GET',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось загрузить информацию о пользователе')
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось загрузить аватар')
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось обновить информацию о пользователе')
      })
  }

  //загрузка начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        method: 'GET',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось загрузить фотографии')
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось загрузить новые карточки')
      })
  }

  //постановка лайка
  makeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: 'PUT',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось поставить лайк')
      })
  }

  //удаление лайка
  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось удалить лайк')
      })
  }

  //удаление карточки
  deleteCardItem(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log('Не удалось удалить карточку')
      })
  }
}