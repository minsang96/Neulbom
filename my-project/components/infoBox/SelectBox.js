import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";

const SelectBox = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [userInfo]);

  return (
    <View>
      {loading === true ? (
        <Text>loading...</Text>
      ) : (
        <View style={props.styles.boxRow}>
          <View
            style={[
              styles.button,
              {
                backgroundColor:
                  userInfo.setting.bloodPressure === true ? "#09BC8A" : "white",
              },
            ]}
          >
            <Text
              style={{
                color:
                  userInfo.setting.bloodPressure === true ? "white" : "black",
                fontSize: 16,
              }}
            >
              혈압
            </Text>
          </View>
          <View
            style={[
              styles.button,
              {
                backgroundColor:
                  userInfo.setting.bloodSugar === true ? "#09BC8A" : "white",
              },
            ]}
          >
            <Text
              style={{
                color: userInfo.setting.bloodSugar === true ? "white" : "black",
                fontSize: 16,
              }}
            >
              혈당
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
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
