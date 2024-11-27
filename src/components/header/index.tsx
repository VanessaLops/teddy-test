import React from "react";
import {  View } from "react-native";

import styled from "styled-components/native";
import LogoIcon from "src/assets/icons/logo";
import { Icon } from "react-native-elements";

const Header: React.FC = () => {
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1
        }}
      >
        <LogoIcon />
        <Icon
          name="menu"
          color="#7A7A7A"
          size={30}
        />
      </View>
    </Container>
  );
};

export default Header;

export const Container = styled.View`
  height: 60px; 
  width: 100%; 
  padding-left:20px;
  padding-right:20px;
`;
