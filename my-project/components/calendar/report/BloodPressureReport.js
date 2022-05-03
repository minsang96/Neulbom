import React, { useCallback, useEffect, useState } from "react";
import dailyReportSlice from "../../../slices/dailyReport";
import { Text, View, StyleSheet } from "react-native";
import {
  Table,
  TableWrapper,
  Cell,
  Cols,
  Col,
} from "react-native-table-component";
import { Dimensions } from "react-native";
import { getDailyBloodpressure } from "../../../api/reports";
import { useDispatch, useSelector } from "react-redux";

const screenSize = Dimensions.get("screen");

const BloodPressureReport = (props) => {
  // dispatch부터 해보고 안되면... 이렇게 하자...
  // const [result, setResult] = useState({
  //   breakfast: { BpHigh: "", BpLow: "" },
  //   lunch: { BpHigh: "", BpLow: "" },
  //   dinner: { BpHigh: "", BpLow: "" },
  // });

  //리덕스 쓰는 방법을 모르겠다,, ㅋㅋ
  useEffect(() => {
    const getDailyBloodpressureResult = async () => {
      try {
        const response = await getDailyBloodpressure("2022-04-26", 1);
        // console.log("------");
        // console.log(response);
        // setBreakfast(response.today.breakfast);
        reduxTest(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDailyBloodpressureResult();
  }, []);

  const dispatch = useDispatch();
  const reduxTest = (props) => {
    dispatch(dailyReportSlice.actions.add(props));
  };
  const result = useSelector(
    (state) => state.dailyReport.todayBloodPressure[0].todayBloodPressure
  );

  // useEffect(() => {
  // const getDailyBloodpressureResult = async () => {
  //   try {
  //     const response = await getDailyBloodpressure("2022-04-26", 1);
  //     console.log("------");
  //     console.log(response);
  //     setResult(response.today);
  //     // setBreakfast(response.today.breakfast);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //   getDailyBloodpressureResult();
  // }, []);

  // 계산 잘하기
  const beforeEat = 130 - 120;

  const element = () => {
    return (
      <View style={styles.btn}>
        <Text style={styles.btnText}>▲{beforeEat}</Text>
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
  // const tableData1 = [
  //   ["어제", result.today.breakfast.BpLow, "-"],
  //   ["오늘", result.today.breakfast.BpHigh, "-"],
  //   [" ", element(), "-"],
  // ];
  // const tableData2 = [
  //   ["어제", result.today.lunch.BpLow, "-"],
  //   ["오늘", result.today.lunch.BpHigh, "-"],
  //   [" ", element(), "-"],
  // ];
  // const tableData3 = [
  //   ["어제", result.today.dinner.BpLow, "-"],
  //   ["오늘", result.today.dinner.BpHigh, "-"],
  //   [" ", element(), "-"],
  // ];
  const tableData1 = [
    ["어제", "", "-"],
    ["오늘", "", "-"],
    [" ", element(), "-"],
  ];
  const tableData2 = [
    ["어제", "", "-"],
    ["오늘", "", "-"],
    [" ", element(), "-"],
  ];
  const tableData3 = [
    ["어제", "", "-"],
    ["오늘", "", "-"],
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
