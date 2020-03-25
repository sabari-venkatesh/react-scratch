const Auth = {
  getAuth() {
    return localStorage.getItem("cognitoUser") ? true : false;
  }
};
export default Auth;
