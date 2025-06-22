type LocalStorageKey = typeof NAME_LANGUAGE | typeof NAME_WIDGET_DATA
// Store the language of the app
export const NAME_LANGUAGE = 'LANGUAGE'
// Store the json data of the widgets
export const NAME_WIDGET_DATA = 'WIDGET'

type SessionStorageKey = typeof NAME_SHOULD_PRINT
// Decide whether to auto print on the preview page
export const NAME_SHOULD_PRINT = 'SHOULD_PRINT'

export function isLocalStorageAvailable() {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

export function getLocalStorage(key: LocalStorageKey): any {
  try {
    const value = localStorage.getItem(key)
    if (!value) return ''
    return JSON.parse(value)
  } catch (error) {
    return ''
  }
}

export function setLocalStorage(key: LocalStorageKey, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    return false
  }
}

export function removeLocalStorage(key: LocalStorageKey): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

export function getSessionStorage(key: SessionStorageKey): any {
  try {
    const value = sessionStorage.getItem(key)
    if (!value) return ''
    return JSON.parse(value)
  } catch (error) {
    return ''
  }
}

export function setSessionStorage(key: SessionStorageKey, value: any): boolean {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    return false
  }
}

export function removeSessionStorage(key: SessionStorageKey): boolean {
  try {
    sessionStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}
