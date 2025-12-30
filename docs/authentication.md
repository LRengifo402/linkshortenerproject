# Authentication Instructions

## Overview

Authentication in this application is **exclusively handled by Clerk**. No other authentication methods or libraries should be used.

## Core Rules

### 1. Clerk Only

- ✅ Use Clerk for all authentication needs
- ❌ Never implement custom auth logic
- ❌ Never use other auth libraries (NextAuth, Auth0, etc.)

### 2. Protected Routes

- `/dashboard` is a protected route requiring authentication
- Use Clerk's middleware or authentication helpers to protect routes
- Redirect unauthenticated users to sign-in modal

### 3. Authentication Flow

- **Homepage (`/`)**: Redirect logged-in users → `/dashboard`
- **Dashboard (`/dashboard`)**: Redirect logged-out users → Sign-in modal
- **Sign In/Sign Up**: Always launch as **modals** (not separate pages)

## Implementation Patterns

### Protecting Routes

```typescript
// In middleware.ts or route file
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Protected content
}
```

### Homepage Redirect

```typescript
// In app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  // Public homepage content
}
```

### Modal-Based Auth

Configure Clerk to use modal mode in your layout or Clerk configuration:

```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ mode: 'modal' }}>{children}</ClerkProvider>
  );
}
```

Use Clerk components for triggering modals:

```typescript
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

// Trigger sign-in modal
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

// Trigger sign-up modal
<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>

// User menu (when authenticated)
<UserButton />
```

## Key Clerk Imports

```typescript
// Server-side
import { auth, currentUser } from '@clerk/nextjs/server';

// Client-side components
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useAuth,
} from '@clerk/nextjs';

// Provider
import { ClerkProvider } from '@clerk/nextjs';
```

## Best Practices

1. **Server Components First**: Use `auth()` in Server Components when possible
2. **Client Interactivity**: Use `useAuth()` or `useUser()` hooks only in Client Components
3. **Consistent UX**: Always use modal mode for sign-in/sign-up
4. **User Data**: Access user data via `currentUser()` or `useUser()`
5. **Session Management**: Clerk handles sessions automatically—no manual token management needed

## Common Patterns

### Check Authentication Status

```typescript
// Server Component
const { userId } = await auth();
const isAuthenticated = !!userId;

// Client Component
('use client');
const { isSignedIn, userId } = useAuth();
```

### Get User Information

```typescript
// Server Component
const user = await currentUser();
const email = user?.emailAddresses[0]?.emailAddress;

// Client Component
('use client');
const { user } = useUser();
const email = user?.emailAddresses[0]?.emailAddress;
```

## Environment Variables

Ensure these Clerk environment variables are set:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

**Remember**: Clerk handles all authentication complexity. Never implement custom auth logic or use alternative auth providers in this project.
