
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




// Container principal do modal picker
export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center; 
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalBox = styled.View`
  background-color: white;
  width: 300px; 
  border-radius: 10px;
  padding: 20px; 
  align-items: center; 
  elevation: 5;
  shadow-color: #000
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3; 
  shadow-radius: 4px;
`;


export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px; 
`;


export const ListItem = styled.TouchableOpacity`
  padding-vertical: 12px;
  padding-horizontal: 20px;
  width: 100%;
  border-bottom-width: 1px; 
  border-bottom-color: #ccc; 
  align-items: center; 
`;

export const ItemText = styled.Text`
  font-size: 16px;
  color: #555;
`;
