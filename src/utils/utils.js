import jwtDecode from 'jwt-decode';

export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

export const ID_TOKEN = 'id_token';

export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN);
}

export function decodeUserProfile(idToken) {
  try {
    return jwtDecode(idToken);
  } catch (err) {
    return null;
  }
}
