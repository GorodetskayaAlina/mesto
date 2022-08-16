export class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
      this._userName = document.querySelector(userNameSelector);
      this._userJob = document.querySelector(userJobSelector);
    }
  
    getUserInfo() {    
      return {
        name: this._userName.textContent,
        job: this._userJob.textContent
      };
    }
  
    setUserInfo(username, userjob) {
      this._userName.textContent = username;
      this._userJob.textContent = userjob;
    }
  }