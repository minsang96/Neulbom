import react from "react";
import { View, Text } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import Breakfast from "./Breakfast";
import Dinner from "./Dinner";
import Lunch from "./Lunch";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Box = styled.View`
  width: 100%;
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DietList = () => {
  const navigation = useNavigation();
  return (
    <>
      <Box>
        <Breakfast></Breakfast>
        <Lunch></Lunch>
        <Dinner></Dinner>
      </Box>
      <ButtonCompo
        buttonName="+ 간식 추가"
        onPressButton={() =>
          navigation.navigate("Stack", { screen: "SnackWrite" })
        }
      ></ButtonCompo>
    </>
  );
};

export default DietList;
