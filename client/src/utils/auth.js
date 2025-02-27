class Auth {
    login(token) {
      localStorage.setItem('id_token', token);
      window.location.assign('/dashboard'); // Redirect after login
    }
  
    logout() {
      localStorage.removeItem('id_token');
      window.location.assign('/'); // Redirect to login page
    }
  
    getToken() {
      return localStorage.getItem('id_token');
    }
  
    loggedIn() {
      const token = this.getToken();
      return token ? true : false;
    }
  }
  
  export default new Auth();
  