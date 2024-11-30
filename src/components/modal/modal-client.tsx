import React, { useMemo, useEffect, useState, MutableRefObject } from 'react';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { Input, Label } from './styles';
import { Title } from 'src/styles';
import { LoginButton } from 'src/screens/login/styles';
import { ButtonText } from '../card-clients-select/styles';

interface ModalClientProps {
    visible: boolean;
    bottomSheetModalRef: MutableRefObject<BottomSheetModal>;
    handlePresentModalPress: () => void;
    onClose: () => void;
}

const ModalClient: React.FC<ModalClientProps> = ({
    visible,
    bottomSheetModalRef,
    handlePresentModalPress,
    onClose
}) => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [companyValue, setCompanyValue] = useState('');

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedSalary, setIsFocusedSalary] = useState(false);
    const [isFocusedCompanyValue, setIsFocusedCompanyValue] = useState(false);

    const snapPoints = useMemo(() => ['25%', '70%'], []);

    useEffect(() => {
        if (visible) {
            bottomSheetModalRef?.current?.present();
        } else {
            bottomSheetModalRef?.current?.dismiss();
        }
    }, [visible, bottomSheetModalRef]);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onDismiss={onClose}
            >
                <BottomSheetView style={{ padding: 20 }}>
                    <Title style={{ color: '#fff', marginBottom: 20 }}>Criar cliente</Title>
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

                        <Label isFocused={isFocusedSalary || salary.length > 0} style={{ marginBottom: 5, marginTop: 10 }}>Salário</Label>
                        <Input
                            value={salary}
                            onFocus={() => setIsFocusedSalary(true)}
                            onBlur={() => setIsFocusedSalary(false)}
                            onChangeText={setSalary}
                            placeholder={!isFocusedSalary && salary === '' ? 'Digite o salário:' : ''}
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
                    <LoginButton>
                        <ButtonText>Criar cliente</ButtonText>
                    </LoginButton>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

export default ModalClient;
