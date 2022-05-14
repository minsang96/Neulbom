import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Notice = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate("Notice1")}>
          첫번째 공지사항
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate("Notice1")}>
          두번째 공지사항(수정중)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Notice;
