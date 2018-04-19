//Got this from Ryan's solution: https://git.generalassemb.ly/wdi-nyc-ewok/HW_U03_D08_Wine-App_SOLUTION/commit/749f786e49530c2b25c8fd0cc3ad94c80daef860

export default {

  test() {
    console.log('token service says hello!');
  },

  save(token) {
    window.localStorage.setItem('authToken', token); // store token in localStorage under the 'authToken' key
  },

  read() {
    return window.localStorage.getItem('authToken') || ''; // fetch the token out of localStorage
  },

  destroy() {
    window.localStorage.removeItem('authToken'); // delete the token
  },

};
