import react from "react";
import { View, Text } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import Breakfast from "./Breakfast";
import Dinner from "./Dinner";
import Lunch from "./Lunch";
import styled from "styled-components/native";
import palette from "../../../components/palette";

const Box = styled.View`
  width: 100%;
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DietList = () => (
  <>
    <Box>
      <Breakfast></Breakfast>
      <Lunch></Lunch>
      <Dinner></Dinner>
    </Box>
    <ButtonCompo props="+ 간식 추가"></ButtonCompo>
  </>
);

export default DietList;
