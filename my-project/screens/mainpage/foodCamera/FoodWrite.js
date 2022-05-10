import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import palette from "../../../components/palette";
import { useDispatch, useSelector } from "react-redux";
import { Image, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import imagesSlice from "../../../slices/images";
import UploadMode from "../../../components/modal/UploadMode";
import ButtonCompo from "../../../components/button/ButtonCompo";
import { getInfoAI, recordDiet, uploadS3 } from "../../../api/diets";
import moment from "moment";

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
  const images = useSelector((state) => state.images);
  const [imagesLength, setImagesLength] = useState(0);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState(0);

  useEffect(() => {
    setImagesLength(images.breakfast.length);
    setImageLength(images.add.length);
  }, [images]);

  // 카메라 켜기
  const onCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      saveToPhotos: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // 갤러리에서 사진 고르기 ** 안드로이드 이뮬레이터는 갤러리에 사진이 없으므로 구글에서 다운받아서 쓰면 됨!
  const onGallery = async () => {
    try {
      let result_g = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result_g);

      // 사진이 선택되면, image에 uri 저장
      if (!result_g.cancelled) {
        setImage(result_g.uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("onGallery");
    }
  };

  const d = new Date();

  const yourDate = moment(d, "yyyy-mm-dd").format();
  const formatted = yourDate.split("T")[0];

  // 이미지 업로드 axios 보내는 로직 담아놓았음
  const saveDiet = async () => {
    const frm = new FormData();

    frm.append("file", {
      uri: image,
      type: "multipart/form-data",
      name: image.split("/").slice(-1)[0],
    });
    try {
      const response = await uploadS3(frm);
      // response에 s3 이미지 주소 담겨 있음!
      console.log(response);

      // 아래는 무시. 식단 저장에 쓸 로직임!
      // const diets = [
      //   {
      //     dietDate: formatted,
      //     dietImg: image,
      //     dietTime: "breakfast",
      //     foodAmount: images.add[imageLength - 1].food.foodAmount,
      //     foodCode: images.add[imageLength - 1].food.foodCode,
      //     userSeq: 1,
      //   },
      // ];
      // const response1 = await recordDiet(diets);
      // console.log(response1);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("recordDiet");
    }
  };

  return (
    <>
      <Container style={{ backgroundColor: "white" }}>
        <View>
          {image ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              ></Image>
              {/* <Text>{images.add[imageLength - 1].food.foodName}</Text>
              <Text>{images.add[imageLength - 1].food.foodAmount} g</Text>
              <Text>{images.add[imageLength - 1].food.foodKcal} kcal</Text> */}
            </View>
          ) : (
            <View>
              {imagesLength > 0 ? (
                <View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: images.breakfast[imagesLength - 1].dietImg,
                      }}
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
                      탄수화물
                      {images.breakfast[imagesLength - 1].foodCarbohydrate}
                    </Text>
                    <Text>
                      단백질 {images.breakfast[imagesLength - 1].foodProtein}
                    </Text>
                    <Text>
                      지방 {images.breakfast[imagesLength - 1].foodTransfat}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text>NO IMAGE</Text>
              )}
            </View>
          )}

          {image && (
            <>
              <ButtonCompo
                buttonName="검색하기"
                onPressButton={() =>
                  navigation.navigate("Stack", {
                    screen: "FoodSearch",
                  })
                }
              ></ButtonCompo>
              <ButtonCompo
                buttonName="다시 찍기"
                onPressButton={() => console.log("press 다시 찍기")}
              ></ButtonCompo>
            </>
          )}
          <View>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 50, height: 50 }}
              />
            )}
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
        <ButtonCompo
          buttonName="식단 저장"
          onPressButton={saveDiet}
        ></ButtonCompo>
      </Container>
      <UploadMode
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCamera={onCamera}
        onGallery={onGallery}
      ></UploadMode>
    </>
  );
};

export default FoodWrite;
