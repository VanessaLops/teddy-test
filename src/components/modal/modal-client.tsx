import React, { useMemo, useEffect, useState, MutableRefObject } from 'react';
import { View, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { Input, Label } from './styles';
import { Title } from 'src/styles';
import { LoginButton } from 'src/screens/login/styles';
import { ButtonText } from '../card-clients-select/styles';
import { createClient, updateClient } from 'src/services/api'; 
import { ModalClientProps } from '../types';



const ModalClient: React.FC<ModalClientProps> = ({
    visible,
    bottomSheetModalRef,
    onClose,
    isEditMode,
    clientData
}) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [salary, setSalary] = useState(0);
    const [companyValue, setCompanyValue] = useState('');

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedSalary, setIsFocusedSalary] = useState(false);
    const [isFocusedCompanyValue, setIsFocusedCompanyValue] = useState(false);

    const snapPoints = useMemo(() => ['14%', '70%'], []);


    useEffect(() => {
        if (visible && isEditMode && clientData) {
            setUserId(clientData.id);
            setName(clientData.name);
            setSalary(clientData.salary);
            setCompanyValue(clientData.companyValuation ?? '');
        }

        if (!visible) {
            setName('');
            setSalary(0);
            setCompanyValue('');
        }

        bottomSheetModalRef?.current?.present();
    }, [visible, isEditMode, clientData, bottomSheetModalRef]);

    const handleCreateClient = async () => {
        if (!name || !salary) {
            Alert.alert("Erro", "Nome e salário são obrigatórios!");
            return;
        }

        const clientData = {
            name,
            salary: Number(salary),
            companyValuation: companyValue ? parseFloat(companyValue) : null,
        };

        try {
            const result = await createClient(clientData);
            if (result) {
                Alert.alert("Sucesso", "Cliente criado com sucesso!");
                onClose();
            } else {
                Alert.alert("Erro", "Não foi possível criar o cliente.");
            }
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            Alert.alert("Erro", "Ocorreu um erro ao criar o cliente.");
        }
    };

    const handleEditClient = async () => {
        if (!name || !salary) {
            Alert.alert("Erro", "Nome e salário são obrigatórios!");
            return;
        }

        const clientData = {
            name,
            salary: Number(salary),
            companyValuation: companyValue ? parseFloat(companyValue) : null,
        };

        try {
            const result = await updateClient(userId,clientData);  
            if (result) {
                Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
                onClose();
            } else {
                Alert.alert("Erro", "Não foi possível atualizar o cliente.");
            }
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
            Alert.alert("Erro", "Ocorreu um erro ao editar o cliente.");
        }
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onDismiss={onClose}
            >
                <BottomSheetView style={{ padding: 20 }}>
                    <Title style={{ color: '#fff', marginBottom: 20 }}>
                        {isEditMode ? 'Editar Cliente' : 'Criar Cliente'}
                    </Title>
                    <View style={{ marginBottom: 20 }}>
                        <Label isFocused={isFocusedName || name.length > 0} style={{ marginBottom: 5, marginTop: 10 }}>Nome</Label>
                        <Input
                            value={name}
                            onFocus={() => setIsFocusedName(true)}
                            onBlur={() => setIsFocusedName(false)}
                            onChangeText={setName}
                            placeholder={!isFocusedName && name === '' ? 'Digite o nome:' : ''}
                            placeholderTextColor="#888"
                        />

                        <Label isFocused={isFocusedSalary || salary > 0} style={{ marginBottom: 5, marginTop: 10 }}>Salário</Label>
                        <Input
                            value={salary}
                            onFocus={() => setIsFocusedSalary(true)}
                            onBlur={() => setIsFocusedSalary(false)}
                            onChangeText={setSalary}
                            placeholder={!isFocusedSalary && salary === 0 ? 'Digite o salário:' : ''}
                            placeholderTextColor="#888"
                            keyboardType="numeric"
                        />

                        <Label isFocused={isFocusedCompanyValue || companyValue.length > 0} style={{ marginBottom: 5, marginTop: 10 }}>
                            Valor da empresa (opcional)
                        </Label>
                        <Input
                            value={companyValue}
                            onFocus={() => setIsFocusedCompanyValue(true)}
                            onBlur={() => setIsFocusedCompanyValue(false)}
                            onChangeText={setCompanyValue}
                            placeholder={!isFocusedCompanyValue && companyValue === '' ? 'Digite o valor:' : ''}
                            placeholderTextColor="#888"
                            keyboardType="numeric"
                        />
                    </View>
                    <LoginButton onPress={isEditMode ? handleEditClient : handleCreateClient}>
                        <ButtonText>{isEditMode ? 'Editar Cliente' : 'Criar Cliente'}</ButtonText>
                    </LoginButton>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

export default ModalClient;
