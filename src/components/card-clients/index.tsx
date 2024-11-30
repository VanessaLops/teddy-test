import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    CreateButtonText,
    PaginationContainer,
    PageButton,
    PageNumber
} from './styles';
import AddIcon from 'src/assets/icons/add';
import EditIcon from 'src/assets/icons/edti';
import DeleteIcon from 'src/assets/icons/delete';
import ModalPicker from '../modal/modal-picker';
import { getUsers } from 'src/services/user-service';
import { Text, FlatList, Button } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import ModalClient from '../modal/modal-client';

interface User {
    id: string;
    name: string;
    salary: number;
    companyValuation: string;
}

interface UsersResponse {
    currentPage: number;
    totalPages: number;
    clients: User[];
}

interface CardProps {
    clientesPorPagina: string;
    setClientesPorPagina: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
    handleSelectOption: (value: string) => void;
}

const Card: React.FC<CardProps> = ({
    clientesPorPagina,
    options,
    handleSelectOption
}) => {
    const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
    const [isSelectModalClientVisible, setIsSelectModalClientVisible] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const totalPages = users?.totalPages || 0;

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const numClientsPerPage = Math.min(parseInt(clientesPorPagina, 10), 16);
            const data = await getUsers(currentPage, numClientsPerPage);
            setUsers(data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, clientesPorPagina]);

    const clientsToDisplay = users?.clients.slice(0, Math.min(parseInt(clientesPorPagina, 10), 16)) || [];

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);




    return (
        <Container>
            <TitleText>{`${clientsToDisplay.length} clientes encontrados:`}</TitleText>
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
                    data={clientsToDisplay}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item: user }) => (
                        <ClientCard key={user.id}>
                            <ClientName>{user.name}</ClientName>
                            <ClientDetails>Salário: R${user.salary}</ClientDetails>
                            <ClientDetails>Empresa: {user.companyValuation}</ClientDetails>
                            <ActionButtonsContainer>
                                <AddIcon onPress={() => setIsSelectModalClientVisible(true)} />
                                <EditIcon onPress={() => setIsSelectModalClientVisible(true)} />
                                <DeleteIcon />
                            </ActionButtonsContainer>
                        </ClientCard>
                    )}
                />
            )}

            <CreateButton onPress={() => setIsSelectModalClientVisible(true)}>
                <CreateButtonText>Criar Cliente</CreateButtonText>
            </CreateButton>

            <PaginationContainer>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <PageButton
                        key={pageNumber}
                        onPress={() => handlePageChange(pageNumber + 1)}
                        selected={currentPage === pageNumber + 1}
                    >
                        <PageNumber selected={currentPage === pageNumber + 1}>
                            {pageNumber + 1}
                        </PageNumber>
                    </PageButton>
                ))}
            </PaginationContainer>

            <ModalPicker
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
                bottomSheetModalRef={bottomSheetModalRef}
                handlePresentModalPress={handlePresentModalPress}
                onClose={() => setIsSelectModalClientVisible(false)}
            />


        </Container>
    );
};

export default Card;
