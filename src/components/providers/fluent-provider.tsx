"use client"

import { FluentProvider, webLightTheme } from "@fluentui/react-components"

interface FluentUIProviderProps {
  children: React.ReactNode
}

export function FluentUIProvider({ children }: FluentUIProviderProps) {
  return (
    <FluentProvider theme={webLightTheme}>
      {children}
    </FluentProvider>
  )
}