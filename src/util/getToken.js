/**
 * Returns the JWT token this is stored in localStorage under key '_tk'
 * @param {boolean} withBearer should be set to TRUE if the 'Bearer' part of the token string is required
 * @param {string} key the localStorage key to get stored token from
 * @returns {string} token value
 */
export default function getTokenFromStorage(withBearer = false, key = '_tk') {
  if (typeof window === 'undefined') return null;

  const token = window.localStorage.getItem(key);
  if (typeof token !== 'string') return null;

  if (withBearer) {
    return token;
  }
  return token.substr(7);
}
