import React, { useState } from "react";
import LogoIcon from "src/assets/icons/logo";
import { Icon } from "react-native-elements";
import { Container, ContainerMain } from "./styles";
import SlideUpSidebarModal from "../modal/modal-add";

interface HeaderProps {
  handleSelectOption: (value: string) => void; 
}

const Header: React.FC<HeaderProps> = ({ handleSelectOption }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  return (
    <Container>
      <ContainerMain>
        <LogoIcon />
        <Icon
          name="menu"
          color="#7A7A7A"
          size={30}
          onPress={() => setIsAddModalVisible(true)}
        />
      </ContainerMain>

  
      <SlideUpSidebarModal
        visible={isAddModalVisible}
        onSelectOption={handleSelectOption}  
        onClose={() => setIsAddModalVisible(false)}
      />
    </Container>
  );
};

export default Header;
