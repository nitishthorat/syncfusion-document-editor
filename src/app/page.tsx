import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dynamically import the DocumentEditor component to avoid SSR issues
const DocumentEditor = dynamic(
  () => import("@/components/document-editor/document-editor"),
  { 
    ssr: false,
    loading: () => (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Document Editor...</CardTitle>
          <CardDescription>Please wait while the editor initializes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            Document Editor
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            A powerful document editing experience built with Syncfusion DocumentEditor, 
            Next.js 15, Tailwind CSS, shadcn/ui components, and Fluent UI integration.
          </p>
        </div>
        
        <DocumentEditor height="600px" />
      </div>
    </main>
  )
}