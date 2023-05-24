class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getInitialUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  postInitialUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkStatus(res));
  }

  postInitialUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkStatus(res));
  }

  postInitialCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  cardDelete(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  changeLikeCardStatus(cardId, isLiked){
    if(!isLiked){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._checkStatus(res));
    }else{
      return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._checkStatus(res));
    }
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "48d89f1d-6744-44c2-a9bf-a035b070ab5d",
    "Content-Type": "application/json",
  },
});

export default api;
