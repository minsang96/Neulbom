import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import palette from "../../../components/palette";
import { useSelector } from "react-redux";
import { Image, FlatList } from "react-native";

const Container = styled.ScrollView``;
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
const FoodWrite = () => {
  const navigation = useNavigation();
  const urls = useSelector((state) => state.images.imageurls);
  const lastnum = urls.length - 1;
  const image = urls[lastnum].imageurls;

  return (
    <Container>
      <View>
        <Text>Write</Text>
        <Plus onPress={() => navigation.navigate("Stack", { screen: "Two" })}>
          <Text>GO TWO</Text>
        </Plus>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        {urls.map((url) => (
          <Image
            key={url.id}
            source={{ uri: url.imageurls }}
            style={{ width: 50, height: 50 }}
          ></Image>
        ))}
      </View>
    </Container>
  );
};

export default FoodWrite;
