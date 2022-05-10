import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const TodayReport = (props) => {
  const other = useSelector((state) => state.dailyReport.other);
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>오늘의 기록</Text>
      <View style={styles.items}>
        <View style={styles.item}>
          <Text style={styles.itemName}>커피</Text>
          {other.coffee === "y" ? (
            <Text style={styles.itemCircle}>☕</Text>
          ) : (
            <Text style={styles.itemCircle}>　</Text>
          )}
        </View>
        <View style={styles.item}>
          <Text style={styles.itemName}>음주</Text>

          {other.alcohol === "y" ? (
            <Text style={styles.itemCircle}>🍺</Text>
          ) : (
            <Text style={styles.itemCircle}>　</Text>
          )}
        </View>
        <View style={styles.item}>
          <Text style={styles.itemName}>운동</Text>
          {other.exercise === "y" ? (
            <Text style={styles.itemCircle}>🚲</Text>
          ) : (
            <Text style={styles.itemCircle}>　</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default TodayReport;

const styles = StyleSheet.create({
  items: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: { marginHorizontal: 10 },
  itemName: { textAlign: "center" },
  itemCircle: { backgroundColor: "#E2E2E2", borderRadius: 50, padding: 10 },
});
