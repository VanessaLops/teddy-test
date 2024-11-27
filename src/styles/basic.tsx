import { ActivityIndicator } from 'react-native'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'

export const BusyIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FFFD01" />
    </View>
  )
}

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`
export const ContainerScroll = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
`
export const ContainerKeyboard = styled.ScrollView`
  width: 100%;
  flex: 1;
`
export const Content = styled.View`
  width: 100%;
  flex: 1;
`
export const ContentCenter = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`
export const MainTitle = styled.Text`
  font-family: 'Poppins';
  font-size: 24px;
`
export const SubTitle = styled.Text`
  font-family: 'PoppinsLight';
  color: #757575;
`
export const BackText = styled.Text`
  text-align: center;
  font-family: 'Poppins';
  color: #212121;
  height: 20px;
`
export const ButtonAreaSend = styled.TouchableOpacity`
  display: flex;
  margin-top: 20%;
  align-items: center;
  margin-bottom: 20%;
`
export const Row = styled.View`
  display: flex;
  flex-direction: row;
`
export const TextCommon = styled.Text`
  font-family: 'PoppinsLight';
`

export const Title = styled.Text`
  font-family: 'Poppins';
`
export const basic = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCenter: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})
