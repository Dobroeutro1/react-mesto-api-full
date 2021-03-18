class Api {
    constructor({baseUrl, authorization}, group) {
        this.baseUrl = baseUrl;
        this.authorization = authorization;
        this.group = group;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/${this.group}/users/me`, {
            headers: {
                authorization: `${this.authorization}`
            }
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/${this.group}/cards`, {
            headers: {
                authorization: `${this.authorization}`
            }
        })
            .then(this._checkResponse)
    }

    changeUserInfo(nameValue, aboutValue) {
        return fetch(`${this.baseUrl}/${this.group}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
            .then(this._checkResponse)
    }

    changeUserAvatar(avatarLink) {
        return fetch(`${this.baseUrl}/${this.group}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then(this._checkResponse)
    }

    addNewCard(item) {
        return fetch(`${this.baseUrl}/${this.group}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/${this.group}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    addLike(card) {
        return fetch(`${this.baseUrl}/${this.group}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    deleteLike(card) {
        return fetch(`${this.baseUrl}/${this.group}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/',
        authorization: '8176c3f4-76a7-481c-9a33-49a36549538f'},
    'cohort-17'
);

export default api;