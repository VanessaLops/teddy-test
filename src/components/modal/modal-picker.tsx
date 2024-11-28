import React from 'react';
import { FlatList, Modal } from 'react-native';
import { ModalContainer, ModalContent, ModalTitle, ModalItem, ModalItemText } from './styles';

interface ModalPickerProps {
    visible: boolean;
    options: string[];
    onSelectOption: (value: string) => void;
    onClose: () => void;
}

const ModalPicker: React.FC<ModalPickerProps> = ({ visible, options, onSelectOption, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <ModalContainer>
                <ModalContent>
                    <ModalTitle>Selecione a quantidade:</ModalTitle>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (
                            <ModalItem onPress={() => onSelectOption(item)}>
                                <ModalItemText>{item}</ModalItemText>
                            </ModalItem>
                        )}
                        keyExtractor={(item) => item}
                    />
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

export default ModalPicker;
