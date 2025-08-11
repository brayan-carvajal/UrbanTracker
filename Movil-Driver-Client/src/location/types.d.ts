import { type Location } from 'react-native-location';

// Podemos definir un tipo para el estado del permiso
export type LocationPermissionStatus = 'granted' | 'denied' | 'prompt';

// La forma del objeto que proveerá nuestro contexto de ubicación
export interface LocationContextType {
  location: Location | null;
  permissionStatus: LocationPermissionStatus;
  isTracking: boolean; // <-- Añade esto
  requestLocation: () => Promise<void>;
  toggleTracking: () => void; // <-- Y esto
}
