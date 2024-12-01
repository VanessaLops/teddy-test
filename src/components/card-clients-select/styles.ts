import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
`;


export const TitleText = styled.Text`
  font-size: 18px;
`;


export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const LabelText = styled.Text`
  margin-right: 10px;
  font-size: 18px;
`;


export const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #d9d9d9;
  border-radius: 4px;
  height: 25px;
  width: 50px;
  justify-content: center;
  padding-horizontal: 10px;
`;


export const ButtonText = styled.Text`
  font-size: 16px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
`;


export const ModalContent = styled.View`
  background-color: #f5f5f5;
  border-radius: 4px;
  width: 80%;
  height: 184px;
  padding: 10px;
`;


export const ModalTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
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


export const ClientCard = styled.View`
  width: 300px;
  background-color: white;
  margin-top: 20px;
  padding: 20px;
  align-items: start;
  justify-content: center;
  align-self: center;
  flex-wrap: wrap;
`;


export const ClientName = styled.Text`
  font-size: 18px;
  margin-bottom: 2px;
  text-align: center;
`;


export const ClientDetails = styled.Text`
  font-size: 14px;
  margin-bottom: 2px;
  text-align: center;
`;


export const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;


export const CreateButton = styled.TouchableOpacity`
  margin-top: 20px;
  width: 320px;
  border-color: #ec6724;
  border-width: 2px;
  border-radius: 4px;
  padding-vertical: 12px;
  align-items: center;
  justify-content: center;
`;


export const CreateButtonText = styled.Text`
  font-size: 16px;
  color: #ec6724;
  text-align: center;
`;



export const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom:20px;
`;


export const PageButton = styled.TouchableOpacity<{ selected: boolean }>`
  margin: 0 5px;
  padding: 10px;
  background-color: ${({ selected }) => (selected ? '#EC6724' : 'transparent')};
  border-radius: 4%;
  border: 1px solid #EC6724;
  height:35px;
  widht:35px;
`;


export const PageNumber = styled.Text<{ selected: boolean }>`
  font-size: 12px;
  color: ${({ selected }) => (selected ? '#fff' : '#EC6724')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;