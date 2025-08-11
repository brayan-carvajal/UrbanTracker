import { useContext } from 'react';
import LocationContext from '@/location/context/LocationContext';
import type { LocationContextType } from '@/location/types';

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de un LocationProvider');
  }
  return context;
};
