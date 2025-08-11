import { useEffect, useMemo, useState } from "react";
import LocationContext from "../context/LocationContext";
import type { LocationPermissionStatus } from "../types";
import * as RNLocation from 'react-native-location';
import { type Location } from "react-native-location";

export default function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('prompt');
  const [isTracking, setIsTracking] = useState<boolean>(false); // <-- Nuevo estado

  useEffect(() => {
    const configureLocation = async () => {
      try {
        await RNLocation.configure({
          distanceFilter: 5.0, // Distancia mínima en metros para una actualización
          desiredAccuracy: {
            ios: 'best',
            android: 'highAccuracy'
          },
          // Configuración adicional para Android
          androidProvider: 'auto',
          interval: 5000, // Intervalo en milisegundos
          fastestInterval: 10000, // Intervalo más rápido en milisegundos
          maxWaitTime: 20000, // Tiempo máximo de espera en milisegundos
        });
        console.log('✅ React Native Location configurado correctamente');
      } catch (error) {
        console.error('❌ Error configurando react-native-location:', error);
      }
    };
    
    configureLocation();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // La función que obtiene la ubicación mejorada
  const requestLocation = async () => {
    try {
      console.log('🔍 Solicitando permisos de ubicación...');
      
      const hasPermission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
          rationale: {
            title: 'Permiso de Ubicación',
            message: 'Necesitamos acceder a tu ubicación para las funciones de la app.',
            buttonPositive: 'Aceptar',
            buttonNegative: 'Cancelar',
          },
        },
      });

      if (!hasPermission) {
        console.log('❌ Permisos de ubicación denegados');
        setPermissionStatus('denied');
        return;
      }

      console.log('✅ Permisos de ubicación concedidos');
      setPermissionStatus('granted');
      
      // Intentar obtener la ubicación actual
      console.log('📍 Obteniendo ubicación actual...');
      const latestLocation = await RNLocation.getLatestLocation({ 
        timeout: 10000,
        enableHighAccuracy: true,
        distanceFilter: 0,
        useSignificantChanges: false
      });
      
      if (latestLocation) {
        console.log('✅ Ubicación obtenida:', {
          lat: latestLocation.latitude,
          lon: latestLocation.longitude,
          accuracy: latestLocation.accuracy
        });
        setLocation(latestLocation);
      } else {
        console.log('⚠️ No se pudo obtener la ubicación con getLatestLocation');
        console.log('❌ Verifica que el GPS esté activado y que tengas conexión a satélites');
      }
    } catch (error) {
      console.error('❌ Error en requestLocation:', error);
      setPermissionStatus('denied');
    }
  };

  // ✅ Lógica del intervalo controlada por el estado de `isTracking`
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isTracking) {
      // Inicia el intervalo para pedir la ubicación cada 5 segundos
      intervalId = setInterval(() => {
        console.log('Obteniendo ubicación periódicamente...');
        requestLocation();
      }, 5000); // 5000 milisegundos = 5 segundos
    }

    // ❗️ Función de limpieza: se ejecuta cuando isTracking cambia a false o el componente se desmonta
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Detiene el intervalo para evitar fugas de memoria
      }
    };
  }, [isTracking]); // Este efecto depende únicamente del estado `isTracking`

  // Nueva función para alternar el seguimiento desde la UI
  const toggleTracking = () => {
    setIsTracking((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      location,
      permissionStatus,
      isTracking, // <-- Expone el estado
      requestLocation,
      toggleTracking, // <-- Expone la función
    }),
    [location, permissionStatus, isTracking]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}