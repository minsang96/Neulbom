import Modal from "react-native-modal";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompo from "../button/ButtonCompo";

// isSecModalVisible로 통일
const Alcohol = (props) => {
  // console.log(props);
  return (
    <Modal
      isVisible={props.isSecModalVisible}
      style={styles.bottomModal}
      swipeDirection="down"
      onSwipeComplete={() => {
        props.onPressSecButton();
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.titleText}>혈압</Text>
        <Ionicons
          name="close"
          size={24}
          color="#09BC8A"
          style={styles.closeIcon}
          onPress={() => {
            props.onPressSecButton();
            props.onPressButton();
          }}
        />

        <Text style={styles.subtitleText}>측정 날짜</Text>
        <Text style={styles.subtitleText}>측정 시간</Text>
        <Text style={styles.subtitleText}>측정 시점 선택</Text>
        <Text style={styles.subtitleText}>최고 혈압</Text>
        <TextInput
          style={styles.input}
          placeholder="최고 혈압을 입력하세요"
        ></TextInput>
        <Text style={styles.subtitleText}>최저 혈압</Text>
        <TextInput
          style={styles.input}
          placeholder="최저 혈압을 입력하세요"
        ></TextInput>
        <ButtonCompo buttonName="혈압 등록하기"></ButtonCompo>
      </View>
    </Modal>
  );
};

export default Alcohol;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(229,229,229,0.5)",
    padding: 10,
    marginHorizontal: 25,
    borderRadius: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    paddingVertical: 25,
    color: "#09BC8A",
  },
  closeIcon: {
    position: "absolute",
    top: 27,
    right: 10,
  },
  subtitleText: { textAlign: "center", fontSize: 16, padding: 15 },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
});
