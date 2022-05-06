import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Table,
  TableWrapper,
  Cell,
  Cols,
  Col,
} from "react-native-table-component";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const BloodPressureReport = (props) => {
  // 계산 잘하기
  const compare = 130 - 120;

  const element = () => {
    return (
      <View style={styles.btn}>
        <Text style={styles.btnText}>▲{compare}</Text>
      </View>
    );
  };

  const timeText = (idx) => {
    if (idx === 0) {
      return <Text style={styles.timeText}>아침</Text>;
    } else if (idx === 1) {
      return <Text style={styles.timeText}>점심</Text>;
    } else if (idx === 2) {
      return <Text style={styles.timeText}>저녁</Text>;
    }
  };
  const tableHead = ["최저", "최고"];
  const tableData1 = [
    [
      "어제",
      props.yesterdayBloodPressure.breakfast.BpLow,
      ,
      props.yesterdayBloodPressure.breakfast.BpHigh,
    ],
    [
      "오늘",
      props.todayBloodPressure.breakfast.BpLow,
      props.todayBloodPressure.breakfast.BpHigh,
    ],
    [" ", element(), "-"],
  ];
  const tableData2 = [
    [
      "어제",
      props.yesterdayBloodPressure.lunch.BpLow,
      props.yesterdayBloodPressure.lunch.BpHigh,
    ],
    [
      "오늘",
      props.todayBloodPressure.lunch.BpLow,
      props.todayBloodPressure.lunch.BpHigh,
    ],
    [" ", element(), "-"],
  ];
  const tableData3 = [
    [
      "어제",
      props.yesterdayBloodPressure.dinner.BpLow,
      props.yesterdayBloodPressure.dinner.BpHigh,
    ],
    [
      "오늘",
      props.todayBloodPressure.dinner.BpLow,
      props.todayBloodPressure.dinner.BpHigh,
    ],
    [" ", element(), "-"],
  ];

  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>최근 혈압값 추세</Text>
      <Text style={props.styles.subTitle}>
        전날에 비해 얼마나 좋아졌을까요?
      </Text>
      {/* 아침 */}
      <View style={styles.mainView}>
        <Table style={{ flexDirection: "row" }}>
          <TableWrapper style={{ width: 80 }}>
            <Cell data={timeText(0)} style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={tableHead}
                style={styles.title}
                heightArr={[30, 30, 30, 30]}
                textStyle={styles.titleText}
              ></Col>
            </TableWrapper>
          </TableWrapper>
          <TableWrapper style={{ flex: 1 }}>
            <Cols
              data={tableData1}
              heightArr={[30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
      {/* 점심 */}
      <View>
        <Table style={{ flexDirection: "row" }}>
          <TableWrapper style={{ width: 80 }}>
            <Cell data={timeText(1)} style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={tableHead}
                style={styles.title}
                heightArr={[30, 30, 30, 30]}
                textStyle={styles.titleText}
              ></Col>
            </TableWrapper>
          </TableWrapper>
          <TableWrapper style={{ flex: 1 }}>
            <Cols
              data={tableData2}
              heightArr={[30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
      {/* 저녁 */}
      <View>
        <Table style={{ flexDirection: "row" }}>
          <TableWrapper style={{ width: 80 }}>
            <Cell data={timeText(2)} style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={tableHead}
                style={styles.title}
                heightArr={[30, 30, 30, 30]}
                textStyle={styles.titleText}
              ></Col>
            </TableWrapper>
          </TableWrapper>
          <TableWrapper style={{ flex: 1 }}>
            <Cols
              data={tableData3}
              heightArr={[30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    </View>
  );
};

export default BloodPressureReport;

const styles = StyleSheet.create({
  mainView: { marginVertical: 10 },
  singleHead: {
    backgroundColor: "#09BC8A",
    borderRadius: 10,
    marginHorizontal: 10,
    height: 30,
    alignItems: "center",
  },
  titleText: { textAlign: "center" },
  text: { margin: 6, textAlign: "center" },
  btn: {
    backgroundColor: "rgba(255,0,0,0.2)",
    borderRadius: 30,
    marginHorizontal: screenSize.width * 0.03,
  },
  btnText: { textAlign: "center", color: "red" },
  timeText: {
    color: "white",
    fontWeight: "bold",
  },
});
