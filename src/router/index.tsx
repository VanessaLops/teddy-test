import React, { useContext } from 'react'
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

import Home from 'src/screens/home'
import Login from 'src/screens/login'

import { RouterContext } from 'App'

import { Intro } from 'src/screens'

const Stack = createStackNavigator()
export const navigationRef = createNavigationContainerRef()

const transtionAndroid = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
}

const transtionOther = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
}

export const Routes = () => {
  const { routeName, setRouteName } = useContext(RouterContext)


  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute().name)
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.getCurrentRoute().name
        setRouteName(currentRouteName)
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Intro"
      >
        <Stack.Screen
          options={transtionAndroid}
          name="Intro"
          component={Intro}
        />
        <Stack.Screen options={transtionOther} name="Login" component={Login} />
        <Stack.Screen options={transtionOther} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
