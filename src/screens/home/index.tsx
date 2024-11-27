import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";

import Header from "../../components/header";


export default function Home() {
  

  return (
    <Container>
        <StatusBar style="auto" />
      <Header />
   
    
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  // background-color: red;
  height: 100%;
`;
