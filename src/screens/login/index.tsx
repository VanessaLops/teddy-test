import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StatusBar, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
    Home: undefined;
};


type HomeProps = StackNavigationProp<RootStackParamList, 'Home'>;


export default function Login() {

    const navigation = useNavigation<HomeProps>();


    useEffect(() => {

        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('white');

        return () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('transparent');
        };
    }, []);

    const handleLogin = () => {
        navigation.navigate('Home');
    };
    return (
        <Container>
            <View style={{ paddingLeft: 15, paddingRight: 15, flex: 1, justifyContent: "center", width: "100%", alignItems: "center" }}>
                <Text style={{ fontSize: 28 }}>Olá, seja bem-vindo!</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginTop: 12,
                        paddingLeft: 10,
                        borderBottomColor: '#D9D9D9',
                        width: "100%"
                    }}
                    placeholder="Digite o seu nome:"
                    placeholderTextColor="#888"
                />
                <LoginButton onPress={handleLogin}>
                    <ButtonText>Entrar</ButtonText>
                </LoginButton>
            </View>
        </Container>
    );
}



const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center; 
  align-items: center;
  background-color:#F5F5F5;
`;

const LoginButton = styled.TouchableOpacity`
     background-color: #EC6724;
     border-radius: 4px;
     align-items: center;
     height:40px;
     justify-content:center;
     width:100%;
     margin-top:20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  align-self:center;
`;