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
import {
  analyzeDiet,
  recordDiet,
  removeDiet,
  uploadS3,
} from "../../../api/diets";
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
const PlusDiet = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 320px;
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
  const user = useSelector((state) => state.user);
  const [analyze, setAnalyze] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImagesLength(images[current].length);
    setImageLength(images.add.length);

    if (images[current].length == 0) {
      setData(false);
      setModalVisible(true);
    }

    return () => {
      dispatch(imagesSlice.actions.clear());
    };
  }, []);

  useEffect(() => {
    setImagesLength(images[current].length);
    setImageLength(images.add.length);
    if (images.add > 0 || images[current] > 0) {
      setData(true);
    }
  }, [images]);

  // 카메라 켜기
  const onCamera = async () => {
    setLoading(true);
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
      const frm = new FormData();

      const addimage = {
        uri: result.uri,
        type: "multipart/form-data",
        name: result.uri.split("/").slice(-1)[0],
      };
      frm.append("file", addimage);

      try {
        const response = await analyzeDiet(user.userSeq, frm);
        console.log("인식결과!!", response);
        const tempFood = response.data;
        if (response.message == "음식 분석 실패, 음식 검색을 이용하세요.") {
          setRecognize(false);
          setLoading(false);
          setImageError(true);
        } else {
          setLoading(false);
          const food = response.data;
          dispatch(imagesSlice.actions.add({ food, current }));
          setRecognize(true);
          setAnalyze(response.data);
        }
      } catch (error) {
        console.log("인식 error", error);
      }
    }
  };

  // 갤러리에서 사진 고르기 ** 안드로이드 이뮬레이터는 갤러리에 사진이 없으므로 구글에서 다운받아서 쓰면 됨!
  const onGallery = async () => {
    setLoading(true);
    try {
      let result_g = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(result_g);

      // 사진이 선택되면, image에 uri 저장
      if (!result_g.cancelled) {
        setImage(result_g.uri);
        dispatch(imagesSlice.actions.addImageUrls(result_g.uri));

        const frm = new FormData();
        const addimage = {
          uri: result_g.uri,
          type: "multipart/form-data",
          name: result_g.uri.split("/").slice(-1)[0],
        };
        frm.append("file", addimage);

        try {
          const response = await analyzeDiet(user.userSeq, frm);
          console.log("인식결과!!", response);
          const tempFood = response.data;
          if (response.message == "음식 분석 실패, 음식 검색을 이용하세요.") {
            setRecognize(false);
            setLoading(false);
            // setImageError(true);
          } else {
            setLoading(false);
            const food = response.data;
            dispatch(imagesSlice.actions.add({ food, current }));
            setRecognize(true);
            setAnalyze(response.data);
          }
        } catch (error) {
          console.log("인식 error", error);
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
      const response = await uploadS3(frm, user.userSeq);
      console.log("s3", response);
      dispatch(imagesSlice.actions.addS3url(response.data.data));
      const result = images.add.map((foodInfo, idx) => {
        return {
          dietDate: formatted,
          dietImg: response.data.data[idx],
          dietTime: current,
          foodAmount: foodInfo.food.foodAmount,
          foodCode: foodInfo.food.foodCode,
          userSeq: user.userSeq,
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
      console.log("왜안돼,,", images.add);
      if (images.remove.length !== 0) {
        const response2 = await removeDiet(
          user.userSeq,
          user.accessToken,
          images.remove
        );
        console.log(response2);
      }
      if (images.imageurls.length !== 0) {
        console.log("saveImage");
        const response = await saveImage();
        // console.log(response.data);
        if (images.add.length !== 0) {
          const response1 = await recordDiet(response);
          console.log(response1);
        }
      }
      navigation.navigate("식단관리");
    } catch (error) {
      console.log(error);
      console.log(images);
    } finally {
      console.log("saveImage");
    }
  };

  const onPress = () => {
    console.log(images);
  };

  const onDelete = (idx) => {
    dispatch(imagesSlice.actions.remove(imageLength - idx));
    setImage(null);
  };

  const onDeleteDB = (dietSeq, idx) => {
    dispatch(imagesSlice.actions.removeDB({ current, dietSeq }));
  };

  return (
    <>
      <Container style={{ backgroundColor: "white" }}>
        <Pressable onPress={onPress}>
          <Text>Checking redux</Text>
        </Pressable>
        <View>
          <>
            {image ? (
              <>
                <Text>이미지 있음</Text>
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
                {loading ? (
                  <Text>Loading...</Text>
                ) : recognize ? (
                  <>
                    <Text>{analyze.foodName}</Text>
                    <Text>{analyze.foodAmount}g(1인분)</Text>
                    <View>
                      <ButtonCompo buttonName="섭취량 변경"></ButtonCompo>
                    </View>
                    <Text>칼로리 {analyze.foodKcal} kcal</Text>
                    <Text>나트륨 {analyze.foodNatrium} mg</Text>
                    <Text>당류 {analyze.foodSugars} mg</Text>
                    <Text>탄수화물 {analyze.foodCarbohydrate} g</Text>
                    <Text>단백질 {analyze.foodProtein} g</Text>
                    <Text>지방 {analyze.foodFat} g</Text>
                  </>
                ) : (
                  <>
                    <Text>이미지 있고 인식 실패</Text>
                    {images.tempFood.length > 0 ? (
                      <>
                        <View>
                          <Text>{images.tempFood.slice(-1)[0].foodName}</Text>
                          {/* <Text>{images.add.slice(-1)[0].food.foodAmount}</Text> */}
                          <Text>(1인분)</Text>
                        </View>

                        <View>
                          <ButtonCompo buttonName="섭취량 변경"></ButtonCompo>
                        </View>
                      </>
                    ) : (
                      <>
                        <Text>음식을 인식할 수 없습니다</Text>
                        <Text>
                          아래 검색하기 버튼을 눌러 음식 정보를 저장하세요!
                        </Text>
                      </>
                    )}
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
              <Text>아무 사진도 없습니다.</Text>
            )}
          </>

          {image && (
            <>
              <ButtonCompo
                buttonName="검색하기"
                onPressButton={() =>
                  navigation.navigate("Stack", {
                    screen: "FoodSearch",
                    params: { current: current },
                  })
                }
              ></ButtonCompo>
            </>
          )}
          <View>
            {images.imageurls
              .slice(0)
              .reverse()
              .map((food, idx) => (
                <View key={food.id}>
                  <Image
                    source={{ uri: food.imageurl }}
                    style={{ width: 50, height: 50 }}
                  ></Image>
                  <Plus
                    style={{ marginRight: 5 }}
                    onPress={() => {
                      onDelete(idx);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color: "white",
                      }}
                    >
                      -
                    </Text>
                  </Plus>
                </View>
              ))}
            {images[current]
              .slice(0)
              .reverse()
              .map((food, idx) => (
                <View key={food.dietSeq}>
                  <Image
                    source={{ uri: food.dietImg }}
                    style={{ width: 50, height: 50 }}
                  ></Image>
                  <Plus
                    style={{ marginRight: 5 }}
                    onPress={() => {
                      onDeleteDB(food.dietSeq, idx);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color: "white",
                      }}
                    >
                      -
                    </Text>
                  </Plus>
                </View>
              ))}
            <PlusDiet
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text>+</Text>
            </PlusDiet>
          </View>
        </View>
        <View>
          <Text>{current} 섭취량</Text>
          <Text>칼로리: {images[`total_${current}`].kcal} kcal</Text>
          <Text>나트륨: {images[`total_${current}`].natrium} mg</Text>
          <Text>당류: {images[`total_${current}`].sugars} g</Text>
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
