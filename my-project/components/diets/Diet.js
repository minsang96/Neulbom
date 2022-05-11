import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import styled from "styled-components/native";
import palette from "../palette";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationContext } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import imagesSlice from "../../slices/images";
import UploadMode from "../modal/UploadMode";

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Box = styled.View`
  flex: 1;
  align-items: center;
  margin: 10px 20px;
  background-color: ${palette.gray};
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 10px;
`;

const Content = styled.Text`
  color: ${palette.navy};
  padding: 10px 15px;
`;

const Plus = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 270px;
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
        <Text>{current}</Text>
        <Column>
          <Content style={{ flex: 1 }}>{kind}</Content>
          <Content style={{ color: `${palette.green}` }}>{kcal} kcal</Content>

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
        {meal.map((food) => (
          <Box key={food.dietSeq}>
            <Text>{food.foodName}</Text>
            <Image
              source={{ uri: food.dietImg }}
              style={{ width: 55, height: 55 }}
            ></Image>
          </Box>
        ))}
        <Content>탄수화물 {total_meal.carbohydrate}g</Content>
        <Content>단백질 {total_meal.protein}g</Content>
        <Content>지방 {total_meal.fat}g</Content>
        <Content>나트륨 {total_meal.natrium}mg</Content>
        <Content>당 {total_meal.sugars}mg</Content>
      </Box>
    </>
  );
};

export default Diet;
