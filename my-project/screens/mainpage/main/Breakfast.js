import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Diet from "../../../components/diets/Diet.js";
import { useSelector } from "react-redux";

const Breakfast = () => {
  const breakfast = useSelector((state) => state.dietdaily.breakfast);
  const total_breakfast = useSelector(
    (state) => state.dietdaily.total_breakfast
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("get new breakfast");
    setLoading(false);
  }, [breakfast]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Diet
          kind="아침"
          kcal={total_breakfast.kcal}
          meal={breakfast}
          total_meal={total_breakfast}
        ></Diet>
      )}
    </View>
  );
};

export default Breakfast;
