import { createContext, useContext, useState } from 'react'
import { translations } from './i18n'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useT() {
  return useContext(LangContext).t
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  return [lang, setLang]
}
