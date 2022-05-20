import React, { useCallback, useState } from "react";
import { Modal, Text } from "react-native";
import styled from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ModalContainer = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.View`
  background-color: white;
  width: 300px;
  border-radius: 20px;
  elevation: 2;
`;

const ActionButtons = styled.Pressable`
  padding: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

function AmountMode({ visible, onClose, setAmount }) {
  const navigate = useNavigation();
  const [foodAmount, setFoodAmount] = useState("");
  const onChangeFoodAmount = useCallback((text) => {
    setFoodAmount(text);
  });

  const onSelect = async () => {
    setAmount(Number(foodAmount));
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContainer onPress={onClose}>
        <WhiteBox>
          <ActionButtons>
            <Text>섭취량 입력하기</Text>
          </ActionButtons>
          <ActionButtons android_ripple={{ color: "#eee" }}>
            <TextInput
              placeholder="섭취량 1인분의 몇 배 인지 적어주세요"
              value={foodAmount}
              onChangeText={onChangeFoodAmount}
            />
          </ActionButtons>
          <ActionButtons
            onPress={() => {
              //   onGallery();
              onSelect();
              onClose();
              setFoodAmount("");
            }}
          >
            <Text>저장하기</Text>
          </ActionButtons>
        </WhiteBox>
      </ModalContainer>
    </Modal>
  );
}

export default AmountMode;
