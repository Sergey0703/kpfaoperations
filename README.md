# KPFA Operations - Buildings Management

SharePoint Framework (SPFX) application for managing KPFA buildings and related documents.

## Summary

Comprehensive management system for KPFA operations including buildings, documents (contracts, invoices, photos, reports), repairs, and modernization tracking. Built with modern React patterns and designed for future Azure Database migration.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.0-green.svg)

## Technology Stack

- **Framework:** SharePoint Framework 1.21.0
- **UI Library:** Fluent UI React 8
- **Language:** TypeScript 5.3.3
- **State Management:** React Context API
- **Data Access:** PnP/SP 3.19.0
- **Backend (Current):** SharePoint Lists + Document Library
- **Backend (Planned):** Azure Database

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- SharePoint Online

## Prerequisites

- Node.js 18.17.1+ or 22.14.0+
- SharePoint Online tenant with permissions to create lists
- Yeoman + SPFX generator

## Solution

| Solution         | Author(s) |
| ---------------- | --------- |
| kpfaoperations   | KPFA Team |

## Version history

| Version | Date           | Comments                                    |
| ------- | -------------- | ------------------------------------------- |
| 0.0.1   | Nov 28, 2025   | Initial project setup and structure created |

---

## Installation & Development

```bash
# Install dependencies
npm install

# Build project
gulp build

# Start local workbench
gulp serve

# Bundle for production
gulp bundle --ship

# Package solution
gulp package-solution --ship
```

## Project Structure

```
src/webparts/operationsManagement/
├── components/           # React components
│   ├── BuildingsGallery/ # Left panel - buildings list
│   ├── BuildingDetails/  # Main panel - building info
│   ├── Dialogs/          # Modal dialogs (Add/Edit/Delete/Upload)
│   └── Context/          # State management (React Context)
├── models/               # TypeScript interfaces
├── services/             # Data access layer (abstracted for Azure migration)
└── utils/                # Utility functions (Logger, Validators, Formatters)
```

## SharePoint Backend Configuration

### Buildings List
Create a Custom List named "Buildings" with these columns:
- **Property Name** (Title) - Single line of text
- **Address** - Multiple lines of text
- **Year Built** - Number (Min: 1800, Max: 2100)
- **Area/Square Footage** - Number (Decimals: 2)
- **Deleted** - Yes/No (for soft delete)

### KPFA_Documents Library
Create a Document Library named "KPFA_Documents" with these columns:
- **Building** - Lookup to Buildings list (Title field)
- **Document Type** - Choice (Contract, Invoice, Photo, Report, Other)
- **Document Date** - Date and Time (date only)
- **Description** - Multiple lines of text
- **Status** - Choice (Active, Archived, Deleted)

## Features

### Current Implementation (Phase 1)
- ✅ SPFX project initialized with React + TypeScript
- ✅ Folder structure created
- ✅ Dependencies installed (PnP/SP, Fluent UI React)
- ✅ .gitignore configured
- 🔄 Models & Services layer (in progress)
- ⏳ React Context for state management
- ⏳ UI Components

### Planned Features
- Buildings CRUD operations (Create, Read, Update, Delete with soft delete)
- Document upload/download with metadata
- Search and filter buildings
- Responsive design for desktop/tablet
- Azure Database migration
- AI document processing integration
- Vehicles operations module

## Architecture Highlights

### Service Layer Abstraction
Clean architecture with `IDataService` interface enables seamless migration:

```typescript
IDataService (interface)
├── SharePointService  (current implementation)
└── AzureDatabaseService (future - zero component changes needed)
```

### State Management Pattern
Centralized state using React Context API:
- Buildings list and filtered results
- Selected building and its documents
- UI states (loading, errors, dialog visibility)
- Search query and filters

### Component Design
- Modular components with separate `.tsx` and `.module.scss` files
- TypeScript interfaces for type safety
- Fluent UI React components for consistent Microsoft 365 UX
- Error boundaries for graceful error handling

## Development Guidelines

- **TypeScript:** Strict mode enabled
- **Styling:** Fluent UI components + SCSS modules
- **Error Handling:** Try/catch blocks with user-friendly messages
- **Validation:** Client-side validation before API calls
- **Logging:** Centralized Logger utility for debugging

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## References

- [SharePoint Framework Overview](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Fluent UI React](https://developer.microsoft.com/en-us/fluentui#/controls/web)
- [PnPjs Documentation](https://pnp.github.io/pnpjs/)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
