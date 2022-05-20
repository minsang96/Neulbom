import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { useSelector } from "react-redux";

const WeeklyEat = (props) => {
  // 수정하기-한 주의 기록 꽉 찬 db 이용해서 수정 필요(현정)
  const weeklyDiet = useSelector((state) => state.weeklyReport.weeklyDiet[0]);
  const tableTitle = ["아침", "점심", "저녁", "기록"];
  const tableData = [
    [
      weeklyDiet["monday"]["breakfast"],
      weeklyDiet["tuesday"]["lunch"],
      weeklyDiet["friday"]["breakfast"],
      weeklyDiet["friday"]["breakfast"],
    ],
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
  ];

  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>한 주의 기록</Text>
      <ScrollView style={styles.container} horizontal={true}>
        <Table borderStyle={{ borderWidth: 0 }}>
          {/* Left Wrapper */}
          <TableWrapper style={{ width: 80 }}>
            {/* <Cell data="" style={styles.singleHead} /> */}
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={["월", "화", "수", "목", "금", "토", "일"]}
                style={styles.head}
                heightArr={[120, 120, 120, 120, 120, 120, 120]}
                textStyle={styles.text}
              />
              <Col
                data={tableTitle}
                style={styles.title}
                heightArr={[30, 30, 30, 30]}
                textStyle={styles.titleText}
              ></Col>
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{ flex: 1 }}>
            <Cols
              data={tableData}
              heightArr={[30, 30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </ScrollView>
    </View>
  );
};
export default WeeklyEat;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  singleHead: { width: 80, height: 40, backgroundColor: "#c8e1ff" },
  head: { flex: 1, backgroundColor: "#c8e1ff" },
  title: { flex: 2, backgroundColor: "#f6f8fa" },
  titleText: { textAlign: "center" },
  text: { textAlign: "center" },
  btn: {
    width: 58,
    height: 18,
    marginLeft: 15,
    backgroundColor: "#c8e1ff",
    borderRadius: 2,
  },
  btnText: { textAlign: "center" },
});
