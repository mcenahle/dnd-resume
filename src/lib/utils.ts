import { type ClassValue, clsx } from 'clsx'
import pako from 'pako'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export const storage = {
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return ''
    }
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}

export function encodeToBase64Url(inputString: string) {
  const encoder = new TextEncoder()
  const encodedBytes = encoder.encode(inputString)
  const compressedBytes = pako.deflate(encodedBytes)
  const base64String = btoa(String.fromCharCode(...compressedBytes))
  const base64UrlString = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return base64UrlString
}

export function decodeFromBase64Url(base64UrlString: string) {
  let base64String = base64UrlString.replace(/-/g, '+').replace(/_/g, '/')
  const padding = base64String.length % 4
  if (padding) {
    base64String += '='.repeat(4 - padding)
  }

  const compressedBytes = new Uint8Array(
    atob(base64String)
      .split('')
      .map(char => char.charCodeAt(0)),
  )
  const decompressedBytes = pako.inflate(compressedBytes)
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(decompressedBytes)
}
