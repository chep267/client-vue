# 📋 CODING RULES & STANDARDS

## 🏗️ Smart/Dumb Component Architecture

### ✅ REQUIRED: Component Separation

[//]: # '- **Smart Components** → `containers/` directory ONLY'
[//]: # '- **Dumb Components** → `components/` directory ONLY'
[//]: # '- **NO business logic** in `components/`'
[//]: # '- **NO UI rendering** in `containers/`'

```typescript
// ❌ WRONG: Logic in component
export function ChatPage() {
    const [data, setData] = useState() // NO!
    useEffect(() => { /* API call */ }, []) // NO!
}

// ✅ CORRECT: Pure UI component
interface ChatPageProps {
    messages: Message[]
    onSendMessage: (text: string) => void
}
export function ChatPage(props: ChatPageProps) {
    const { messages, onSendMessage } = props;
    return <div>abc</div>
}
```

[//]: # '## 📁 File Structure Rules'
[//]: #
[//]: # '### ✅ REQUIRED: Atomic Design Organization'
[//]: # '```'
[//]: # 'components/'
[//]: # '├── atoms/          # Basic elements (Button, Input)'
[//]: # '├── molecules/      # Simple combinations (ChatInput)'
[//]: # '├── organisms/      # Complex sections (MessageList)'
[//]: # '└── templates/      # Page layouts (ChatPage)'
[//]: # '```'

### ✅ REQUIRED: File Size Limit

- **Maximum 200 lines, 600 words per file**
- Split large components into smaller ones
- Use composition over large files

## 🔷 TypeScript Rules

### ✅ REQUIRED: Strict Mode

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
```

### ✅ REQUIRED: Interface Naming

```typescript
// ✅ CORRECT
interface UserProps {}
interface ApiResponse<T> {}
type MessageStatus = 'sent' | 'delivered';

// ❌ WRONG
interface userProps {} // No lowercase
interface IUser {} // No "I" prefix
```

### ✅ REQUIRED: Props Interface

```typescript
// Every component MUST have typed props
interface ComponentNameProps {
    required: string;
    optional?: number;
    callback: (data: string) => void;
}
```

## 🔌 API Integration Rules

### ✅ REQUIRED: Service Layer Pattern

```typescript
// All API calls MUST go through services
// lib/api/services/userService.ts
export const userService = {
    getUsers: () => apiClient.get<User[]>('/users'),
    createUser: (data: CreateUserData) => apiClient.post('/users', data),
};
```

### ✅ REQUIRED: Custom Hooks for API

```typescript
// Use custom hooks, NOT direct service calls in components
export function useUsers() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // ...
}
```

### ✅ REQUIRED: Error Handling

```typescript
// Every API call MUST handle errors
try {
    const response = await userService.getUsers();
    setData(response.data);
} catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error');
}
```

## 🗄️ State Management Rules

### ✅ REQUIRED: Zustand Store Pattern

```typescript
// stores/feature-store.ts
interface FeatureState {
    data: DataType[];
    loading: boolean;
    error: string | null;
}

interface FeatureActions {
    fetchData: () => Promise<void>;
    addItem: (item: DataType) => void;
    clearError: () => void;
}

export const useFeatureStore = create<FeatureState & FeatureActions>()(
    devtools(
        persist(
            (set, get) => ({
                // state
                data: [],
                loading: false,
                error: null,
                // actions
                fetchData: async () => {
                    /* implementation */
                },
                addItem: (item) => set((state) => ({ data: [...state.data, item] })),
                clearError: () => set({ error: null }),
            }),
            { name: 'feature-store' }
        )
    )
);
```

### ✅ REQUIRED: Selective Subscriptions

```typescript
// ✅ CORRECT: Use selectors
const data = useFeatureStore((state) => state.data);
const loading = useFeatureStore((state) => state.loading);

// ❌ WRONG: Subscribe to entire store
const store = useFeatureStore();
```

## 🎨 Styling Rules

### ✅ REQUIRED: Tailwind CSS Only

- **NO custom CSS files** (except globals.css)
- Use **shadcn/ui components** when available
- Follow **responsive design** patterns

```tsx
// ✅ CORRECT
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md" />

// ❌ WRONG
<div style={{ display: 'flex', padding: '16px' }} />
```

## 📝 Naming Conventions

### ✅ REQUIRED: File Naming

```
PascalCase.tsx     # Components
kebab-case.ts      # Utilities, stores
camelCase.ts       # Services, hooks
```

### ✅ REQUIRED: Function Naming

```typescript
// Components: PascalCase
export function UserProfile() {}

// Hooks: camelCase starting with 'use'
export function useUserData() {}

// Services: camelCase
export const userService = {};

// Event handlers: handle + PascalCase
const handleSubmit = () => {};
const handleUserClick = () => {};
```

## 🧪 Code Quality Rules

### ✅ REQUIRED: ESLint Compliance

- **Zero ESLint errors** allowed
- **Zero TypeScript errors** allowed
- Run `npm run lint` before commit

### ✅ REQUIRED: Import Organization

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import axios from 'axios';
import { create } from 'zustand';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/button';
import { userService } from '@/lib/api/services/userService';

// 4. Relative imports
import './styles.css';
```

### ✅ REQUIRED: Comments

```typescript
// Every complex function MUST have JSDoc
/**
 * Fetches user data with error handling and loading states
 * @param userId - The ID of the user to fetch
 * @returns Promise resolving to user data
 */
export async function fetchUserData(userId: string): Promise<User> {
    // Implementation
}
```

## 🚫 FORBIDDEN Patterns

### ❌ NEVER DO THIS:

```tsx
// ❌ Any type usage
const data: any = response;

// ❌ Inline styles
const elem = <div style={{ color: 'red' }} />;

// ❌ Console.log in production
console.log('debug info');

// ❌ Direct DOM manipulation
document.getElementById('element');

// ❌ Mixing logic in UI components
export function Component() {
    const [data, setData] = useState();
    useEffect(() => {
        /* API call */
    }, []);
    return <div>...</div>;
}

// ❌ Default exports for components
export default function Component() {}
```

## ✅ ENFORCEMENT

### Automated Checks:

- **Pre-commit hooks** check file size (350 words max)
- **ESLint** enforces TypeScript rules
- **CI/CD pipeline** blocks non-compliant code
- **File size monitor** in development

### Manual Review:

- **Code review** checklist for Smart/Dumb separation
- **Architecture review** for new features
- **Performance review** for state management

---

**⚠️ VIOLATION = REJECTED PR**

All rules are **MANDATORY**. Non-compliance will result in automatic PR rejection.
