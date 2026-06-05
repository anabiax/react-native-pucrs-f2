import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PokedexScreen from './screens/PokedexScreen';

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#E3000F" />
      <PokedexScreen />
    </SafeAreaProvider>
  );
}