import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, FlatList } from 'react-native';
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
import { deleteUser } from 'src/services/api';
import { getUsers } from 'src/services/api';
import ModalClient from '../modal/modal-client';
import { CardProps, User, UsersResponse } from '../types';

const Card: React.FC<CardProps> = ({
    clientesPorPagina,
    options,
    handleSelectOption,
    onAddClient,
}) => {
    const [isPickerModalVisible, setIsPickerModalVisible] = useState(false);
    const [isModalClientVisible, setIsModalClientVisble] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [addedClients, setAddedClients] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedClient, setSelectedClient] = useState<User | null>(null);
    const [isVisibleScreens, setIsVisibleScreens] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const totalPages = users?.totalPages || 0;

    const handlePageChange = useCallback((page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }, [currentPage]);

    const fetchUsers = useCallback(async () => {
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
    }, [currentPage, clientesPorPagina]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const clientsToDisplay = users?.clients?.slice(0, Math.min(parseInt(clientesPorPagina, 10), 16)) || [];

    const handleAddClientClick = useCallback((client: User) => {
        setAddedClients((prevClients) => {
            const isAdded = prevClients.some((c) => c.id === client.id);

            if (isAdded) {
                fetchUsers();
                return prevClients.filter((c) => c.id !== client.id);
            } else {
                fetchUsers();
                return [...prevClients, client];
            }
        });
        onAddClient(client);
    }, [fetchUsers, onAddClient]);

    const handleOpenDeleteModal = useCallback((id: string) => {
        setUserIdToDelete(id);
        setIsDeleteModalVisible(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (userIdToDelete) {
            try {
                await deleteUser(userIdToDelete);
                console.log('Usuário deletado com sucesso');
                fetchUsers();
            } catch (error) {
                console.error('Erro ao deletar o usuário:', error);
            } finally {
                setUserIdToDelete(null);
                setIsDeleteModalVisible(false);
            }
        }
    }, [fetchUsers, userIdToDelete]);

    const isClientAdded = (clientId: string) => {
        return addedClients.some((client) => client.id === clientId);
    };

    const refreshClients = useCallback(async () => {
        try {
            const numClientsPerPage = Math.min(parseInt(clientesPorPagina, 10), 16);
            const result = await getUsers(currentPage, numClientsPerPage);
            setUsers(result);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    }, [currentPage, clientesPorPagina]);

    const handleEdit = (client: User) => {
        setIsEditMode(true);
        setSelectedClient(client);
        setIsPickerModalVisible(false);
        setIsDeleteModalVisible(false);
        setIsModalClientVisble(true);
    };

    useEffect(() => {
        refreshClients();
    }, [refreshClients]);

    useEffect(() => {
        console.log('selectedClient:', selectedClient);
    }, [selectedClient]);

    return (
        <Container>
            <TitleText>{`${clientsToDisplay.length} clientes encontrados:`}</TitleText>
            <Row>
                <LabelText>Clientes por página:</LabelText>
                <ButtonContainer onPress={() => setIsPickerModalVisible(true)}>
                    <ButtonText>{clientesPorPagina}</ButtonText>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                </ButtonContainer>
            </Row>

            <FlatList
                data={clientsToDisplay}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: user }) => (
                    <ClientCard key={user.id}>
                        <ClientName>{user.name}</ClientName>
                        <ClientDetails>Salário: R${user.salary}</ClientDetails>
                        <ClientDetails>Empresa: {user.companyValuation}</ClientDetails>
                        <ActionButtonsContainer>
                            <AddIcon
                                name="add-circle"
                                onPress={() => handleAddClientClick(user)}
                                size={30}
                                color={isClientAdded(user.id) ? 'red' : 'black'}
                            />
                            <EditIcon onPress={() => {
                                 handleEdit(user) 
                                setIsVisibleScreens(true); 
                            }} />
                            <DeleteIcon onPress={() => handleOpenDeleteModal(user.id)} />
                        </ActionButtonsContainer>
                    </ClientCard>
                )}
                ListEmptyComponent={loading ? <Text>Carregando...</Text> : null}
            />
            <CreateButton onPress={() => {
                setIsModalClientVisble(true);
                setIsEditMode(false);
                setSelectedClient(null);
                setIsVisibleScreens(true);
            }}>
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
                type='picker'
                visible={isPickerModalVisible}
                options={options}
                onSelectOption={(value: string) => {
                    handleSelectOption(value);
                    setIsPickerModalVisible(false);
                }}
                onClose={() => setIsPickerModalVisible(false)}
            />

            <ModalPicker
                type='delete'
                visible={isDeleteModalVisible}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
                onClose={() => setIsDeleteModalVisible(false)}
            />
            {isVisibleScreens ? (
                <ModalClient
                    visible={isModalClientVisible}
                    bottomSheetModalRef={bottomSheetModalRef}
                    handlePresentModalPress={() => { }}
                    onClose={() => {
                        setIsModalClientVisble(false);
                        setIsEditMode(false);
                        setSelectedClient(null);
                    }}
                    isEditMode={isEditMode}
                    clientData={selectedClient
                        ? { ...selectedClient, salary: Number(selectedClient.salary), companyValuation: String(selectedClient.companyValuation) }
                        : null
                    }
                />
            ) : null}

        </Container>
    );
};

export default Card;
