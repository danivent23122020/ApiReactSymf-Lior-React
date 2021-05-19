import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

// Déconnexion (suppression du token du localstorage et sur Axios)
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stokage du token dans le storage et sur Axios
 * @param {object} credentials
 */
function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then(response => response.data.token)
    .then(token => {
      // je stocke le token dans mon localstorage
      window.localStorage.setItem("authToken", token);
      /* on prévient axios que l'on a maintenant un header par défaut sur toutes nos
            futurs requêtes HTTP */
      setAxiostoken(token);

      return true;
    });
}

/**
 * Positionne le token JWT sur Axios
 * @param {string} token Le token JWT
 */
function setAxiostoken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
  // 1 voir si on a un token
  const token = window.localStorage.getItem("authToken");
  // 2 si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiostoken(token);
    }
  }
}

/**
 * Permet de savoir si l'on est identifié ou pas
 * @returns boolean
 */
function isAuthenticated() {
  // 1 voir si on a un token
  const token = window.localStorage.getItem("authToken");
  // 2 si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
};
