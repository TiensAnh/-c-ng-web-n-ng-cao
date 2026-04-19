const STORAGE_KEY = 'adn_admin_auth_session';

function canUseStorage() {
  return typeof window !== 'undefined';
}

function parseSession(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!parsedValue?.token || !parsedValue?.admin) {
      return null;
    }

    return parsedValue;
  } catch (error) {
    return null;
  }
}

export function readStoredAdminSession() {
  if (!canUseStorage()) {
    return null;
  }

  return (
    parseSession(window.localStorage.getItem(STORAGE_KEY))
    || parseSession(window.sessionStorage.getItem(STORAGE_KEY))
  );
}

export function persistAdminSession(session, rememberMe = true) {
  if (!canUseStorage()) {
    return;
  }

  const serializedValue = JSON.stringify(session);

  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);

  if (rememberMe) {
    window.localStorage.setItem(STORAGE_KEY, serializedValue);
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEY, serializedValue);
}

export function clearStoredAdminSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}
