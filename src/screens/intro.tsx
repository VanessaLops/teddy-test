import { StyleSheet, View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import LogoIcon from 'src/assets/icons/logo'

export const Intro = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start()


    const timeout = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'))
    }, 2000)

    return () => clearTimeout(timeout)
  }, [fadeAnim, navigation])

  return (
    <LinearGradient style={styles.background} colors={['#ffffff', '#FCCEDA']}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
        }}
      >
        <View>
          <LogoIcon />
        </View>
      </Animated.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
