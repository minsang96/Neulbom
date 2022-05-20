import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
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
import { getMemberInfo } from "../../../api/getUserInfo";
import axios from "axios";
import userSlice from "../../../slices/user";
import UploadMode from "../../../components/modal/UploadMode";
import * as ImagePicker from "expo-image-picker";
import userImageSlice from "../../../slices/updateUser";

const screenSize = Dimensions.get("screen");

const UserMypageUpdate = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSeq = useSelector((state) => state.user.userSeq);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigation = useNavigation();
  const [memberHeight, setMemberHeight] = useState(userInfo.memberHeight);
  const [memberWeight, setMemberWeight] = useState(userInfo.memberWeight);
  const [memberDesc, setMemberDesc] = useState(userInfo.memberDesc);
  const [memberImg, setMemberImg] = useState(userInfo.memberImg);
  const [BPColor, setBPColor] = useState(userInfo.setting.bloodPressure);
  const [BSColor, setBSColor] = useState(userInfo.setting.bloodSugar);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const updateUserInfo = async () => {
    const data = {
      desc: memberDesc,
      height: memberHeight,
      img: memberImg,
      setting: {
        bloodPressure: BPColor,
        bloodSugar: BSColor,
      },
      userSeq: userSeq,
      weight: memberWeight,
    };

    try {
      await axios.post("https://k6a104.p.ssafy.io/api/member/modify", data, {
        headers: {
          Authorization: accessToken,
        },
      });

      const response = await getMemberInfo(accessToken, userSeq);
      dispatch(userSlice.actions.setUserInfo(response.data));
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

      // 사진이 선택되면, image에 uri 저장
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
        <Text style={styles.title}>키</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setMemberHeight(text);
          }}
        >
          {memberHeight}
        </TextInput>
        <Text style={styles.title}>몸무게</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setMemberWeight(text);
          }}
        >
          {memberWeight}
        </TextInput>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>건강 수치</Text>
        <View style={styles.boxRow}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: BPColor === true ? "#09BC8A" : "white" },
            ]}
            onPress={() => {
              // clickBP(settingList);
              setBPColor(!BPColor);
            }}
          >
            <Text
              style={{
                color: BPColor === true ? "white" : "black",
                fontSize: 16,
              }}
            >
              혈압
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: BSColor === true ? "#09BC8A" : "white" },
            ]}
            onPress={() => {
              // clickBS(settingList);
              setBSColor(!BSColor);
            }}
          >
            <Text
              style={{
                color: BSColor === true ? "white" : "black",
                fontSize: 16,
              }}
            >
              혈당
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>질병 소개</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setMemberDesc(text);
          }}
        >
          {memberDesc}
        </TextInput>
      </View>
      <ButtonCompo
        buttonName="수정 완료"
        onPressButton={() => {
          updateUserInfo();
          navigation.navigate("Mypage");
          props.onClick();
          saveImageAxios();
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

export default UserMypageUpdate;

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
  changingText: { fontSize: 16, color: "#09BC8A", marginVertical: 5 },
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
