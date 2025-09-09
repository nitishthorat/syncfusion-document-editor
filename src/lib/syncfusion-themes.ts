export interface SyncfusionTheme {
  name: string
  value: string
  cssPath: string
}

export const syncfusionThemes: SyncfusionTheme[] = [
  {
    name: "Material",
    value: "material",
    cssPath: "material.css"
  },
  {
    name: "Material Dark",
    value: "material-dark",
    cssPath: "material-dark.css"
  },
  {
    name: "Material 3",
    value: "material3",
    cssPath: "material3.css"
  },
  {
    name: "Material 3 Dark",
    value: "material3-dark",
    cssPath: "material3-dark.css"
  },
  {
    name: "Bootstrap 5",
    value: "bootstrap5",
    cssPath: "bootstrap5.css"
  },
  {
    name: "Bootstrap 5 Dark",
    value: "bootstrap5-dark",
    cssPath: "bootstrap5-dark.css"
  },
  {
    name: "Fluent",
    value: "fluent",
    cssPath: "fluent.css"
  },
  {
    name: "Fluent Dark",
    value: "fluent-dark",
    cssPath: "fluent-dark.css"
  },
  {
    name: "Fluent 2",
    value: "fluent2",
    cssPath: "fluent2.css"
  },
  {
    name: "Fluent 2 Dark",
    value: "fluent2-dark",
    cssPath: "fluent2-dark.css"
  },
  {
    name: "Tailwind CSS",
    value: "tailwind",
    cssPath: "tailwind.css"
  },
  {
    name: "Tailwind Dark",
    value: "tailwind-dark",
    cssPath: "tailwind-dark.css"
  },
  {
    name: "Bootstrap 4",
    value: "bootstrap4",
    cssPath: "bootstrap4.css"
  },
  {
    name: "High Contrast",
    value: "highcontrast",
    cssPath: "highcontrast.css"
  }
]

export function loadSyncfusionTheme(theme: string): void {
  // Remove existing Syncfusion theme stylesheets
  const existingLinks = document.querySelectorAll('link[data-syncfusion-theme]')
  existingLinks.forEach(link => link.remove())

  // Find the theme configuration
  const themeConfig = syncfusionThemes.find(t => t.value === theme)
  if (!themeConfig) {
    console.warn(`Theme ${theme} not found`)
    return
  }

  // Create new stylesheet links for all Syncfusion components
  const components = [
    'ej2-base',
    'ej2-buttons', 
    'ej2-popups',
    'ej2-inputs',
    'ej2-documenteditor'
  ]

  components.forEach(component => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://cdn.syncfusion.com/ej2/23.2.4/${component}/styles/${themeConfig.cssPath}`
    link.setAttribute('data-syncfusion-theme', theme)
    link.setAttribute('data-component', component)
    document.head.appendChild(link)
  })
}