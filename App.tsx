import { useFonts } from 'expo-font'
import { ContentCenter } from './src/styles/basic'
import { Routes } from './src/router'
import { Platform, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { createContext, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const RouterContext = createContext<any>('')

export default function App() {
  const [routeName, setRouteName] = useState('')


  const [fontsLoaded] = useFonts({
    RubikRegular: require('./src/assets/fonts/Rubik-Regular.ttf'),
    Inter: require('./src/assets/fonts/Inter-Light.otf'),
    NunitoRegular: require('./src/assets/fonts/NunitoRegular-vmABZ.ttf'),
  })

  if (!fontsLoaded) {
    return <ContentCenter style={{ backgroundColor: '#1A1A1A' }} />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RouterContext.Provider value={{ routeName, setRouteName }}>
        {Platform.OS === 'ios' && (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: '5.5%' }}
            colors={['#FFF', '#FFF']}
          >
            <StatusBar translucent barStyle="light-content" />
          </LinearGradient>
        )}
        <Routes />
      </RouterContext.Provider>
    </GestureHandlerRootView>
  )
}
