import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import palette from "../palette";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationContext } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import imagesSlice from "../../slices/images";
import UploadMode from "../modal/UploadMode";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const Column = styled.View`
  flex-direction: row;
  width: 90%;
`;

const Box = styled.View`
  margin: 10px 20px;
  background-color: ${palette.gray};
  padding: 10px 15px;
  border-radius: 10px;
`;

const Content = styled.Text`
  color: ${palette.navy};
  padding: 10px 15px;
  font-family: SeoulNamsanEB;
`;

const Plus = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: ${screenSize.width * 0.75};
  height: 30px;
  width: 30px;
  background-color: ${palette.green};
  border-radius: 30px;
  elevation: 5;
`;

const Diet = ({ kind, current, kcal, meal, total_meal }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const getMealDetail = async () => {
    console.log("getMealDetail");
    navigation.navigate("Stack", {
      screen: "FoodWrite",
      params: { current: current },
    });
  };

  return (
    <>
      <Box>
        <Column>
          <Content style={{ flex: 1, fontSize: 18 }}>{kind}</Content>
          <Content style={{ color: `${palette.green}` }}>
            {parseInt(kcal)} kcal
          </Content>

          <Plus onPress={getMealDetail}>
            <Ionicons name="add" color="white" size={30} />
          </Plus>
        </Column>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {image && (
            <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />
          )}
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: "row",
          }}
        >
          {meal.length !== 0 ? (
            meal.map((food) => (
              <Image
                key={food.dietSeq}
                source={{ uri: food.dietImg }}
                style={{ width: 55, height: 55, borderRadius: 10, margin: 3 }}
              ></Image>
            ))
          ) : (
            <View
              style={{
                width: screenSize.width * 0.82,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: `${palette.navy}`,
                  fontFamily: "SeoulNamsanL",
                }}
              >
                아직 등록된 식단이 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.line} />
        <View style={styles.box}>
          <View style={styles.whiteCircle}>
            <Text style={styles.text}>탄수화물</Text>
            <Text style={styles.numberText}>
              {parseInt(total_meal.carbohydrate)}g
            </Text>
          </View>
          <View style={styles.whiteCircle}>
            <Text style={styles.text}>단백질</Text>
            <Text style={styles.numberText}>
              {parseInt(total_meal.protein)}g
            </Text>
          </View>
          <View style={styles.whiteCircle}>
            <Text style={styles.text}>지방</Text>
            <Text style={styles.numberText}>{parseInt(total_meal.fat)}g</Text>
          </View>
          <View style={styles.whiteCircle}>
            <Text style={styles.text}>나트륨</Text>
            <Text style={styles.numberText}>
              {parseInt(total_meal.natrium)}mg
            </Text>
          </View>
          <View style={styles.whiteCircle}>
            <Text style={styles.text}>당</Text>
            <Text style={styles.numberText}>
              {parseInt(total_meal.sugars)}g
            </Text>
          </View>
        </View>
      </Box>
    </>
  );
};

export default Diet;

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: screenSize.width * 0.8,
  },
  text: {
    color: `${palette.navy}`,
    textAlign: "center",
    fontSize: 9,
    fontFamily: "SeoulNamsanL",
  },
  numberText: {
    color: `${palette.navy}`,
    textAlign: "center",
    fontSize: 11,
    fontFamily: "SeoulNamsanEB",
  },
  whiteCircle: {
    backgroundColor: "white",
    width: screenSize.width * 0.13,
    height: screenSize.width * 0.13,
    justifyContent: "center",
    borderRadius: 50,
    elevation: 5,
  },
  line: {
    borderBottomColor: `${palette.green}`,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
