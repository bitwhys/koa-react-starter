const keys = {
  USER: 'user',
};

export function setUser(user) {
  return window.localStorage.setItem(keys.USER, JSON.stringify(user));
}

export function getUser() {
  const value = window.localStorage.getItem(keys.USER);
  return JSON.parse(value);
}

export function deleteUser() {
  return window.localStorage.deleteItem(keys.USER);
}
