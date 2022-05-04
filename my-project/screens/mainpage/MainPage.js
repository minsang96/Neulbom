import React, { useCallback, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Ad from "./main/Ad";
import DailyDiet from "./main/DailyDiet";
import DietList from "./main/DietList";
import styled from "styled-components/native";
import ButtonCompo from "../../components/button/ButtonCompo";
import { useDispatch, useSelector } from "react-redux";
import imagesSlice from "../../slices/images";
import { getDiet } from "../../api/diets";
import dietdailySlice from "../../slices/dietdaily";

const Box = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.ScrollView``;

const MainPage = ({ navigation: { navigate } }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.images.imageurls);
  const dietdaily = useSelector((state) => state.dietdaily);

  // 첫 화면을 그릴 때 일일 영양 섭취량 정보를 리덕스에 저장
  useEffect(() => {
    const getMyDiet = async () => {
      try {
        const response = await getDiet("2022-04-26", "1");
        // console.log("response", response);
        dispatch(dietdailySlice.actions.set_diet(response));
      } catch (error) {
        console.log(error);
        console.log("mainpage");
      } finally {
        console.log("diet/daily");
      }
    };
    getMyDiet();
  }, []);

  const reduxTest = () => {
    dispatch(imagesSlice.actions.add("yayaya"));
    console.log("testing");
  };

  const reduxIn = useCallback(async () => {
    console.log(dietdaily);
    // console.log(urls);
    // urls.map((url) => console.log(url.imageurls));
    console.log("ip");
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

        {/* <ButtonCompo
          onPressButton={reduxTest}
          buttonName="redux test"
        ></ButtonCompo>
        <ButtonCompo
          onPressButton={reduxIn}
          buttonName="redux에 뭐가 들어 있을까?"
        ></ButtonCompo> */}
        <DietList></DietList>
      </Box>
    </Container>
  );
};

export default MainPage;
