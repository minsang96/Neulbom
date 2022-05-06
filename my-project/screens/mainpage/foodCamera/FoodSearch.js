import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import palette from "../../../components/palette";
import { TextInput } from "react-native-gesture-handler";
import { searchDiet } from "../../../api/diets";
import { Pressable } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";

const View = styled.View``;
const Text = styled.Text``;
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

const Line = styled.View`
  border: 1px solid;
`;
const ActionButtons = styled.Pressable`
  padding: 16px;
  justify-content: center;

  background-color: white;
`;
const FoodSearch = () => {
  const navigation = useNavigation();
  const [foodName, setFoodName] = useState("");
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [select, setSelect] = useState("white");
  const onSearch = async (text) => {
    try {
      const response = await searchDiet(text);
      setFoods(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("FoodSearch.js");
    } finally {
      console.log("diet/search");
    }
  };
  const onChangeFoodName = useCallback((text) => {
    setFoodName(text);
    onSearch(text);
  });

  const onSelect = () => {};
  return (
    <View>
      <Text>검색하기</Text>
      <TextInput
        placeholder="검색하기"
        value={foodName}
        onChangeText={onChangeFoodName}
        onSubmitEditing={onSearch}
      />
      <Line></Line>
      {loading ? (
        <Text>검색어를 입력해주세요!</Text>
      ) : (
        foods.map((food) => (
          <ActionButtons
            key={food.foodSeq}
            android_ripple={{ color: `${palette.green}` }}
            onPress={() => console.log(food)}
          >
            <Text>
              {food.foodName} ({food.foodKcal} kcal)
            </Text>
          </ActionButtons>
        ))
      )}
      <ButtonCompo buttonName="선택한 음식 추가"></ButtonCompo>
    </View>
  );
};

export default FoodSearch;
