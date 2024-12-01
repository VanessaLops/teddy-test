import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { Container } from "./styles";
import CardClientSelect from "src/components/card-clients-select";
import CardProduct from "src/components/card-products";
import Card from "src/components/card-clients";
import SlideUpSidebarModal from "src/components/modal/modal-sider";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../login";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const [currentCard, setCurrentCard] = useState<string>("home");
  const [clientesPorPagina, setClientesPorPagina] = useState("10");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientsToDisplay, setClientsToDisplay] = useState<any[]>([]);
  const [selectedClients, setSelectedClients] = useState<any[]>([]);

  console.log(selectedClients)
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const options = ["4", "8", "10"];

  const handleSelectOption = (value: string) => {
    setClientesPorPagina(value);
  };

  const handleChangeCard = (card: string) => {
    console.log("Card selecionado:", card);
    setCurrentCard(card);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const savedClients = await AsyncStorage.getItem("selectedClient");
        if (savedClients) {
          setSelectedClients(JSON.parse(savedClients));
        }
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };

    loadClients();
  }, []);

  useEffect(() => {
    const saveClients = async () => {
      try {
        await AsyncStorage.setItem("selectedClient", JSON.stringify(selectedClients)); 
      } catch (error) {
        console.error("Erro ao salvar clientes:", error);
      }
    };

    saveClients();
  }, [selectedClients]);

  const handleAddClient = (client: any) => {
    setSelectedClients((prevSelectedClients) => {
      const isClientSelected = prevSelectedClients.some((c) => c.id === client.id);

      let updatedClients;
      if (isClientSelected) {
        updatedClients = prevSelectedClients.filter((c) => c.id !== client.id);
      } else {
        updatedClients = [...prevSelectedClients, client];
      }

  
      AsyncStorage.setItem("selectedClient", JSON.stringify(updatedClients));

      return updatedClients;
    });
  };

  const handleNavigateToClients = () => {
    navigation.navigate('Clientes', { clients: selectedClients });
  };

  const renderCardContent = () => {
    switch (currentCard) {
      case "Clientes":
        return (
          <CardClientSelect
            clientesPorPagina={clientesPorPagina}
            setClientesPorPagina={setClientesPorPagina}
            options={options}
            handleSelectOption={handleSelectOption}
            clientsToDisplay={selectedClients}
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
            onAddClient={handleAddClient}    />
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
