import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import palette from "../../../components/palette";
import { useQuery } from "react-query";
import { getDiet } from "../../../api/diets";
import { useDispatch, useSelector } from "react-redux";

const StyledView = styled.View`
  border-width: 1;
  border-radius: 2;
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 2.0;
  shadow-radius: 2;
  elevation: 1;
  margin-left: 5;
  margin-right: 5;
  margin-bottom: 10;
`;

const Content = styled.Text`
  color: ${palette.navy};
  font-size: 18px;
  padding: 10px 15px;
`;

const SubContent = styled.Text`
  color: ${palette.navy};
  font-size: 12px;
  padding: 5px 15px;
`;

const Box = styled.View`
  width:90%
  background_color: white;
  padding: 10px 15px;
  margin: 10px;
  margin-top: 20px;
  border-radius: 10px;
  elevation: 3;
`;

const Spinner = styled.ActivityIndicator`
  flex: 1;
  color: black;
`;
const DailyDiet = () => {
  const dietDate = "2022-04-26";
  const userSeq = "1";
  const [loading, setLoading] = useState(true);
  const dietdaily = useSelector((state) => state.dietdaily.total);

  useEffect(() => {
    setLoading(false);
  }, [dietdaily]);

  // const totalQuery = useQuery(["diet", dietDate, userSeq], () =>
  //   getDiet(dietDate, userSeq)
  // );
  // if (!totalQuery.data) {
  //   return <Spinner size="large"></Spinner>;
  // }
  // console.log(totalQuery);

  return (
    <>
      <Text>일일 영양 섭취량</Text>
      <Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          dietdaily.map((diet) => (
            <Box key={diet.id}>
              <Content>총 칼로리 {diet.total.kcal}</Content>
              <SubContent>나트륨 {diet.total.natrium}</SubContent>
              <SubContent>당 {diet.total.sugars}</SubContent>
              <SubContent>탄수화물 {diet.total.carbohydrate}</SubContent>
              <SubContent>단백질 {diet.total.protein}</SubContent>
              <SubContent>지방 {diet.total.fat}</SubContent>
            </Box>
          ))
          // <Content>총칼로리 {dietdaily[0].total.kcal}</Content>
        )}
      </Box>
    </>
  );
};

export default DailyDiet;
