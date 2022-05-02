import React, { useCallback } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Ad from "./main/Ad";
import DailyDiet from "./main/DailyDiet";
import DietList from "./main/DietList";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import ButtonCompo from "../../components/button/ButtonCompo";
import Stack from "../../navigation/Stack";
import { ReactReduxContext, useDispatch } from "react-redux";
import imagesSlice from "../../slices/images";
import { useSelector } from "react-redux";

const Box = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.ScrollView``;

const MainPage = ({ navigation: { navigate } }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const dispatch = useDispatch();
  const reduxTest = () => {
    dispatch(imagesSlice.actions.add("yayaya"));
    console.log("testing");
  };
  const urls = useSelector((state) => state);
  const reduxIn = () => {
    console.log(urls);
  };
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Box>
        <Ad></Ad>
        <DailyDiet></DailyDiet>
        <ButtonCompo
          onPressButton={() => navigate("Stack", { screen: "FoodWrite" })}
          buttonName="+ 혈당 추가"
        ></ButtonCompo>
        <ButtonCompo
          onPressButton={reduxTest}
          buttonName="redux test"
        ></ButtonCompo>
        <ButtonCompo
          onPressButton={reduxIn}
          buttonName="redux에 뭐가 들어 있을까?"
        ></ButtonCompo>
        <DietList></DietList>
      </Box>
    </Container>
  );
};

export default MainPage;
