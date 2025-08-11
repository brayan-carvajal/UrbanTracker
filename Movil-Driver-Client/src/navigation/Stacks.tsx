import useAuth from '@/auth/hooks/useAuth';
import LoginScreen from '@/auth/screen/LoginScreen';
import HomeScreen from '@/home/screen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Stacks() {
  const { token } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {token ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade_from_bottom' }} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
