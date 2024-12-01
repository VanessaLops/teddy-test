import React from 'react';
import { FlatList, Modal, View, Text, Button, TouchableOpacity } from 'react-native';
import { ModalWrapper, ModalBox, Title, ListItem, ItemText } from './styles';
import { ModalPickerProps } from '../types';

const ModalPicker: React.FC<ModalPickerProps> = ({
  visible,
  type,
  options = [],
  onConfirm,
  onCancel,
  onSelectOption,
  onClose,
}) => {
  const handleSelect = (item: string) => {
    if (onSelectOption) {
      onSelectOption(item);
    }
    onClose();
  };

  const renderPickerContent = () => (
    <FlatList
      data={options}
      renderItem={({ item }) => (
        <ListItem onPress={() => handleSelect(item)}>
          <ItemText>{item}</ItemText>
        </ListItem>
      )}
      keyExtractor={(item) => item}
    />
  );

  const renderConfirmationContent = (title: string, message: string) => (
    <View>
      <Title>{title}</Title>
      <Text>{message}</Text>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <TouchableOpacity
          onPress={onConfirm}
          style={{ padding: 10, backgroundColor: 'transparent' }}
        >
          <Text style={{ color: '#0A84FF' }}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel || onClose}
          style={{ padding: 10, backgroundColor: 'transparent' }}
        >
          <Text style={{ color: '#0A84FF' }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <ModalWrapper>
        <ModalBox>
          {type === 'picker' && (
            <>
              <Title>Selecione uma opção:</Title>
              {renderPickerContent()}
            </>
          )}

          {type === 'create' &&
            renderConfirmationContent(
              'Confirmação de Criação',
              'Tem certeza de que deseja criar este usuário?'
            )}

          {type === 'delete' &&
            renderConfirmationContent(
              'Excluir cliente:',
              'Tem certeza que deseja excluir o cliente Eduardo?'
            )}

          {type === 'update' &&
            renderConfirmationContent(
              'Excluir cliente:',
              'Tem certeza que deseja excluir o cliente Eduardo?'
            )}
        </ModalBox>
      </ModalWrapper>
    </Modal>
  );
};

export default ModalPicker;
