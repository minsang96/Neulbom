import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import palette from "../palette";

const windowWidth = Dimensions.get("window").width;
const screenSize = Dimensions.get("screen");

function ConsultantCard(props) {
  // const ConsultantCard = ({ navigation: { navigate } }) => {
  const navigation = useNavigation();
  const cardWidth = windowWidth / 2;
  const imgWidth = (cardWidth * 50) / 100;
  const consultantInfo = props.consultantInfo;
  return (
    <TouchableOpacity
      style={{ ...styles.box }}
      onPress={() => navigation.navigate("ConsultantInfo", consultantInfo)}
    >
      <Image
        source={{ uri: consultantInfo.expertImg }}
        style={{ ...styles.img, width: imgWidth, height: imgWidth }}
      ></Image>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "700",
          margin: "1%",
          fontFamily: "SeoulNamsanM",
          color: `${palette.navy}`,
        }}
      >
        {consultantInfo.expertName}
      </Text>
      <Text
        style={{
          textAlign: "center",
          width: "85%",
          fontSize: 13,
          lineHeight: 20,
          fontFamily: "SeoulNamsanEB",
          color: `${palette.navy}`,
        }}
      >
        #{consultantInfo.expertDesc}
      </Text>
    </TouchableOpacity>
  );
}

export default ConsultantCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
  },

  img: {
    borderRadius: 5000,
  },
  box: {
    alignItems: "center",
    backgroundColor: "white",
    width: screenSize.width * 0.45,
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    borderRadius: 15,
    elevation: 3,
  },
});
