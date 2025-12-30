# UI Components Guidelines

## 🎨 Component Library Standard

This project uses **shadcn/ui** exclusively for all UI elements. Custom UI components should NOT be created unless there is a specific, documented reason.

## 🚫 Critical Rules

1. **Use shadcn/ui Only**: All UI elements (buttons, inputs, dialogs, cards, etc.) must use shadcn/ui components
2. **No Custom UI Components**: Do not create custom buttons, inputs, modals, or other UI primitives
3. **Extend, Don't Replace**: If customization is needed, extend shadcn/ui components rather than creating new ones

## ✅ Correct Approach

```typescript
// ✅ GOOD - Using shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MyFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## ❌ Incorrect Approach

```typescript
// ❌ BAD - Creating custom UI components
export function CustomButton({ children, onClick }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-blue-500 rounded" onClick={onClick}>
      {children}
    </button>
  );
}
```

## 📦 Available shadcn/ui Components

Components are located in [components/ui/](../components/ui/) and installed as needed. Common components include:

- **Actions**: Button, Dropdown Menu, Dialog, Sheet, Popover
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch, Label
- **Layout**: Card, Separator, Tabs, Accordion, Collapsible
- **Feedback**: Alert, Toast, Badge, Progress, Skeleton
- **Data Display**: Table, Avatar, Calendar, Command

## 🔧 Adding New shadcn/ui Components

When a new UI component is needed:

```bash
npx shadcn@latest add [component-name]
```

Examples:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add toast
```

## 🎨 Customization Patterns

### Variant Customization

Use the built-in variant system:

```typescript
<Button variant="outline" size="sm">
  Click me
</Button>

<Button variant="destructive" size="lg">
  Delete
</Button>
```

### Styling with Tailwind

Extend with additional Tailwind classes using `className`:

```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

<Button className="w-full mt-4">
  Full Width Button
</Button>

// With conditional styling
<Button className={cn(
  "w-full",
  isPrimary && "font-bold"
)}>
  Conditional Style
</Button>
```

### Composition Patterns

Build complex features by composing shadcn/ui components:

```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CreateLinkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Short Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">Original URL</Label>
            <Input id="url" placeholder="https://..." />
          </div>
          <Button type="submit">Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## 🔄 Component Wrapper Pattern

If you need reusable, domain-specific components, wrap shadcn/ui components:

```typescript
// ✅ GOOD - Wrapping shadcn/ui for domain logic
import { Button } from '@/components/ui/button';

export function SubmitLinkButton({ isLoading, onClick }: Props) {
  return (
    <Button onClick={onClick} disabled={isLoading} className="w-full">
      {isLoading ? 'Creating...' : 'Create Short Link'}
    </Button>
  );
}
```

## 📍 File Location

- **shadcn/ui components**: `components/ui/` (auto-generated, can be modified)
- **Domain components**: `components/` or `app/components/` (compose from ui components)
- **Page-specific components**: `app/[page]/components/` (compose from ui components)

## 🎯 Key Takeaways

1. **Never create custom UI primitives** - use shadcn/ui
2. **Install missing components** - use `npx shadcn@latest add [component]`
3. **Compose, don't replace** - build features by combining shadcn/ui components
4. **Extend with Tailwind** - add custom styling via `className` prop
5. **Maintain consistency** - using one component library ensures design coherence

---

**When in doubt**: Check the [shadcn/ui documentation](https://ui.shadcn.com/) for component examples and usage patterns.
