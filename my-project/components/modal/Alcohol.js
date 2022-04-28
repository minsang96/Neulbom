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
        <Text style={styles.titleText}>음주 기록</Text>
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

        <Text style={styles.subtitleText}>음주 날짜</Text>
        <Text style={styles.subtitleText}>음주 시간</Text>
        <ButtonCompo buttonName="음주 등록하기"></ButtonCompo>
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
