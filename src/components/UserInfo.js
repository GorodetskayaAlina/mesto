export class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatar }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(username, userjob, userId, useravatar) {
    this._userName.textContent = username;
    this._userJob.textContent = userjob;
    this._avatar.src = useravatar;
    this._id = userId;
  }

  getUserId() {
    return this._id;
  }

  changeProfileAvatar (link) {
    this._avatar.src = link;
  }
}