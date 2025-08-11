import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Stacks from "./navigation/Stacks";

export default function Index() { 
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle='default' backgroundColor='#000' />
      <Stacks />
    </SafeAreaView>
  );
  
}