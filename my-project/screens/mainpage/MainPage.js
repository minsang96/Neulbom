import React, { useCallback, useEffect, useState } from "react";
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
import moment from "moment";
import AddTodayRecord from "../calendar/calendarTab/component/AddTodayRecord";
import userSlice from "../../slices/user";
import * as Font from "expo-font";

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
  const d = new Date();
  const user = useSelector((state) => state.user);
  const yourDate = moment(d, "yyyy-mm-dd").format();
  const formatted = yourDate.split("T")[0];
  const [isModalVisible, setModalVisible] = useState(false);
  const todayList = ["혈당", "혈압", "술", "커피", "운동"];
  const onPressButton = () => {
    setModalVisible(!isModalVisible);
  };
  // 첫 화면을 그릴 때 일일 영양 섭취량 정보를 리덕스에 저장
  const getMyDiet = async () => {
    try {
      console.log("mainpage checking", user.userSeq);
      const response = await getDiet(formatted, user.userSeq);
      dispatch(dietdailySlice.actions.set_diet(response));
      dispatch(imagesSlice.actions.set(response));
      dispatch(dietdailySlice.actions.set_recommend(response));
    } catch (error) {
      console.log(error);
      console.log("mainpage");
    } finally {
      console.log("diet/daily");
    }
  };

  useEffect(() => {
    getMyDiet();
  }, []);

  useEffect(() => {
    getMyDiet();
  }, [urls]);

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Box>
        <Ad></Ad>
        <DailyDiet></DailyDiet>
        <ButtonCompo
          onPressButton={() => onPressButton()}
          buttonName="오늘의 기록 등록하기"
        ></ButtonCompo>
        <AddTodayRecord
          onPressButton={onPressButton}
          todayList={todayList}
          isModalVisible={isModalVisible}
        ></AddTodayRecord>
        <DietList></DietList>
      </Box>
    </Container>
  );
};

export default MainPage;
