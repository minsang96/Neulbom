import react from "react";
import { View, Text } from "react-native";
import Diet from "../../../components/diets/Diet";
import { useQuery } from "react-query";
import { getLaunch } from "../../../api/diets";
import styled from "styled-components/native";

const Spinner = styled.ActivityIndicator`
  flex: 1;
  color: black;
`;
const Lunch = () => {
  // const dietDate = "2022-04-26";
  // const userSeq = "1";
  // const lunchQuery = useQuery(["diet", dietDate, userSeq], () =>
  //   getLaunch(dietDate, userSeq)
  // );
  // if (!lunchQuery.data) {
  //   return <Spinner size="large"></Spinner>;
  // }
  return (
    <View>
      <Diet
        kind="점심이요"
        kcal="572Kcal"
        what="234"
        nutritions="탄수화물, 단백질"
      ></Diet>
    </View>
  );
};

export default Lunch;
