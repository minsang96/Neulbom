import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import palette from "../../../components/palette";
import { useDispatch, useSelector } from "react-redux";
import { Image, FlatList, Pressable } from "react-native";
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
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const [imagesLength, setImagesLength] = useState(0);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLength, setImageLength] = useState(0);
  const [recognize, setRecognize] = useState(true);
  const [diets, setDiets] = useState([]);
  const [data, setData] = useState(true);
  const current = useNavigationState((state) => state.routes[0].params.current);

  useEffect(() => {
    console.log("current", current);
    console.log("current", images[current][imagesLength - 1]);
    if (images[current].length == 0) {
      setData(false);
      setModalVisible(true);
    }
    return () => dispatch(imagesSlice.actions.clear());
  }, []);
  useEffect(() => {
    setImagesLength(images.breakfast.length);
    setImageLength(images.add.length);
    if (images.add > 0 || images[current] > 0) {
      setData(true);
    }
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
      dispatch(imagesSlice.actions.addImageUrls(result.uri));

      // 음식 인식 api 호출
      const response = await getInfoAI();
      if (!response) {
        setRecognize(false);
      }
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
        dispatch(imagesSlice.actions.addImageUrls(result_g.uri));
        const response = await getInfoAI();
        if (!response) {
          setRecognize(false);
        }
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

  const saveImage = async () => {
    try {
      const frm = new FormData();
      images.imageurls.map((myimage) => {
        const addimage = {
          uri: myimage.imageurl,
          type: "multipart/form-data",
          name: myimage.imageurl.split("/").slice(-1)[0],
        };
        frm.append("file", addimage);
      });
      // 배열에 담아져 옴
      const response = await uploadS3(frm);
      dispatch(imagesSlice.actions.addS3url(response.data.data));
      const result = images.add.map((foodInfo, idx) => {
        return {
          dietDate: formatted,
          dietImg: response.data.data[idx],
          dietTime: "breakfast",
          foodAmount: foodInfo.food.foodAmount,
          foodCode: foodInfo.food.foodCode,
          userSeq: 1,
        };
      });
      setDiets(result);
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("saveImage");
    }
  };

  // 이미지 업로드 axios 보내는 로직
  const saveDiet = async () => {
    try {
      const response = await saveImage();
      const response1 = await recordDiet(response);
      console.log(response1);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("saveImage");
    }
  };
  const onPress = () => {
    console.log(images);
  };

  return (
    <>
      <Container style={{ backgroundColor: "white" }}>
        <Pressable onPress={onPress}>
          <Text>Checking redux</Text>
        </Pressable>
        <View>
          {image ? (
            <>
              <Text>이미지 잇음</Text>
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
              </View>
              {recognize ? (
                <>
                  <Text>이미지 있고 인식 성공</Text>
                  <Text>인식 성공!</Text>
                </>
              ) : (
                <>
                  <Text>이미지 있고 인식 실패</Text>
                  <Text>음식을 인식할 수 없습니다</Text>
                </>
              )}
            </>
          ) : !data ? (
            <>
              <Text>이미지 없고 데이터 없음</Text>
              <Text>아무것도 없음. 로딩 X</Text>
            </>
          ) : imagesLength > 0 ? (
            <>
              <Text>이미지 없고 데이터 있음</Text>

              <View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>{current}</Text>
                  <Image
                    source={{
                      uri: images[current][imagesLength - 1].dietImg,
                    }}
                    style={{ width: 200, height: 200 }}
                  />
                  <Text>{images[current][imagesLength - 1].foodName}</Text>
                  <Text>
                    {images[current][imagesLength - 1].foodAmount}g (
                    {Math.round(
                      images[current][imagesLength - 1].dietAmount /
                        images[current][imagesLength - 1].foodAmount
                    )}
                    인분)
                  </Text>
                  <Text>
                    칼로리 {images[current][imagesLength - 1].foodKcal}
                  </Text>
                  <Text>
                    나트륨 {images[current][imagesLength - 1].foodNatrium}
                  </Text>
                  <Text>
                    당류 {images[current][imagesLength - 1].foodSugars}
                  </Text>
                  <Text>
                    탄수화물
                    {images[current][imagesLength - 1].foodCarbohydrate}
                  </Text>
                  <Text>
                    단백질 {images[current][imagesLength - 1].foodProtein}
                  </Text>
                  <Text>
                    지방 {images[current][imagesLength - 1].foodTransfat}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text>아무것도 없어</Text>
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
            {/* {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 50, height: 50 }}
              />
            )} */}
            {images.imageurls.map((food) => (
              <Image
                key={food.id}
                source={{ uri: food.imageurl }}
                style={{ width: 50, height: 50 }}
              ></Image>
            ))}
            {images[current].map((food) => (
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
        <View>
          <Text>{current} 섭취 량</Text>
          <Text>{images[`total_${current}`].kcal} kcal</Text>
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
