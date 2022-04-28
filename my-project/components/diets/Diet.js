import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import palette from "../palette";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

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

const Diet = ({ kind, kcal, what, nutritions }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Box>
      <Column>
        <Content style={{ flex: 1 }}>{kind}</Content>
        <Content style={{ color: `${palette.green}` }}>{kcal}</Content>
        <Plus onPress={pickImage}>
          <Ionicons name="add" color="white" size={30} />
        </Plus>
        <View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      </Column>
      <Content>{nutritions}</Content>
    </Box>
  );
};

export default Diet;
