import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/provider/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: string; // Ruta de redirección si no está autenticado
}

export function ProtectedRoute({ children, fallback = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="mt-4 text-white">Verificando sesión...</Text>
      </View>
    );
  }

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    return <Redirect href={fallback} />;
  }

  // Renderizar contenido protegido
  return <>{children}</>;
}

export default ProtectedRoute;
