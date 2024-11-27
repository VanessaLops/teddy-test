import React from "react";
import LogoIcon from "src/assets/icons/logo";
import { Icon } from "react-native-elements";
import { Container, ContainerMain } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <ContainerMain>
        <LogoIcon />
        <Icon
          name="menu"
          color="#7A7A7A"
          size={30}
        />
      </ContainerMain>
    </Container>
  );
};

export default Header;


