import React, { useCallback, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Ad from "./main/Ad";
import DailyDiet from "./main/DailyDiet";
import DietList from "./main/DietList";
import styled from "styled-components/native";
import ButtonCompo from "../../components/button/ButtonCompo";
import { useDispatch } from "react-redux";
import imagesSlice from "../../slices/images";
import { useSelector } from "react-redux";
import { getDiet } from "../../api/diets";

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
  const urls = useSelector((state) => state.images.imageurls);
  const reduxIn = useCallback(async () => {
    // console.log(urls);
    // urls.map((url) => console.log(url.imageurls));
    console.log("ip");
    try {
      const response = await getDiet("2022-04-26", "1");
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("diet/daily");
    }
  });

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
