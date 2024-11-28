import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { Container } from "./styles";

import Card from "src/components/card";

export default function Home() {


  const [clientesPorPagina, setClientesPorPagina] = useState("10");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = ["4", "8", "10"];

  const handleSelectOption = (value: string) => {
    setClientesPorPagina(value);
    setIsModalVisible(false);
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Header handleSelectOption={handleSelectOption} />
      <Card
        clientesPorPagina={clientesPorPagina}
        setClientesPorPagina={setClientesPorPagina}
        options={options}
        handleSelectOption={handleSelectOption}
      />
    </Container>
  );
}
