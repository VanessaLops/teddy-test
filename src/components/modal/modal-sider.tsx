import React, { useState, useEffect } from 'react';
import { Modal, Animated, Text, View, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalContent } from './styles';
import HomeIcon from 'src/assets/icons/home';
import ClientsIcon from 'src/assets/icons/clients';
import ProductIcon from 'src/assets/icons/product';
import { SlideUpSidebarModalProps } from '../types';

const SlideUpSidebarModal: React.FC<SlideUpSidebarModalProps> = ({ visible, onSelectOption, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [opacityAnim] = useState(new Animated.Value(0));
  const [selectedItem, setSelectedItem] = useState<string | null>(null);


  const sideNav = [
    {
      name: "Home",
      icon: <HomeIcon />
    },
    {
      name: "Clientes",
      icon: <ClientsIcon />
    },
    {
      name: "Produtos",
      icon: <ProductIcon />
    }
  ];

  const handleSelect = (item: string) => {
    console.log("Item selecionado no modal:", item); 
    setSelectedItem(item);  
    onSelectOption(item);
    onClose(); 
  };
  


  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="none" onRequestClose={onClose}>
      <ModalContainer>
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],  
                }),
              },
            ],
          }}
        >
          <ModalContent>
            {sideNav.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(item.name)}>
                <View
                  style={{
                    flexDirection: "row",
                    width: 350,
                    padding: 10,
                    borderRightWidth: selectedItem === item.name ? 4 : 0,
                    borderRightColor: selectedItem === item.name ? '#EC6724' : 'transparent',
                  }}
                >
                  {selectedItem === item.name ? (
                    React.cloneElement(item.icon, {
                      color: '#EC6724',  
                    })
                  ) : null}
                  <Text style={{ left: 10, color: selectedItem === item.name ? '#EC6724' : 'black' }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ModalContent>
        </Animated.View>
      </ModalContainer>
    </Modal>
  );
};

export default SlideUpSidebarModal;
