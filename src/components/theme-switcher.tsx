"use client"

import { useSyncfusionTheme } from "@/hooks/use-syncfusion-theme"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useSyncfusionTheme()

  const currentThemeDisplay = themes.find(theme => theme.value === currentTheme)?.name || "Material"

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">🎨 Theme:</span>
      <Select value={currentTheme} onValueChange={setTheme}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select theme">
            {currentThemeDisplay}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.value} value={theme.value}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}