import React from "react";

import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { Container } from "./styles";


export default function Home() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Header />
    </Container>
  );
}

