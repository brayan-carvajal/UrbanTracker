import './polyfills'; // Debe ser la primera importación
import './global.css';
import AuthProvider from '@/auth/context/provider/AuthProvider';
import Index from './src';
import MqttProvider from '@/mqtt/provider/MqttProviderWS';
import LocationProviderGeolocation from '@/location/provider/LocationProviderGeolocation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <AuthProvider>
      <MqttProvider>
        <LocationProviderGeolocation>
          <NavigationContainer>
            <Index />
          </NavigationContainer>
        </LocationProviderGeolocation>
      </MqttProvider>
    </AuthProvider>
  );
}
