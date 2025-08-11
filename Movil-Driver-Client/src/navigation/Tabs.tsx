import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/home/screen/HomeScreen';
import ProfileScreen from '@/profile/ProfileScreen';

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        animation: "none",
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ animation: "fade", }} />
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{ animation: "shift" }} />
    </Tab.Navigator>
  );
}
