"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { loadSyncfusionTheme, syncfusionThemes } from '@/lib/syncfusion-themes'

interface SyncfusionThemeContextType {
  currentTheme: string
  setTheme: (theme: string) => void
  themes: typeof syncfusionThemes
}

const SyncfusionThemeContext = createContext<SyncfusionThemeContextType | undefined>(undefined)

export function useSyncfusionTheme() {
  const context = useContext(SyncfusionThemeContext)
  if (context === undefined) {
    throw new Error('useSyncfusionTheme must be used within a SyncfusionThemeProvider')
  }
  return context
}

export { SyncfusionThemeContext }