class Auth {
  static setToken(token) {
    return localStorage.setItem('token', token);
  }

  static setStravaToken(stravaToken) {
    return localStorage.setItem('access_token', stravaToken);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getStravaToken() {
    return localStorage.getItem('access_token');
  }

  static isAuthenticated() {
    const payload = this.getPayload();
    if(!payload) return false;
    const now = (new Date()).getTime() / 1000;
    return payload.exp > now;
  }

  static logout() {
    localStorage.removeItem('token', 'access_token');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }
}

export default Auth;
