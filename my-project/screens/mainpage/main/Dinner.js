import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Diet from "../../../components/diets/Diet";
import { useSelector } from "react-redux";

const Dinner = () => {
  const dinner = useSelector((state) => state.dietdaily.dinner);
  const total_dinner = useSelector((state) => state.dietdaily.total_dinner);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("get new breakfast");
    setLoading(false);
  }, [dinner]);
  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Diet
          kind="저녁"
          kcal={total_dinner.kcal}
          meal={dinner}
          total_meal={total_dinner}
        ></Diet>
      )}
    </View>
  );
};

export default Dinner;
