# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build (requires build first)
- `pnpm lint` - Run ESLint
- Use Node.js 22.14.0 and pnpm 10.13.1 (see .mise.toml)

## Architecture Overview

This is a Nuxt 4 application that creates a custom frontend for Hatena Bookmark (はてなブックマーク). The app proxies RSS feeds from b.hatena.ne.jp and presents them in a clean interface.

### Key Components

- **API Proxy**: `/api/**` routes proxy to `https://b.hatena.ne.jp/**` for RSS feeds
- **ISR Routes**: `/`, `/hotentry`, `/hotentry/**`, `/entrylist`, and `/entrylist/**` use Incremental Static Regeneration with 600s cache
- **State Management**: Pinia store (`app/stores/common.ts`) manages categories, navigation, and loading states
- **Data Fetching**: `useGetEntry` composable converts RSS XML to JSON and handles API calls
- **Routing**: Dynamic routes `[type]/[category]` handle hotentry/entrylist with category filtering

### Page Structure

- `/` - Homepage (same as `/hotentry`)
- `/hotentry` - Hot entries (all categories)
- `/hotentry/[category]` - Hot entries by category
- `/entrylist` - New entries (all categories)
- `/entrylist/[category]` - New entries by category
- Categories: all, general, social, economics, life, knowledge, it, fun, entertainment, game

### Special Features

- **Keyboard Navigation**: H/N keys switch between hotentry/entrylist, ←/→ navigate categories
- **Global Middleware**: `fetch-page.global.ts` prefetches pages for Vercel caching
- **Dark/Light Theme**: CSS custom properties support both color schemes

### Technology Stack

- Nuxt 4 with SSR
- Vue 3 + TypeScript
- Pinia for state management
- PostCSS with custom media queries and nesting
- xml2js for RSS parsing
- hotkeys-js for keyboard shortcuts
