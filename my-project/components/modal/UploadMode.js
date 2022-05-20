import React, { useEffect } from "react";
import { Modal, Text } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

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

function UploadMode({ visible, onClose, onCamera, onGallery }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContainer onPress={onClose}>
        <WhiteBox>
          <ActionButtons
            android_ripple={{ color: "#eee" }}
            onPress={() => {
              onCamera();
              onClose();
            }}
          >
            <Text>카메라로 촬영하기</Text>
          </ActionButtons>
          <ActionButtons
            android_ripple={{ color: "#eee" }}
            onPress={() => {
              onGallery();
              onClose();
            }}
          >
            <Text>사진 선택하기</Text>
          </ActionButtons>
        </WhiteBox>
      </ModalContainer>
    </Modal>
  );
}

export default UploadMode;
