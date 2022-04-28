import react from "react";
import { Dimensions } from "react-native";
import Ad from "./main/Ad";
import DailyDiet from "./main/DailyDiet";
import DietList from "./main/DietList";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import ButtonCompo from "../../components/button/ButtonCompo";

const Box = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.ScrollView``;

const Main = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <Container>
      <Box>
        <Ad></Ad>
        <DailyDiet></DailyDiet>
        <ButtonCompo props="+현대 혈당 추가"></ButtonCompo>
        <DietList></DietList>
      </Box>
    </Container>
  );
};

export default Main;
