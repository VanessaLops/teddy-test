import React, { useEffect } from "react";

import { StatusBar, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { ButtonText, Container, ContentWrapper, Input, LoginButton, Title } from "./styles";

export type RootStackParamList = {
    Home: undefined;
    Clientes: { clients: any[] };
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
            <ContentWrapper>
                <Title>Olá, seja bem-vindo!</Title>
                <Input
                    placeholder="Digite o seu nome:"
                    placeholderTextColor="#888"
                />
                <LoginButton onPress={handleLogin}>
                    <ButtonText>Entrar</ButtonText>
                </LoginButton>
            </ContentWrapper>
        </Container>
    );
}

