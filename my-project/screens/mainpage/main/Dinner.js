import React from "react";
import { View, Text } from "react-native";
import Diet from "../../../components/diets/Diet";
import { useQuery } from "react-query";
import { getDinner } from "../../../api/diets";
import styled from "styled-components/native";

const Spinner = styled.ActivityIndicator`
  flex: 1;
  color: black;
`;
const Dinner = () => {
  // const dietDate = "2022-04-26";
  // const userSeq = "1";
  // const dinnerQuery = useQuery(["diet", dietDate, userSeq], () =>
  //   getDinner(dietDate, userSeq)
  // );
  // if (!dinnerQuery.data) {
  //   return <Spinner size="large"></Spinner>;
  // }
  return (
    <View>
      <Diet
        kind="저녁"
        kcal="572Kcal"
        what="234"
        nutritions="탄수화물, 단백질"
      ></Diet>
    </View>
  );
};

export default Dinner;
