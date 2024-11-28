import React, { useState } from 'react';

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
import AddIcon from 'src/assets/icons/add';
import EditIcon from 'src/assets/icons/edti';
import DeleteIcon from 'src/assets/icons/delete';
import ModalPicker from '../modal/modal-picker';

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
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    return (
        <Container>
            <TitleText>2 clientes encontrados:</TitleText>
            <Row>
                <LabelText>Clientes por página:</LabelText>
                <ButtonContainer onPress={() => setIsSelectModalVisible(true)}>
                    <ButtonText>{clientesPorPagina}</ButtonText>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                </ButtonContainer>
            </Row>

            <ClientCard>
                <ClientName>Eduardo</ClientName>
                <ClientDetails>Salário: R$3.500,00</ClientDetails>
                <ClientDetails>Empresa: R$120.000,00</ClientDetails>
                <ActionButtonsContainer>
                    <AddIcon onPress={() => setIsAddModalVisible(true)} />
                    <EditIcon />
                    <DeleteIcon />
                </ActionButtonsContainer>
            </ClientCard>

            <CreateButton>
                <CreateButtonText>Criar Cliente</CreateButtonText>
            </CreateButton>
               <ModalPicker
                visible={isSelectModalVisible}
                options={options}
                onSelectOption={handleSelectOption}
                onClose={() => setIsSelectModalVisible(false)}
            />
        </Container>
    );
};

export default Card;
