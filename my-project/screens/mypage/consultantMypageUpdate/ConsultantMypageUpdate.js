import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import { useDispatch, useSelector } from "react-redux";
import UploadMode from "../../../components/modal/UploadMode";
import * as ImagePicker from "expo-image-picker";
import userImageSlice from "../../../slices/updateUser";
import axios from "axios";
import { getExpertInfo } from "../../../api/getUserInfo";
import userSlice from "../../../slices/user";

const screenSize = Dimensions.get("screen");

const ConsultantMypageUpdate = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSeq = useSelector((state) => state.user.userSeq);
  const accessToken = useSelector((state) => state.user.accessToken);
  const careerList = useSelector((state) => state.user.userInfo.expertCareer);
  const [memberImg, setMemberImg] = useState(userInfo.expertImg);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expertDesc, setExpertDesc] = useState(userInfo.expertDesc);
  const [career, setCareer] = useState("");
  const [careerUpdateList, setCareerUpdateList] = useState([]);
  const navigation = useNavigation();

  // 수정하기-data, 삭제, input 기능(현정)
  const dispatch = useDispatch();
  const updateUserInfo = async () => {
    const data = {
      career: careerUpdateList[0],
      desc: expertDesc,
      expertImg: memberImg,
      userSeq: userSeq,
    };

    try {
      await axios.post("https://k6a104.p.ssafy.io/api/expert/modify", data, {
        headers: {
          Authorization: accessToken,
        },
      });

      const response = await getExpertInfo(accessToken, userSeq);
      dispatch(userSlice.actions.setUserInfo(response.data));
      // dispatch(userSlice.actions.setUserInfo(response.data.career));
    } catch (err) {
      console.log(err);
    }
  };
  const onCamera = async () => {
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      saveToPhotos: true,
    });

    if (!result.cancelled) {
      setMemberImg(result.uri);
      dispatch(userImageSlice.actions.addImageUrls(result.uri));
    }
  };

  const onGallery = async () => {
    setLoading(true);
    try {
      let result_g = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(result_g.uri);

      if (!result_g.cancelled) {
        setMemberImg(result_g.uri);

        const frm = new FormData();
        const addimage = {
          uri: result_g.uri,
          type: "multipart/form-data",
          name: result_g.uri.split("/").slice(-1)[0],
        };
        frm.append("file", addimage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async () => {
    try {
      const frm = new FormData();
      const addimage = {
        uri: memberImg,
        type: "multipart/form-data",
        name: memberImg,
      };
      frm.append("file", addimage);
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지 업로드 axios 보내는 로직
  const saveImageAxios = async () => {
    try {
      if (memberImg !== null) {
        await saveImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.background}>
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Image source={{ uri: memberImg }} style={styles.image}></Image>
        <Text
          style={styles.changingText}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          사진 변경
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>한 줄 소개</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setExpertDesc(text);
          }}
        >
          {expertDesc}
        </TextInput>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>이력 사항</Text>
        {careerList.map((data, index) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text key={index}>{data.careerContent}</Text>
            {/* <Text>X</Text> */}
            {/* 삭제하기(현정) */}
          </View>
        ))}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.InputBox}
            onChangeText={(text) => {
              setCareer(text);
            }}
          ></TextInput>
          <Text
            style={styles.uploadText}
            onPress={() => {
              setCareerUpdateList((oldList) => [...oldList, [career]]);
              dispatch(
                userSlice.actions.setUpdateCareer({ careerContent: career })
              );
            }}
          >
            추가
          </Text>
        </View>
      </View>
      <ButtonCompo
        buttonName="수정 완료"
        onPressButton={() => {
          updateUserInfo();
          navigation.navigate("ConsultantMypage");
          props.onClick();
          saveImageAxios;
        }}
      ></ButtonCompo>
      <UploadMode
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCamera={onCamera}
        onGallery={onGallery}
      ></UploadMode>
    </ScrollView>
  );
};

export default ConsultantMypageUpdate;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    borderRadius: 10,
    elevation: 3,
  },
  boxRow: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    marginVertical: screenSize.height * 0.01,
    marginLeft: screenSize.width * 0.01,
  },
  titleInputBox: {
    borderColor: "black",
    borderBottomWidth: 1,
    width: screenSize.width * 0.75,
    marginLeft: screenSize.width * 0.01,
    fontSize: 16,
    paddingBottom: 2,
  },
  InputBox: {
    borderColor: "black",
    borderBottomWidth: 1,
    width: screenSize.width * 0.68,
    marginLeft: screenSize.width * 0.01,
    fontSize: 16,
    paddingBottom: 2,
  },
  changingText: {
    fontSize: 16,
    color: "#09BC8A",
    marginVertical: 5,
    textAlign: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#09BC8A",
    marginVertical: 5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#09BC8A",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width:
      Dimensions.get("screen").width / 2 -
      Dimensions.get("screen").width * 0.15,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
  },
});
