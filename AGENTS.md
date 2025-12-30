# Agent Instructions for Link Shortener Project

This document contains coding standards, conventions, and best practices for AI assistants working on this Link Shortener project. Following these guidelines ensures consistency, maintainability, and high code quality.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Detailed Documentation](#detailed-documentation)
- [Quick Reference](#quick-reference)
- [Core Principles](#core-principles)

## 🎯 Project Overview

This is a **Link Shortener** application built with modern web technologies:

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Clerk
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React

## 📚 Detailed Documentation

⚠️ **CRITICAL REQUIREMENT**: You MUST read the relevant documentation files in the `/docs` directory BEFORE generating ANY code. This is not optional - it is mandatory for every code generation task.

The following detailed instruction documents are available in the `/docs` directory:

- **[Authentication](/docs/authentication.md)** - Clerk authentication patterns, protected routes, and auth flow - **READ THIS before any auth-related code**
- **[UI Components](/docs/ui-components.md)** - shadcn/ui component usage, patterns, and customization guidelines - **READ THIS before creating/modifying UI components**

## 🚀 Quick Reference

### File Organization

```
app/                    # Next.js App Router pages and layouts
  components/          # Page-specific components
db/                    # Database schema and configuration
  schema.ts           # Drizzle schema definitions
  index.ts            # Database connection
lib/                   # Shared utilities
  utils.ts            # Helper functions (cn, etc.)
components/            # Shared/global components
  ui/                 # shadcn/ui components
public/               # Static assets
```

### Import Aliases

Use the configured path aliases from [tsconfig.json](tsconfig.json):

```typescript
import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { cn } from '@/lib/utils';
```

### Component Patterns

```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component
"use client"
export function InteractiveWidget() {
  const [state, setState] = useState()
  return <button onClick={...}>...</button>
}
```

### Styling Approach

- Use Tailwind utility classes
- Use `cn()` helper for conditional classes
- Follow shadcn/ui New York style conventions
- Support dark mode with `dark:` variants

```typescript
<div className={cn(
  "flex items-center gap-2",
  isActive && "bg-accent",
  className
)}>
```

## ⚡ Core Principles

1. **Type Safety First**: Always use TypeScript with strict mode. No `any` types without justification.

2. **Server by Default**: Prefer Server Components. Only use `"use client"` when necessary (interactivity, hooks, browser APIs).

3. **Component Composition**: Build small, reusable components. Use shadcn/ui components as building blocks.

4. **Consistent Styling**: Use Tailwind utilities consistently. Follow the established design system.

5. **Database Safety**: Always validate user input. Use parameterized queries. Handle errors gracefully.

6. **Clean Code**: Write self-documenting code. Use descriptive names. Keep functions focused and small.

7. **Performance**: Optimize images with Next.js Image component. Use proper caching strategies.

8. **Accessibility**: Ensure components are keyboard-navigable and screen-reader friendly.

## 🔍 Before Making Changes

When implementing features or fixing bugs:

1. ✅ **READ RELEVANT DOCUMENTATION FILES IN `/docs` FIRST** - This is MANDATORY, not optional
2. ✅ Check existing patterns in the codebase
3. ✅ Ensure type safety and proper error handling
4. ✅ Follow naming conventions and file structure
5. ✅ Test server/client component boundaries
6. ✅ Validate database operations
7. ✅ Consider accessibility and performance

⚠️ **IMPORTANT**: Step 1 is the most critical step. Never skip reading the documentation files in `/docs` before generating code. These files contain essential patterns, standards, and requirements that must be followed.

## 📝 Documentation Updates

When adding new patterns or conventions:

1. Update the relevant document in `/docs`
2. Keep examples current and practical
3. Document any deviations from standards with justification

---

## ⚠️ FINAL REMINDER

**ALWAYS READ THE DOCUMENTATION IN `/docs` BEFORE WRITING CODE**

These guidelines exist to maintain consistency and quality. The documentation files in `/docs` are not optional reference material - they are mandatory reading before generating any code in their respective domains:

- Working with authentication? → Read `/docs/authentication.md` FIRST
- Creating/modifying UI components? → Read `/docs/ui-components.md` FIRST
- Adding new areas? → Check if there's a relevant doc FIRST

When in doubt, refer to the detailed documentation in `/docs` or examine existing code for established patterns.
