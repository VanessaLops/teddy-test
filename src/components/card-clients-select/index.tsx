import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Container,
    TitleText,
    Row,
    LabelText,
    ButtonContainer,
    ButtonText,
    ClientCard,
    ClientName,
    ClientDetails,
    ActionButtonsContainer,
    CreateButton,
    CreateButtonText
} from './styles';
import EditIcon from 'src/assets/icons/edti';
import ModalPicker from '../modal/modal-picker';
import ModalClient from '../modal/modal-sider';
import { CardProps, User } from '../types';


const CardClientSelect: React.FC<CardProps> = ({
    clientesPorPagina,
    options,
    handleSelectOption,
    onAddClient,
    setClientesPorPagina,
    clientsToDisplay
}) => {
    const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
    const [isSelectModalClientVisible, setIsSelectModalClientVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [addedClients, setAddedClients] = useState<User[]>([]);

    useEffect(() => {
        const loadSelectedClients = async () => {
            try {
                const savedClients = await AsyncStorage.getItem("selectedClient");
                if (savedClients) {
                    const parsedClients = JSON.parse(savedClients);
                    setAddedClients(parsedClients);
                }
            } catch (error) {
                console.error("Erro ao carregar clientes selecionados:", error);
            }
        };

        loadSelectedClients();
    }, []);

    const clearSelectedClients = async () => {
        try {
            await AsyncStorage.removeItem("selectedClient");
            console.log("Clientes selecionados removidos com sucesso");
            setAddedClients([]);
        } catch (error) {
            console.error("Erro ao limpar clientes selecionados:", error);
        }
    };

    const removeClient = async (id: string) => {
        try {
            const updatedClients = addedClients.filter(client => client.id !== id);
            setAddedClients(updatedClients);

            await AsyncStorage.setItem("selectedClient", JSON.stringify(updatedClients));
            console.log(`Cliente com ID ${id} removido com sucesso`);
        } catch (error) {
            console.error("Erro ao remover cliente:", error);
        }
    };

    return (
        <Container>
            <TitleText>{`${addedClients.length} clientes Selecionados:`}</TitleText>
            <Row>
                <LabelText>Clientes por página:</LabelText>
                <ButtonContainer onPress={() => setIsSelectModalVisible(true)}>
                    <ButtonText>{clientesPorPagina}</ButtonText>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                </ButtonContainer>
            </Row>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={addedClients}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item: user }) => (
                        <ClientCard key={user.id}>
                            <ClientName>{user.name}</ClientName>
                            <ClientDetails>Salário: R${user.salary}</ClientDetails>
                            <ClientDetails>Empresa: {user.companyValuation}</ClientDetails>
                            <ActionButtonsContainer>
                                <EditIcon onPress={() => removeClient(user.id)} />
                            </ActionButtonsContainer>
                        </ClientCard>
                    )}
                />
            )}

            <CreateButton onPress={clearSelectedClients}>
                <CreateButtonText>Limpar Seleção</CreateButtonText>
            </CreateButton>

            <ModalPicker
                type='create'
                visible={isSelectModalVisible}
                options={options}
                onSelectOption={(value: string) => {
                    handleSelectOption(value);
                    setIsSelectModalVisible(false);
                }}
                onClose={() => setIsSelectModalVisible(false)}
            />

            <ModalClient
                visible={isSelectModalClientVisible}
                onSelectOption={(value: string) => {
                    handleSelectOption(value);
                    setIsSelectModalClientVisible(false);
                }}
                onClose={() => setIsSelectModalClientVisible(false)}
            />
        </Container>
    );
};

export default CardClientSelect;
