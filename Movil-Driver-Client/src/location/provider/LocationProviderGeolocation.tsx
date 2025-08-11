import { useEffect, useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from 'react-native';
import LocationContext from "../context/LocationContext";
import type { LocationPermissionStatus } from "../types";
import Geolocation from 'react-native-geolocation-service';
import type { GeolocationResponse } from 'react-native-geolocation-service';

// Definir un tipo de ubicación compatible
interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export default function LocationProviderGeolocation({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('prompt');
  const [isTracking, setIsTracking] = useState<boolean>(false);

  // Función para convertir GeolocationResponse a nuestro formato Location
  const convertToLocation = (response: GeolocationResponse): Location => ({
    latitude: response.coords.latitude,
    longitude: response.coords.longitude,
    accuracy: response.coords.accuracy,
    timestamp: response.timestamp,
  });

  // Función para solicitar permisos específicos para Android
  const requestAndroidPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de Ubicación',
          message: 'Necesitamos acceder a tu ubicación para las funciones de la app.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Permisos de ubicación concedidos');
        return true;
      } else {
        console.log('❌ Permisos de ubicación denegados:', granted);
        return false;
      }
    } catch (err) {
      console.warn('❌ Error solicitando permisos:', err);
      return false;
    }
  };

  // Función para solicitar permisos y obtener ubicación
  const requestLocation = async () => {
    try {
      console.log('🔍 Solicitando permisos de ubicación...');
      
      // Solicitar permisos específicos para Android
      const hasPermission = await requestAndroidPermission();
      
      if (!hasPermission) {
        setPermissionStatus('denied');
        return;
      }
      
      setPermissionStatus('granted');
      
      // Obtener ubicación actual
      console.log('📍 Obteniendo ubicación actual...');
      
      Geolocation.getCurrentPosition(
        (position) => {
          const newLocation = convertToLocation(position);
          console.log('✅ Ubicación obtenida:', {
            lat: newLocation.latitude,
            lon: newLocation.longitude,
            accuracy: newLocation.accuracy
          });
          setLocation(newLocation);
        },
        (error) => {
          console.error('❌ Error obteniendo ubicación:', error);
          if (error.code === 1) {
            console.log('❌ Permisos insuficientes o denegados');
            setPermissionStatus('denied');
          } else if (error.code === 2) {
            console.log('❌ Ubicación no disponible (GPS desactivado?)');
          } else if (error.code === 3) {
            console.log('❌ Timeout obteniendo ubicación');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (error) {
      console.error('❌ Error en requestLocation:', error);
      setPermissionStatus('denied');
    }
  };

  // Watch position para tracking automático
  useEffect(() => {
    let watchId: number | null = null;

    if (isTracking && permissionStatus === 'granted') {
      console.log('🔄 Iniciando tracking de ubicación...');
      
      watchId = Geolocation.watchPosition(
        (position) => {
          const newLocation = convertToLocation(position);
          console.log('🔄 Ubicación actualizada:', {
            lat: newLocation.latitude,
            lon: newLocation.longitude,
            accuracy: newLocation.accuracy
          });
          setLocation(newLocation);
        },
        (error) => {
          console.error('❌ Error en watchPosition:', error);
        },
        {
          enableHighAccuracy: true,
          interval: 5000, // 5 segundos
          distanceFilter: 5, // 5 metros
          fastestInterval: 2000, // 2 segundos mínimo
        }
      );
    }

    // Cleanup function
    return () => {
      if (watchId !== null) {
        console.log('⏹️ Deteniendo tracking de ubicación...');
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, permissionStatus]);

  // Función para alternar el tracking
  const toggleTracking = () => {
    setIsTracking((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      location,
      permissionStatus,
      isTracking,
      requestLocation,
      toggleTracking,
    }),
    [location, permissionStatus, isTracking]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
