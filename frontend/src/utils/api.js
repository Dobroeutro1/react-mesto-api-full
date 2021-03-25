class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {},
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {},
    }).then(this._checkResponse);
  }

  changeUserInfo(nameValue, aboutValue) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue,
      }),
    }).then(this._checkResponse);
  }

  changeUserAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(item) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.authorization}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  addLike(card) {
    return fetch(`${this.baseUrl}/cards/likes/${card._id}`, {
      method: "PUT",
      headers: {
        authorization: `${this.authorization}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  deleteLike(card) {
    return fetch(`${this.baseUrl}/cards/likes/${card._id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.authorization}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://dobroeutro.mesto.nomoredomains.icu/api",
});

export default api;
