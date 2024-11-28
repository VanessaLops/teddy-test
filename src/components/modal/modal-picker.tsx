import React from 'react';
import { FlatList, Modal } from 'react-native';
import { ModalWrapper, ModalBox, Title, ListItem, ItemText } from './styles';

interface ModalPickerProps {
  visible: boolean;
  options: string[];
  onSelectOption: (value: string) => void;
  onClose: () => void;
}

const ModalPicker: React.FC<ModalPickerProps> = ({ visible, options, onSelectOption, onClose }) => {


  const handleSelect = (item: string) => {
    onSelectOption(item); 
    onClose();             
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <ModalWrapper>
        <ModalBox>
          <Title>Selecione a quantidade:</Title>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <ListItem onPress={() => handleSelect(item)}>
                <ItemText>{item}</ItemText>
              </ListItem>
            )}
            keyExtractor={(item) => item}
          />
        </ModalBox>
      </ModalWrapper>
    </Modal>
  );
};

export default ModalPicker;
