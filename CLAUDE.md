# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application that implements a document editor using Syncfusion's DocumentEditor component, enhanced with modern UI libraries including Tailwind CSS, shadcn/ui, and Fluent UI. The application allows users to create, edit, and save documents in various formats (DOCX, SFDT, RTF, TXT).

## Development Commands

- `npm run dev` - Start Next.js development server on http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

## Architecture

### Next.js App Router Structure
- **src/app/layout.tsx**: Root layout with providers
- **src/app/page.tsx**: Main page with DocumentEditor component
- **src/app/globals.css**: Global styles including Tailwind and Syncfusion CSS

### Core Components
- **DocumentEditor** (`src/components/document-editor/document-editor.tsx`): Comprehensive document editing component with full toolbar
- **ThemeSwitcher** (`src/components/theme-switcher.tsx`): Dynamic Syncfusion theme selection component
- **FluentUIProvider** (`src/components/providers/fluent-provider.tsx`): Fluent UI theme provider
- **SyncfusionThemeProvider** (`src/components/providers/syncfusion-theme-provider.tsx`): Syncfusion theme management provider

### UI Libraries Integration
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Accessible components built on Radix UI (Button, Card components)
- **Fluent UI**: Microsoft's design system components integrated alongside shadcn/ui
- **Syncfusion**: Document editing capabilities with Material theme

### Key Dependencies
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **@syncfusion/ej2-react-documenteditor**: Primary document editing component
- **@fluentui/react-components**: Microsoft Fluent UI components
- **TypeScript 5.7**: Strict mode enabled

### Document Handling
The application supports multiple document formats:
- **SFDT**: Syncfusion Document Format - opens client-side without server
- **DOCX/RTF/TXT**: Requires server-side conversion via `serviceUrl`

### Service Integration
- Uses Syncfusion's demo service URL for development: `https://services.syncfusion.com/react/production/api/documenteditor/`
- For production, host your own service endpoint

## Configuration

### Environment Variables
- `NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY`: Syncfusion license key (see `.env.example`)
- `NEXT_PUBLIC_DOCUMENT_SERVICE_URL`: Custom document service URL (optional)

⚠️ **Security Note**: 
- Never commit real API keys or license keys to version control
- Create `.env.local` file for local development (already in .gitignore)
- Get your free Syncfusion license at: https://www.syncfusion.com/products/communitylicense
- The `.env.example` file should only contain placeholder values

### Component Usage Patterns
- Use dynamic imports for Syncfusion components to avoid SSR issues
- Combine shadcn/ui and Fluent UI components as needed
- Apply Tailwind classes for layout and styling
- Use "use client" directive for interactive components

### Theme Management
- **Dynamic Theme Loading**: Syncfusion themes are loaded dynamically via CDN
- **Available Themes**: Material, Material Dark, Bootstrap 5, Fluent, Tailwind, and more
- **Theme Persistence**: Selected theme is saved in localStorage
- **Theme Switching**: Use ThemeSwitcher component or useSyncfusionTheme hook

### Toolbar Features
- **Complete Toolbar**: All standard DocumentEditor toolbar items enabled
- **Custom Toolbar Items**: Additional buttons for PDF export, word count, spell check
- **Toolbar Management**: Enable/disable and show/hide toolbar items dynamically
- **Organized Layout**: Toolbar items grouped by functionality with separators
- **External Controls**: Additional shadcn/ui and Fluent UI buttons for quick actions
- **Services Integration**: All DocumentEditor services injected for full functionality

### TypeScript Configuration
- Modern bundler module resolution
- Path mapping configured for `@/*` imports
- Strict mode enabled with Next.js optimizations