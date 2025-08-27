// Servicios
export { AuthService } from './services/authService';

// Contextos y Providers
export { AuthProvider, useAuth } from './context/provider/AuthProvider';

// Componentes
export { ProtectedRoute } from './components/ProtectedRoute';

// Hooks
export { default as useAuthHook } from './hooks/useAuth';

// Re-exportar tipos para fácil acceso
export type { 
  User, 
  LoginCredentials, 
  AuthState, 
  AuthContextType 
} from '@/types';
