import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { Container } from "./styles";
import CardClientSelect from "src/components/card-clients-select";
import CardProduct from "src/components/card-products";
import Card from "src/components/card-clients";
import SlideUpSidebarModal from "src/components/modal/modal-sider";

export default function Home() {
  const [currentCard, setCurrentCard] = useState<string>("home");
  const [clientesPorPagina, setClientesPorPagina] = useState("10");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [clientsToDisplay, setClientsToDisplay] = useState<any[]>([]);


  const [selectedClients, setSelectedClients] = useState<any[]>([]);

  const options = ["4", "8", "10"];

  const handleSelectOption = (value: string) => {
    setClientesPorPagina(value);
  };

  const handleChangeCard = (card: string) => {
    console.log("Card selecionado:", card);
    setCurrentCard(card);
    setIsModalVisible(false);
  };


  const handleAddClient = (client: any) => {
    setSelectedClients((prevSelectedClients) => [...prevSelectedClients, client]);
  };


  useEffect(() => {
    console.log("currentCard alterado para:", currentCard);
  }, [currentCard]);

  const renderCardContent = () => {

    switch (currentCard) {
      case "Clientes":
        return (
          <CardClientSelect
            clientesPorPagina={clientesPorPagina}
            setClientesPorPagina={setClientesPorPagina}
            options={options}
            handleSelectOption={handleSelectOption}
            clientsToDisplay={clientsToDisplay}
            onAddClient={handleAddClient}
          />
        );
      case "Produtos":
        return (
          <CardProduct
            clientesPorPagina={clientesPorPagina}
            setClientesPorPagina={setClientesPorPagina}
            options={options}
            handleSelectOption={handleSelectOption}
            clientsToDisplay={clientsToDisplay}
            onAddClient={handleAddClient}
          />
        );
      case "Home":
      default:
        return (
          <Card
            clientesPorPagina={clientesPorPagina}
            setClientesPorPagina={setClientesPorPagina}
            options={options}
            handleSelectOption={handleSelectOption}
            clientsToDisplay={clientsToDisplay}
            onAddClient={handleAddClient}
          />
        );
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Header handleSelectOption={handleChangeCard} />

      <SlideUpSidebarModal
        visible={isModalVisible}
        onSelectOption={handleChangeCard}
        onClose={() => setIsModalVisible(false)}
      />

      {renderCardContent()}
    </Container>
  );
}
