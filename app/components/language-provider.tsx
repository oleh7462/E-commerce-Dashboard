"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es" | "fr" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    revenue: "Revenue",
    users: "Users",
    conversion: "Conversion Rate",
    orders: "Orders",
    export: "Export",
    search: "Search analytics...",
    live: "Live",
    paused: "Paused",
    lastUpdated: "Last updated",
    overview: "Overview",
    realtime: "Real-time",
    comparison: "Comparison",
    products: "Products",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    personalInfo: "Personal Information",
    recentActivity: "Recent Activity",
    achievements: "Achievements",
    notifications: "Notifications",
    security: "Security",
    privacy: "Privacy",
    api: "API",
    appearance: "Appearance",
    theme: "Theme",
    language: "Language",
    timezone: "Timezone",
    light: "Light",
    dark: "Dark",
    auto: "Auto",
    english: "English",
    spanish: "Spanish",
    french: "French",
    german: "German",
  },
  es: {
    dashboard: "Panel de Control",
    profile: "Perfil",
    settings: "Configuración",
    revenue: "Ingresos",
    users: "Usuarios",
    conversion: "Tasa de Conversión",
    orders: "Pedidos",
    export: "Exportar",
    search: "Buscar análisis...",
    live: "En Vivo",
    paused: "Pausado",
    lastUpdated: "Última actualización",
    overview: "Resumen",
    realtime: "Tiempo Real",
    comparison: "Comparación",
    products: "Productos",
    editProfile: "Editar Perfil",
    saveChanges: "Guardar Cambios",
    cancel: "Cancelar",
    personalInfo: "Información Personal",
    recentActivity: "Actividad Reciente",
    achievements: "Logros",
    notifications: "Notificaciones",
    security: "Seguridad",
    privacy: "Privacidad",
    api: "API",
    appearance: "Apariencia",
    theme: "Tema",
    language: "Idioma",
    timezone: "Zona Horaria",
    light: "Claro",
    dark: "Oscuro",
    auto: "Automático",
    english: "Inglés",
    spanish: "Español",
    french: "Francés",
    german: "Alemán",
  },
  fr: {
    dashboard: "Tableau de Bord",
    profile: "Profil",
    settings: "Paramètres",
    revenue: "Revenus",
    users: "Utilisateurs",
    conversion: "Taux de Conversion",
    orders: "Commandes",
    export: "Exporter",
    search: "Rechercher des analyses...",
    live: "En Direct",
    paused: "En Pause",
    lastUpdated: "Dernière mise à jour",
    overview: "Aperçu",
    realtime: "Temps Réel",
    comparison: "Comparaison",
    products: "Produits",
    editProfile: "Modifier le Profil",
    saveChanges: "Sauvegarder",
    cancel: "Annuler",
    personalInfo: "Informations Personnelles",
    recentActivity: "Activité Récente",
    achievements: "Réalisations",
    notifications: "Notifications",
    security: "Sécurité",
    privacy: "Confidentialité",
    api: "API",
    appearance: "Apparence",
    theme: "Thème",
    language: "Langue",
    timezone: "Fuseau Horaire",
    light: "Clair",
    dark: "Sombre",
    auto: "Automatique",
    english: "Anglais",
    spanish: "Espagnol",
    french: "Français",
    german: "Allemand",
  },
  de: {
    dashboard: "Dashboard",
    profile: "Profil",
    settings: "Einstellungen",
    revenue: "Umsatz",
    users: "Benutzer",
    conversion: "Konversionsrate",
    orders: "Bestellungen",
    export: "Exportieren",
    search: "Analysen suchen...",
    live: "Live",
    paused: "Pausiert",
    lastUpdated: "Zuletzt aktualisiert",
    overview: "Übersicht",
    realtime: "Echtzeit",
    comparison: "Vergleich",
    products: "Produkte",
    editProfile: "Profil Bearbeiten",
    saveChanges: "Änderungen Speichern",
    cancel: "Abbrechen",
    personalInfo: "Persönliche Informationen",
    recentActivity: "Letzte Aktivität",
    achievements: "Erfolge",
    notifications: "Benachrichtigungen",
    security: "Sicherheit",
    privacy: "Datenschutz",
    api: "API",
    appearance: "Erscheinungsbild",
    theme: "Design",
    language: "Sprache",
    timezone: "Zeitzone",
    light: "Hell",
    dark: "Dunkel",
    auto: "Automatisch",
    english: "Englisch",
    spanish: "Spanisch",
    french: "Französisch",
    german: "Deutsch",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
