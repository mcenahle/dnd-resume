import { NAME_LANGUAGE } from '@/consts/storage.ts'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import type { TranslationKeys } from './en-US'
import { en } from './en-US.ts'
import { zh } from './zh-CN.ts'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
    },
    lng: (function () {
      const storageValue = localStorage.getItem(NAME_LANGUAGE)
      if (storageValue === 'en' || storageValue === 'zh') return storageValue
      return navigator.language?.startsWith('zh-') ? 'zh' : 'en'
    })(),
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    adaptLanguage(i18n.language)
  })

export default i18n

export function setLanguage(lang: 'en' | 'zh') {
  i18n.changeLanguage(lang).then(() => {})
  adaptLanguage(lang)
  localStorage.setItem(NAME_LANGUAGE, lang)
}

export function isChineseLanguage() {
  return i18n.language === 'zh'
}

export const t = (key: TranslationKeys) => i18n.t(key)

export const useT = () => {
  const { t: originalT } = useTranslation()

  const t = (key: TranslationKeys): string => originalT(key)

  return { t }
}

function adaptLanguage(lang: string) {
  if (lang === 'zh') {
    document.documentElement.lang = 'zh-CN'
    document.title = '在线简历生成工具'
  } else {
    document.documentElement.lang = 'en-US'
    document.title = 'Resume Builder'
  }
}
