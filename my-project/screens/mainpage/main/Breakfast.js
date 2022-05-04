import react from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import Diet from "../../../components/diets/Diet.js";
import { getBreakfast } from "../../../api/diets.js";
import styled from "styled-components/native";

const Spinner = styled.ActivityIndicator`
  flex: 1;
  color: black;
`;
const Breakfast = () => {
  // const dietDate = "2022-04-26";
  // const userSeq = "1";
  // const breakfastQuery = useQuery(["diet", dietDate, userSeq], () =>
  //   getBreakfast(dietDate, userSeq)
  // );
  // if (!breakfastQuery.data) {
  //   return <Spinner size="large"></Spinner>;
  // }
  // console.log("breakfast", breakfastQuery);
  return (
    <View>
      <Diet
        kind="아침"
        kcal="123"
        what="234"
        nutritions="탄수화물, 단백질"
      ></Diet>
    </View>
  );
};

export default Breakfast;
