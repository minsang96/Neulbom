import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import palette from "../../../components/palette";

const View = styled.View``;
const Text = styled.Text``;
const Plus = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 270px;
  height: 30px;
  width: 30px;
  background-color: ${palette.green};
  border-radius: 30px;
  elevation: 5;
`;
const SnackWrite = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SNACKWrite</Text>
      <Plus onPress={() => navigation.navigate("Stack", { screen: "Two" })}>
        <Text>GO TWO</Text>
      </Plus>
    </View>
  );
};

export default SnackWrite;
