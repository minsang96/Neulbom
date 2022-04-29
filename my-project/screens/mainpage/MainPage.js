import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Ad from "./main/Ad";
import DailyDiet from "./main/DailyDiet";
import DietList from "./main/DietList";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import ButtonCompo from "../../components/button/ButtonCompo";
import Stack from "../../navigation/Stack";

const Box = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.ScrollView``;

const MainPage = ({ navigation: { navigate } }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Box>
        <Ad></Ad>
        <DailyDiet></DailyDiet>
        <ButtonCompo
          onPressButton={() => navigate("Stack", { screen: "FoodWrite" })}
          buttonName="+ 혈당 추가"
        ></ButtonCompo>
        <DietList></DietList>
      </Box>
    </Container>
  );
};

export default MainPage;
