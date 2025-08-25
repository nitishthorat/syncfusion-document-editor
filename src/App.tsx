// src/App.tsx
import { useRef } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Ribbon,
  Inject,
} from "@syncfusion/ej2-react-documenteditor";
import "./App.css";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-documenteditor/styles/material.css";

DocumentEditorContainerComponent.Inject(Toolbar, Ribbon);

export default function App() {
  // Demo service URL (OK for development/testing). Host your own for production.
  const serviceUrl =
    "https://services.syncfusion.com/react/production/api/documenteditor/";

  const containerRef = useRef<DocumentEditorContainerComponent | null>(null);

  const openLocal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset picker so the same file can be reselected
    if (!file || !containerRef.current) return;

    const editor = containerRef.current.documentEditor;
    const name = file.name.toLowerCase();

    if (name.endsWith(".sfdt")) {
      // SFDT opens client-side with no server
      const text = await file.text();
      editor.open(text);
      return;
    }

    // DOCX/RTF/TXT need the server for conversion → requires serviceUrl on the container
    await editor.openAsync(file);
  };

  const saveDocx = async () => {
    const editor = containerRef.current?.documentEditor;
    if (!editor) return;
    // Triggers server-side export via serviceUrl
    await editor.save("document", "Docx");
  };

  const saveSfdt = async () => {
    const editor = containerRef.current?.documentEditor;
    if (!editor) return;
    const blob = await editor.saveAsBlob("Sfdt");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.sfdt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 12 }}>
      {/* Built-in Toolbar + Ribbon like before */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <button onClick={saveDocx}>Save as DOCX</button>
      </div>

      <DocumentEditorContainerComponent
        id="doc-editor"
        ref={containerRef}
        height="590px"
        enableToolbar={true} // ← shows the toolbar
        showPropertiesPane={false}
        serviceUrl={serviceUrl} // ← required for DOCX/RTF/TXT import & DOCX/PDF export
      >
        <Inject services={[Toolbar, Ribbon]} />
      </DocumentEditorContainerComponent>
    </div>
  );
}
