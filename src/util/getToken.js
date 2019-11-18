/**
 * Returns the JWT token this is stored in localStorage under key '_tk'
 * @param {boolean} withBearer should be set to TRUE if the 'Bearer' part of the token string is required
 * @param {string} key the localStorage key to get stored token from
 */
export default function getTokenFromStorage(withBearer = false, key = '_tk') {
  if (typeof window === 'undefined') return null;

  const token = window.localStorage.getItem(key);
  if (token === null) return null;

  return withBearer ? token : token.substr(7);
}
