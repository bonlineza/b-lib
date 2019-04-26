export default function getToken(withBearer = false) {
  if (typeof window === 'undefined') return null;

  const token = window.localStorage.getItem('_tk');
  if (token === null) return null;

  return withBearer ? token : token.substr(7);
}
