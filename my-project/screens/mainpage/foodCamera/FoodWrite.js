import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import palette from "../../../components/palette";
import { useDispatch, useSelector } from "react-redux";
import { Image, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import imagesSlice from "../../../slices/images";
import UploadMode from "../../../components/modal/UploadMode";

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
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const [imagesLength, setImagesLength] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(images.breakfast.length);
  useEffect(() => {
    setImagesLength(images.breakfast.length);
  }, [images]);
  console.log(images.imageurls);
  const onCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      saveToPhotos: true,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      dispatch(imagesSlice.actions.add(result.uri));
    }
    // navigation.navigate("Stack", { screen: "FoodWrite" });
  };

  return (
    <>
      <Container>
        <View>
          <View>
            {imagesLength > 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: images.breakfast[imagesLength - 1].dietImg }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>{images.breakfast[imagesLength - 1].foodName}</Text>
                <Text>
                  {images.breakfast[imagesLength - 1].foodAmount}g (
                  {Math.round(
                    images.breakfast[imagesLength - 1].dietAmount /
                      images.breakfast[imagesLength - 1].foodAmount
                  )}
                  인분)
                </Text>
                <Text>
                  칼로리 {images.breakfast[imagesLength - 1].foodKcal}
                </Text>
                <Text>
                  나트륨 {images.breakfast[imagesLength - 1].foodNatrium}
                </Text>
                <Text>
                  당류 {images.breakfast[imagesLength - 1].foodSugars}
                </Text>
                <Text>
                  탄수화물 {images.breakfast[imagesLength - 1].foodCarbohydrate}
                </Text>
                <Text>
                  단백질 {images.breakfast[imagesLength - 1].foodProtein}
                </Text>
                <Text>
                  지방 {images.breakfast[imagesLength - 1].foodTransfat}
                </Text>
              </View>
            ) : (
              <Text>NO IMAGE</Text>
            )}
          </View>
          <View>
            {images.breakfast.map((food) => (
              <Image
                key={food.dietSeq}
                source={{ uri: food.dietImg }}
                style={{ width: 50, height: 50 }}
              ></Image>
            ))}
            <Plus
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text>+</Text>
            </Plus>
          </View>
        </View>
      </Container>
      <UploadMode
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCamera={onCamera}
      ></UploadMode>
    </>
  );
};

export default FoodWrite;
