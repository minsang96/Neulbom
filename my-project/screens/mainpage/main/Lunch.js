import react from "react";
import { View, Text } from "react-native";
import Diet from "../../../components/diets/Diet";

const Lunch = () => (
  <View>
    <Diet
      kind="점심이요"
      kcal="572Kcal"
      what="족발, 떡볶이"
      nutritions="탄수화물, 단백질"
    ></Diet>
  </View>
);

export default Lunch;
