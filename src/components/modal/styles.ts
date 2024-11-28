import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: #fff;
  width: 100%;
  padding: 20px;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  height:100%;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;


export const ModalItem = styled.TouchableOpacity`
  padding: 8px;
  border-bottom-width: 1px;
  border-color: #d9d9d9;
`;


export const ModalItemText = styled.Text`
  font-size: 18px;
`;

export const SidebarItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

