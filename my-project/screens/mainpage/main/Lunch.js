import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Diet from "../../../components/diets/Diet";
import { useSelector } from "react-redux";

const Lunch = () => {
  const lunch = useSelector((state) => state.dietdaily.lunch);
  const total_lunch = useSelector((state) => state.dietdaily.total_lunch);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("get new breakfast");
    setLoading(false);
  }, [lunch]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Diet
          kind="점심"
          current="lunch"
          kcal={total_lunch.kcal}
          meal={lunch}
          total_meal={total_lunch}
        ></Diet>
      )}
    </View>
  );
};

export default Lunch;
