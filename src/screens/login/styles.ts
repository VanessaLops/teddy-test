import styled from "styled-components/native";



export const ContentWrapper = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center; 
  align-items: center;
  background-color: #F5F5F5;
  padding: 20px; 
`;


export const LoginButton = styled.TouchableOpacity`
  background-color: #EC6724;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  margin-top: 20px;
`;


export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;


export const Input = styled.TextInput`
  height: 40px;
  width: 100%;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 4px;
  margin-top: 12px;
  padding-left: 10px;
  border-bottom-color: #D9D9D9;
`;

export const Title = styled.Text`
  font-size:28px;
`;
