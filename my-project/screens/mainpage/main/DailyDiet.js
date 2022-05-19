import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import palette from "../../../components/palette";
import { useQuery } from "react-query";
import { getDiet } from "../../../api/diets";
import { useDispatch, useSelector } from "react-redux";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const DailyDiet = () => {
  const [loading, setLoading] = useState(true);
  const [calorieProgress, setCalorieProgress] = useState(0);
  const [natriumProgress, setNatriumProgress] = useState(0);
  const [sugarsProgress, setSugarsProgress] = useState(0);
  const [carbohydrateProgress, setCarbohydrateProgress] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [fatProgress, setFatProgress] = useState(0);
  const dietdaily = useSelector((state) => state.dietdaily.total);
  const recommend = useSelector((state) => state.dietdaily.recommend);
  // console.log("짠", recommend.carbohydrate);
  // console.log("짠짠", recommend["carbohydrate"]);

  useEffect(() => {
    setLoading(false);
    if (dietdaily.length !== 0 && recommend["carbohydrate"] !== undefined) {
      setCalorieProgress(dietdaily[0].total.kcal / recommend.kcal);
      setNatriumProgress(dietdaily[0].total.natrium / recommend.natrium);
      setSugarsProgress(dietdaily[0].total.sugars / recommend.sugars);
      setCarbohydrateProgress(
        dietdaily[0].total.carbohydrate / recommend.carbohydrate
      );
      setProteinProgress(dietdaily[0].total.protein / recommend.protein);
      setFatProgress(dietdaily[0].total.fat / recommend.fat);
    }
  }, [dietdaily]);

  // console.log(dietdaily);

  // const totalQuery = useQuery(["diet", dietDate, userSeq], () =>
  //   getDiet(dietDate, userSeq)
  // );
  // if (!totalQuery.data) {
  //   return <Spinner size="large"></Spinner>;
  // }
  // console.log(totalQuery);

  // const natirumProgress = dietdaily[0].total.natrium / recommend.natrium;
  // const sugarsProgress = dietdaily[0].total.sugars / recommend.sugars;
  // const carbohydrateProgress =
  //   dietdaily[0].total.carbohydrate / recommend.carbohydrate;
  // const proteinProgress = dietdaily[0].total.protein / recommend.protein;
  // const fatProgress = dietdaily[0].total.fat / recommend.fat;

  return (
    <>
      <Text style={{ fontSize: 18, marginTop: 10, fontFamily: "SeoulNamsanB" }}>
        일일 영양 섭취량 🥗
      </Text>
      <View style={styles.Box2}>
        {loading ? (
          <Text style={{ fontFamily: "SeoulNamsanEB" }}>Loading...</Text>
        ) : (
          dietdaily.map((diet) => (
            <View key={diet.id}>
              <View style={styles.flexDirection}>
                <Text style={styles.title}>총 칼로리</Text>
                <Text style={styles.content}>
                  {parseInt(diet.total.kcal)}kcal / {recommend.kcal}kcal
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Progress.Bar
                  // progress={diet.total.kcal / recommend.kcal}
                  progress={calorieProgress}
                  animated={false}
                  color="#09BC8A"
                  borderColor="rgba(0, 122, 255, 0)"
                  unfilledColor="#E2E2E2"
                  height={10}
                  width={screenSize.width * 0.82}
                />
              </View>
              <View
                style={[
                  styles.flexDirection,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View>
                  <View style={styles.flexDirection}>
                    <Text style={styles.subTitle}>나트륨</Text>
                    <Text style={styles.content}>
                      {parseInt(diet.total.natrium)}mg / {recommend.natrium}mg
                    </Text>
                  </View>
                  <Progress.Bar
                    // progress={diet.total.natrium / recommend.natrium}
                    progress={natriumProgress}
                    animated={false}
                    color="#FB8F67"
                    borderColor="rgba(0, 122, 255, 0)"
                    unfilledColor="#E2E2E2"
                    height={10}
                    width={screenSize.width * 0.385}
                  />
                </View>
                <View style={{ marginLeft: screenSize.width * 0.045 }}>
                  <View style={[styles.flexDirection]}>
                    <Text style={styles.subTitle}>당</Text>
                    <Text style={styles.content}>
                      {parseInt(diet.total.sugars)}g /{" "}
                      {parseInt(recommend.sugars)}g
                    </Text>
                  </View>
                  <Progress.Bar
                    // progress={diet.total.sugars / recommend.sugars}
                    progress={sugarsProgress}
                    animated={false}
                    color="#FB8F67"
                    borderColor="rgba(0, 122, 255, 0)"
                    unfilledColor="#E2E2E2"
                    height={10}
                    width={screenSize.width * 0.385}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.flexDirection,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View>
                  <Text style={styles.subTitle}>탄수화물</Text>
                  <Progress.Bar
                    // progress={diet.total.carbohydrate / recommend.carbohydrate}
                    progress={carbohydrateProgress}
                    animated={false}
                    color="#F8E16C"
                    borderColor="rgba(0, 122, 255, 0)"
                    unfilledColor="#E2E2E2"
                    height={10}
                    width={screenSize.width * 0.25}
                  />
                  <Text style={styles.content}>
                    {parseInt(diet.total.carbohydrate)}g /{" "}
                    {recommend.carbohydrate}g
                  </Text>
                </View>
                <View>
                  <Text style={styles.subTitle}>단백질</Text>
                  <Progress.Bar
                    // progress={diet.total.protein / parseInt(recommend.protein)}
                    progress={proteinProgress}
                    animated={false}
                    color="#F8E16C"
                    borderColor="rgba(0, 122, 255, 0)"
                    unfilledColor="#E2E2E2"
                    height={10}
                    width={screenSize.width * 0.25}
                  />
                  <Text style={styles.content}>
                    {parseInt(diet.total.protein)}g /{" "}
                    {parseInt(recommend.protein)}g
                  </Text>
                </View>
                <View>
                  <Text style={styles.subTitle}>지방</Text>

                  <Progress.Bar
                    // progress={diet.total.fat / recommend.fat}
                    progress={fatProgress}
                    animated={false}
                    color="#F8E16C"
                    borderColor="rgba(0, 122, 255, 0)"
                    unfilledColor="#E2E2E2"
                    height={10}
                    width={screenSize.width * 0.25}
                  />
                  <Text style={styles.content}>
                    {parseInt(diet.total.fat)}g / {parseInt(recommend.fat)}g
                  </Text>
                </View>
              </View>
            </View>
          ))

          // <Content>총칼로리 {dietdaily[0].total.kcal}</Content>
        )}
      </View>
    </>
  );
};

export default DailyDiet;

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  title: {
    marginLeft: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    fontFamily: "SeoulNamsanB",
  },
  subTitle: {
    marginTop: screenSize.height * 0.01,
    marginLeft: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    fontSize: 12,
    fontFamily: "SeoulNamsanB",
  },
  content: {
    marginLeft: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    color: "#7A7A7A",
    fontSize: 10,
    fontFamily: "SeoulNamsanB",
  },
  Box2: {
    width: screenSize.width * 0.9,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
  },
});
