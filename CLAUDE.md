# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TechStudio BD is an e-commerce platform built with Next.js 15, specializing in electronics and tech gadgets in Bangladesh. The application uses the App Router and is structured as a modern React TypeScript application with server-side rendering capabilities.

## Development Commands

### Core Commands

- `pnpm dev` or `bun dev` - Start development server at http://localhost:3000
- `pnpm build` - Build the production application
- `npm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm format` - Check code formatting with Prettier
- `pnpm format:fix` - Auto-fix formatting issues with Prettier

### Package Manager

This project uses pnpm as the primary package manager (pnpm@9.9.0). Use pnpm commands for dependency management.

## Architecture & Structure

### App Router Structure

The application uses Next.js 15 App Router with route groups:

- `(auth)` - Authentication pages (login, signup, forgot-password, account-verification)
- `(open-pages)` - Public pages (product details, categories, brands, policies, etc.)
- `(user)` - Protected user pages (profile, orders, settings, wishlist)

### Key Directories

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components organized by feature
- `src/lib/` - Utility functions, types, schemas, and configuration
- `src/context/` - React Context providers (CartProvider, CartSheetProvider)
- `src/services/` - Authentication configuration and services

### Component Architecture

- **shadcn/ui Integration**: Uses shadcn/ui components in `src/components/ui/`
- **Feature-based Components**: Components organized by functionality (filter, banner, common, etc.)
- **Layout Components**: Header, Footer, TopBar, BottomNavigation for consistent layout

### State Management

- **React Context**: Uses Context API for cart management and cart sheet state
- **Cart System**: Complex cart with variant support (color, pricing) and GTM tracking
- **Authentication**: NextAuth v5 (beta) with middleware protection for user routes

### Styling & UI

- **Tailwind CSS**: Primary styling framework with custom configuration
- **shadcn/ui**: Component library with Radix UI primitives
- **CSS Variables**: Uses CSS variables for theming
- **Responsive Design**: Mobile-first approach with dedicated mobile components

### Data Types

Key TypeScript interfaces:

- `Product`: Main product type with variants, pricing, specs, and media
- `Variant`: Product color variants with individual pricing and inventory
- `CartItem`: Product with quantity and selected variant for cart operations

### Authentication & Middleware

- NextAuth v5 configuration in `src/services/auth.config.ts`
- Middleware protection for `/user/*` and `/wishlist/*` routes
- Custom auth types definition in `src/services/next-auth.d.ts`

### Third-party Integrations

- Google Tag Manager for analytics
- Vercel Speed Insights
- Resend for email services
- WhatsApp floating button integration

## Development Guidelines

### Path Aliases

- `@/*` maps to `src/*`
- `@/components` for component imports
- `@/lib` for utilities and types
- `@/context` for context providers

### Component Conventions

- Use TypeScript for all components
- Follow shadcn/ui patterns for UI components
- Implement proper loading states with dedicated loader components
- Use Zod schemas for form validation (imported from `@/lib/schemas`)

### Cart Implementation

The cart system supports:

- Product variants with different colors and pricing
- Quantity management per variant
- GTM tracking for e-commerce events
- Persistent cart state using React Context

### Route Protection

User-specific routes are protected by NextAuth middleware. Protected routes include all paths under `/user/` and `/wishlist/`.
