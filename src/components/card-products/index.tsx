import React, { useEffect, useState } from 'react';
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
    CreateButton,
    CreateButtonText,
    PaginationContainer,
    PageButton,
    PageNumber
} from './styles';
import { getUsers } from 'src/services/api';
import { Text, FlatList } from 'react-native';
import ModalClient from '../modal/modal-sider';
import { CardProps, UsersResponse } from '../types';


const CardProduct: React.FC<CardProps> = ({
    clientesPorPagina,
    options,
    handleSelectOption
}) => {
    const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
    const [isSelectModalClientVisible, setIsSelectModalClientVisible] = useState(false);
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


    return (
        <Container>
            <TitleText>{`0 Produtos:`}</TitleText>
            <Row>
                <LabelText>Produtos por página:</LabelText>
                <ButtonContainer onPress={() => setIsSelectModalVisible(true)}>
                    <ButtonText>{clientesPorPagina}</ButtonText>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                </ButtonContainer>
            </Row>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <ClientCard>
                    <ClientName>Dados Indisponivel Aguarde...</ClientName>
                </ClientCard>
            )}

            <CreateButton onPress={() => setIsSelectModalClientVisible(true)} >
                <CreateButtonText>Criar Produto</CreateButtonText>
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

export default CardProduct;
