"use client"

import { ReactNode, useState, useEffect } from 'react'
import { SyncfusionThemeContext } from '@/hooks/use-syncfusion-theme'
import { loadSyncfusionTheme, syncfusionThemes } from '@/lib/syncfusion-themes'

interface SyncfusionThemeProviderProps {
  children: ReactNode
}

export function SyncfusionThemeProvider({ children }: SyncfusionThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState('material')

  const setTheme = (theme: string) => {
    setCurrentTheme(theme)
    loadSyncfusionTheme(theme)
    // Save to localStorage
    localStorage.setItem('syncfusion-theme', theme)
  }

  useEffect(() => {
    // Load theme from localStorage or use default
    const savedTheme = localStorage.getItem('syncfusion-theme') || 'material'
    setCurrentTheme(savedTheme)
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      loadSyncfusionTheme(savedTheme)
    }, 100)
  }, [])

  return (
    <SyncfusionThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes: syncfusionThemes,
      }}
    >
      {children}
    </SyncfusionThemeContext.Provider>
  )
}