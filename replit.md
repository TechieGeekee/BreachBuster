# Overview

This is a full-stack web application built with React on the frontend and Express.js on the backend. The project uses modern web technologies including TypeScript, Tailwind CSS, and shadcn/ui components for a polished user interface. The application is configured to use PostgreSQL as the database with Drizzle ORM for database operations, though currently uses an in-memory storage implementation for development.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React and TypeScript, utilizing a component-based architecture with the following key decisions:

- **UI Framework**: shadcn/ui components based on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark modes)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management with custom query client configuration
- **Build Tool**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript coverage with strict compiler options

## Backend Architecture
The backend follows a RESTful API design pattern with Express.js:

- **Framework**: Express.js with TypeScript for type-safe server development
- **API Structure**: Routes prefixed with `/api` for clear separation from static assets
- **Middleware**: Custom logging middleware for API request tracking
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Hot-reloading with tsx and custom Vite integration for seamless full-stack development

## Data Storage Solutions
The application is designed with a flexible storage architecture:

- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts` for consistent types across frontend and backend
- **Current Implementation**: In-memory storage (`MemStorage`) for development with the same interface as the database implementation
- **Migration Strategy**: Drizzle Kit configured for database schema migrations

## Authentication and Authorization
Basic user management structure is in place:

- **User Schema**: Username/password based authentication schema defined
- **Storage Interface**: Abstract storage interface (`IStorage`) allows for easy swapping between in-memory and database implementations
- **Validation**: Zod schemas for runtime type validation of user inputs

## Project Structure Decisions
The project uses a monorepo structure with clear separation of concerns:

- **`/client`**: Frontend React application with organized component structure
- **`/server`**: Backend Express.js application with modular route handling
- **`/shared`**: Common schemas and types shared between frontend and backend
- **Path Aliases**: Configured TypeScript path mapping for clean imports (`@/*`, `@shared/*`)

# External Dependencies

## UI and Styling
- **shadcn/ui**: Comprehensive UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS for processing
- **Radix UI**: Accessible component primitives for complex UI interactions
- **class-variance-authority**: Type-safe variant API for component styling
- **Lucide React**: Modern icon library for consistent iconography

## Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect support
- **@neondatabase/serverless**: Serverless PostgreSQL driver (configured but not actively used)
- **Drizzle Kit**: CLI tools for database migrations and schema management

## Development and Build Tools
- **Vite**: Fast build tool and development server with React plugin support
- **TypeScript**: Static type checking with strict configuration
- **ESBuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution engine for development server

## State Management and Data Fetching
- **TanStack Query**: Powerful data synchronization for React applications
- **React Hook Form**: Performant forms with minimal re-renders and validation support
- **Wouter**: Minimalist routing library for React applications

## Utilities and Validation
- **Zod**: TypeScript-first schema validation library
- **date-fns**: Modern JavaScript date utility library
- **clsx/tailwind-merge**: Utility for conditional className construction
- **nanoid**: Secure URL-friendly unique string ID generator