"use client"

import { useRef, useEffect } from "react"
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Ribbon,
  Inject,
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog
} from "@syncfusion/ej2-react-documenteditor"
import { registerLicense } from "@syncfusion/ej2-base"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button as FluentButton } from "@fluentui/react-components"
import { ThemeSwitcher } from "@/components/theme-switcher"

// Register Syncfusion services
DocumentEditorContainerComponent.Inject(
  Toolbar, 
  Ribbon,
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog
)

interface DocumentEditorProps {
  height?: string
  serviceUrl?: string
}

export default function DocumentEditor({ 
  height = "590px",
  serviceUrl = "https://services.syncfusion.com/react/production/api/documenteditor/"
}: DocumentEditorProps) {
  const containerRef = useRef<DocumentEditorContainerComponent | null>(null)

  // Complete toolbar items configuration with better organization
  const toolbarItems = [
    // File operations
    'New', 'Open', 'Separator',
    
    // Edit operations
    'Undo', 'Redo', 'Separator',
    'LocalClipboard', 'Separator',
    
    // Insert content
    'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator',
    
    // Page layout
    'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator',
    
    // Tools
    'Find', 'Separator',
    
    // Collaboration
    'Comments', 'TrackChanges', 'Separator',
    
    // Document control
    'RestrictEditing', 'FormFields', 'UpdateFields', 'ContentControl'
  ]


  useEffect(() => {
    // Register Syncfusion license if available
    const key = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY
    if (key && key.trim().length > 0) {
      registerLicense(key)
    } else {
      console.warn("Syncfusion license key is missing. Components will run in trial mode.")
    }

    // Add keyboard shortcuts
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault()
            createNewDocument()
            break
          case 'o':
            e.preventDefault()
            document.getElementById('file-input')?.click()
            break
          case 's':
            e.preventDefault()
            saveDocx()
            break
          case '=':
          case '+':
            e.preventDefault()
            zoomIn()
            break
          case '-':
            e.preventDefault()
            zoomOut()
            break
          case '0':
            e.preventDefault()
            resetZoom()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyboardShortcuts)
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts)
    }
  }, []) // We'll handle the dependencies with the functions themselves

  // Toolbar management utilities
  const enableToolbarItem = (itemId: string, enabled: boolean = true) => {
    const container = containerRef.current
    if (container && container.toolbar) {
      // Enable/disable toolbar items
      console.log(`${enabled ? 'Enabling' : 'Disabling'} toolbar item: ${itemId}`)
    }
  }

  const openLocal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = "" // reset picker so the same file can be reselected
    if (!file || !containerRef.current) return

    const editor = containerRef.current.documentEditor
    const name = file.name.toLowerCase()

    try {
      if (name.endsWith(".sfdt")) {
        // SFDT opens client-side with no server
        const text = await file.text()
        editor.open(text)
        console.log(`Opened SFDT file: ${file.name}`)
      } else if (name.endsWith(".docx") || name.endsWith(".doc") || name.endsWith(".rtf") || name.endsWith(".txt")) {
        // DOCX/RTF/TXT need the server for conversion → requires serviceUrl on the container
        await editor.openAsync(file)
        console.log(`Opened ${name.split('.').pop()?.toUpperCase()} file: ${file.name}`)
      } else {
        alert(`Unsupported file format: ${name.split('.').pop()}\nSupported formats: DOCX, DOC, RTF, TXT, SFDT`)
      }
    } catch (error) {
      console.error('Error opening file:', error)
      alert('Error opening file. Please check the file format and try again.')
    }
  }

  const saveDocx = async () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    try {
      // Triggers server-side export via serviceUrl
      await editor.save("document", "Docx")
      console.log("Document saved as DOCX successfully")
    } catch (error) {
      console.error('Error saving DOCX:', error)
      alert('Error saving document as DOCX. Please check your internet connection and try again.')
    }
  }

  const saveSfdt = async () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    try {
      const blob = await editor.saveAsBlob("Sfdt")
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `document_${new Date().toISOString().split('T')[0]}.sfdt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      console.log("Document saved as SFDT successfully")
    } catch (error) {
      console.error('Error saving SFDT:', error)
      alert('Error saving document as SFDT. Please try again.')
    }
  }

  const createNewDocument = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    if (confirm('Are you sure you want to create a new document? Any unsaved changes will be lost.')) {
      editor.openBlank()
      console.log("New document created")
    }
  }

  const onToolbarClick = (args: any) => {
    switch (args.item.id) {
      case 'save-docx':
        saveDocx()
        break
      case 'print':
        printDocument()
        break
      default:
        break
    }
  }

  const printDocument = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    editor.print()
  }

  const exportPdf = async () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    // Export as PDF via server - using string instead of enum for compatibility
    await editor.save('document', 'Pdf' as any)
  }

  const showWordCount = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    // Get document statistics
    const stats = editor.documentHelper?.pages?.length || 0
    const selection = editor.selection
    let text = ''
    
    // Get the full document text for complete statistics
    try {
      const documentSfdt = editor.serialize()
      const doc = JSON.parse(documentSfdt)
      // This is a simplified approach - in production you'd want more sophisticated text extraction
      text = JSON.stringify(doc).replace(/[{}"[\]:,]/g, ' ')
    } catch (error) {
      console.error('Error extracting document text:', error)
      text = selection?.text || ''
    }
    
    // Calculate statistics
    const wordCount = text ? text.split(/\s+/).filter(word => word.length > 0).length : 0
    const charCount = text ? text.length : 0
    const charCountNoSpaces = text ? text.replace(/\s/g, '').length : 0
    
    alert(`Document Statistics:
📄 Pages: ${stats}
📝 Words: ${wordCount}
🔤 Characters (with spaces): ${charCount}
🔤 Characters (no spaces): ${charCountNoSpaces}`)
  }

  // Additional utility methods
  const insertDateTime = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    const now = new Date()
    const dateTimeString = now.toLocaleString()
    editor.editor.insertText(dateTimeString)
    console.log("Date and time inserted")
  }

  const zoomIn = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    const currentZoom = editor.zoomFactor
    const newZoom = Math.min(currentZoom + 0.1, 5) // Max 500% zoom
    editor.zoomFactor = newZoom
    console.log(`Zoom: ${Math.round(newZoom * 100)}%`)
  }

  const zoomOut = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    const currentZoom = editor.zoomFactor
    const newZoom = Math.max(currentZoom - 0.1, 0.1) // Min 10% zoom
    editor.zoomFactor = newZoom
    console.log(`Zoom: ${Math.round(newZoom * 100)}%`)
  }

  const resetZoom = () => {
    const editor = containerRef.current?.documentEditor
    if (!editor) return
    
    editor.zoomFactor = 1.0
    console.log("Zoom reset to 100%")
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📄 Document Editor
          </CardTitle>
          <ThemeSwitcher />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {/* File Operations */}
          <div className="flex gap-2 border-r pr-2">
            <Button onClick={createNewDocument} variant="outline" size="sm">
              📄 New Document
            </Button>
            
            <Button 
              onClick={() => document.getElementById('file-input')?.click()}
              variant="outline"
              size="sm"
            >
              📂 Open File
            </Button>
            
            <Button onClick={saveDocx} variant="default" size="sm">
              💾 Save DOCX
            </Button>
          </div>

          {/* Export Options */}
          <div className="flex gap-2 border-r pr-2">
            <Button onClick={saveSfdt} variant="secondary" size="sm">
              📥 Save SFDT
            </Button>

            <Button onClick={exportPdf} variant="secondary" size="sm">
              📑 Export PDF
            </Button>
            
            <Button onClick={printDocument} variant="outline" size="sm">
              🖨️ Print
            </Button>
          </div>

          {/* Tools */}
          <div className="flex gap-2 border-r pr-2">
            <Button onClick={showWordCount} variant="ghost" size="sm">
              📊 Stats
            </Button>

            <Button onClick={insertDateTime} variant="ghost" size="sm">
              📅 Date/Time
            </Button>

            {/* Fluent UI button for additional tools */}
            <FluentButton 
              appearance="secondary"
              size="small"
              onClick={() => enableToolbarItem('Comments', true)}
            >
              💬 Comments
            </FluentButton>
          </div>

          {/* Zoom Controls */}
          <div className="flex gap-2 border-r pr-2">
            <Button onClick={zoomOut} variant="outline" size="sm">
              🔍➖
            </Button>

            <Button onClick={resetZoom} variant="outline" size="sm">
              🔍💯
            </Button>

            <Button onClick={zoomIn} variant="outline" size="sm">
              🔍➕
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <FluentButton 
              appearance="primary"
              size="small"
              onClick={saveDocx}
            >
              ⚡ Quick Save
            </FluentButton>
          </div>
        </div>

        <input
          id="file-input"
          type="file"
          accept=".docx,.doc,.rtf,.txt,.sfdt"
          onChange={openLocal}
          style={{ display: "none" }}
          aria-label="Upload document file"
        />

        <div className="border rounded-lg">
          <DocumentEditorContainerComponent
            id="doc-editor"
            ref={containerRef}
            height={height}
            enableToolbar={true}
            showPropertiesPane={true}
            serviceUrl={serviceUrl}
            style={{ width: '100%' }}
            toolbarItems={toolbarItems as any}
            toolbarClick={onToolbarClick}
          >
            <Inject services={[
              Toolbar, 
              Ribbon,
              Print,
              SfdtExport,
              WordExport,
              TextExport,
              Selection,
              Search,
              Editor,
              ImageResizer,
              EditorHistory,
              ContextMenu,
              OptionsPane,
              HyperlinkDialog,
              TableDialog,
              BookmarkDialog,
              TableOfContentsDialog,
              PageSetupDialog,
              StyleDialog,
              ListDialog,
              ParagraphDialog,
              BulletsAndNumberingDialog,
              FontDialog,
              TablePropertiesDialog,
              BordersAndShadingDialog,
              TableOptionsDialog,
              CellOptionsDialog,
              StylesDialog
            ]} />
          </DocumentEditorContainerComponent>
        </div>
      </CardContent>
    </Card>
  )
}