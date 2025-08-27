# Sistema de Autenticación - UrbanTracker

## Arquitectura

Esta implementación utiliza un patrón robusto de autenticación con Context API, reducers, y persistencia local.

### Estructura de Archivos

```
src/auth/
├── components/
│   └── ProtectedRoute.tsx    # Componente wrapper para rutas protegidas
├── context/
│   └── provider/
│       └── AuthProvider.tsx  # Provider principal con Context y lógica
├── hooks/
│   └── useAuth.ts           # Hook simplificado (re-export)
├── services/
│   └── authService.ts       # Servicios de API y AsyncStorage
├── index.ts                 # Barrel exports
└── README.md               # Esta documentación
```

## Componentes Principales

### 1. AuthProvider
- **Ubicación**: `context/provider/AuthProvider.tsx`
- **Propósito**: Maneja el estado global de autenticación usando useReducer
- **Características**:
  - Persistencia con AsyncStorage
  - Verificación automática de sesión al inicio
  - Manejo de estados de loading
  - Funciones async para login/logout

### 2. AuthService
- **Ubicación**: `services/authService.ts`
- **Propósito**: Abstrae las llamadas a API y manejo de storage
- **Funciones**:
  - `login()`: Autenticación con credenciales
  - `logout()`: Limpieza de sesión
  - `checkAuthStatus()`: Verificación de sesión válida
  - `getToken()` / `getUser()`: Recuperación de datos guardados

### 3. ProtectedRoute
- **Ubicación**: `components/ProtectedRoute.tsx`
- **Propósito**: Wrapper que protege rutas basado en estado de auth
- **Características**:
  - Redirección automática si no está autenticado
  - Pantalla de loading durante verificación
  - Fallback configurable

## Tipos TypeScript

```typescript
interface User {
  id: string;
  identificacion: string;
  nombre?: string;
  email?: string;
  role?: string;
}

interface LoginCredentials {
  identificacion: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
```

## Uso

### En componentes
```typescript
import useAuth from '@/auth/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();
  
  // ... lógica del componente
}
```

### Rutas protegidas
```typescript
import ProtectedRoute from '@/auth/components/ProtectedRoute';

function Layout() {
  return (
    <ProtectedRoute fallback="/login">
      {/* Contenido protegido */}
    </ProtectedRoute>
  );
}
```

### Login
```typescript
const handleLogin = async () => {
  const success = await login({ identificacion, password });
  if (success) {
    // Redirección automática
  } else {
    // Manejar error
  }
};
```

## Flujo de Autenticación

1. **Inicio de App**: AuthProvider verifica sesión guardada en AsyncStorage
2. **Login**: Usuario ingresa credenciales → AuthService.login() → Estado actualizado
3. **Navegación**: ProtectedRoute verifica auth antes de mostrar contenido
4. **Logout**: AuthService.logout() limpia storage → Estado resetead → Redirección

## Persistencia

- **Token**: Guardado en AsyncStorage con clave `auth_token`
- **Usuario**: Guardado en AsyncStorage con clave `auth_user`
- **Verificación**: Al iniciar la app se restaura automáticamente

## Rutas

- `/login`: Pantalla de inicio de sesión
- `/`: Redirección inicial basada en estado de auth
- `/(protected)/*`: Rutas que requieren autenticación

## Mejoras Futuras

- [ ] Refresh token automático
- [ ] Biometrics/Touch ID
- [ ] Multi-factor authentication
- [ ] Session timeout
- [ ] Interceptores de API para manejo automático de tokens expirados
