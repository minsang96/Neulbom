import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-svg-charts";
import * as Progress from "react-native-progress";
import {
  Table,
  TableWrapper,
  Cell,
  Cols,
  Col,
} from "react-native-table-component";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const WeeklyNutrientCompo = (props) => {
  // 탄단지 그래프 그리기
  const data1 = [
    parseInt(props.weeklyNutrient.recommend.carbohydrate),
    parseInt(props.weeklyNutrient.recommend.protein),
    parseInt(props.weeklyNutrient.recommend.fat),
  ];
  const data2 = [
    parseInt(props.weeklyNutrient.intake.carbohydrate),
    parseInt(props.weeklyNutrient.intake.protein),
    parseInt(props.weeklyNutrient.intake.fat),
  ];
  const tandanjiColor = ["#FF6107", "#7ED320", "#FFD302"];
  const pieData = data1
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: tandanjiColor[index],
      },
      key: index,
    }));
  const pieData2 = data2
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: tandanjiColor[index],
      },
      key: index,
    }));

  // 수정하기-계산(현정)

  const element = (before, after) => {
    return (
      <View style={{ alignItems: "center" }}>
        {before - after === 0 ? (
          <Text style={styles.btnText}>0</Text>
        ) : before > after ? (
          <Text style={styles.btnDownText}>▼{before - after}</Text>
        ) : (
          <Text style={styles.btnUpText}>▲{after - before}</Text>
        )}
      </View>
    );
  };

  const circleView = (idx) => {
    return (
      <View
        style={[
          styles.circle,
          idx === 0
            ? { backgroundColor: "#FF6107" }
            : idx === 1
            ? { backgroundColor: "#7ED320" }
            : idx === 2
            ? { backgroundColor: "#FFD302" }
            : idx === 3
            ? { backgroundColor: "#1F77B4" }
            : { backgroundColor: "#FF0E9F" },
        ]}
      ></View>
    );
  };

  const circleText1 = [circleView(0), circleView(1), circleView(2)];
  const tableHead1 = ["탄수화물", "단백질", "지방"];
  const tableData1 = [
    [
      "권장",
      parseInt(props.weeklyNutrient.recommend.carbohydrate),
      parseInt(props.weeklyNutrient.recommend.protein),
      parseInt(props.weeklyNutrient.recommend.fat),
    ],
    [
      `${props.now}`,
      parseInt(props.weeklyNutrient.intake.carbohydrate),
      parseInt(props.weeklyNutrient.intake.protein),
      parseInt(props.weeklyNutrient.intake.fat),
    ],
    [
      " ",
      element(
        parseInt(props.weeklyNutrient.recommend.carbohydrate),
        parseInt(props.weeklyNutrient.intake.carbohydrate)
      ),
      element(
        parseInt(props.weeklyNutrient.recommend.protein),
        parseInt(props.weeklyNutrient.intake.protein)
      ),
      element(
        parseInt(props.weeklyNutrient.recommend.fat),
        parseInt(props.weeklyNutrient.intake.fat)
      ),
      ,
    ],
  ];

  const circleText2 = [circleView(3), circleView(4)];
  const tableHead2 = ["나트륨", "당"];
  const tableData2 = [
    [
      "권장",
      parseInt(props.weeklyNutrient.recommend.natrium),
      ,
      parseInt(props.weeklyNutrient.recommend.sugars),
    ],
    [
      `${props.now}`,
      parseInt(props.weeklyNutrient.intake.natrium),
      ,
      parseInt(props.weeklyNutrient.intake.sugars),
    ],
    [
      " ",
      element(
        parseInt(props.weeklyNutrient.recommend.natrium),
        parseInt(props.weeklyNutrient.intake.natrium)
      ),
      element(
        parseInt(props.weeklyNutrient.recommend.sugars),
        parseInt(props.weeklyNutrient.intake.sugars)
      ),
    ],
  ];

  const sugarsProgress =
    props.weeklyNutrient.intake.sugars / props.weeklyNutrient.recommend.sugars;

  const natriumProgress =
    props.weeklyNutrient.intake.natrium /
    props.weeklyNutrient.recommend.natrium;

  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>영양소 비율</Text>
      <Text style={props.styles.subTitle}>
        권장 섭취 비율과 {props.now} 섭취 비율을 비교해보세요
      </Text>
      <View style={styles.graphView}>
        <View style={styles.graph}>
          <Text style={styles.graphTitle}>권장 섭취 비율</Text>
          <PieChart
            style={{ height: 120, width: 110 }}
            data={pieData}
            innerRadius="70%"
          />
          <View style={styles.calText}>
            <Text style={{ fontSize: 20 }}>
              {parseInt(props.weeklyNutrient.recommend.kcal)}
            </Text>
            <Text>kcal</Text>
          </View>
        </View>
        <View style={styles.graph}>
          <Text style={styles.graphTitle}>{props.now} 섭취 비율</Text>
          <PieChart
            style={{ height: 120, width: 110 }}
            data={pieData2}
            innerRadius="70%"
          />
          <View style={styles.calText}>
            <Text style={{ fontSize: 20 }}>
              {parseInt(props.weeklyNutrient.intake.kcal)}
            </Text>
            <Text>kcal</Text>
          </View>
        </View>
      </View>
      {/* 탄수화물, 단백질, 지방 */}
      <View style={styles.mainView}>
        <Table
          style={{ flexDirection: "row" }}
          borderStyle={{ borderWidth: 0 }}
        >
          <TableWrapper style={{ width: 80 }}>
            <Cell data=" " style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={circleText1}
                textStyle={styles.circle}
                width={15}
                heightArr={[30, 30, 30]}
              />
              <Col
                data={tableHead1}
                style={styles.title}
                heightArr={[30, 30, 30, 30]}
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
      <View style={styles.graphView}>
        <Progress.Bar
          progress={natriumProgress}
          animated={false}
          color="#1F77B4"
          borderColor="rgba(0, 122, 255, 0)"
          unfilledColor="#E2E2E2"
          height={10}
        />
        <Progress.Bar
          progress={sugarsProgress}
          animated={false}
          color="#FF0E9F"
          borderColor="rgba(0, 122, 255, 0)"
          unfilledColor="#E2E2E2"
          height={10}
        />
      </View>
      {/* 나트륨, 당 */}
      <View>
        <View style={styles.mainView}>
          <Table
            style={{ flexDirection: "row" }}
            borderStyle={{ borderWidth: 0 }}
          >
            <TableWrapper style={{ width: 80 }}>
              <Cell data=" " style={styles.singleHead} />
              <TableWrapper style={{ flexDirection: "row" }}>
                <Col
                  data={circleText2}
                  textStyle={styles.circle}
                  width={15}
                  heightArr={[30, 30]}
                />
                <Col
                  data={tableHead2}
                  style={styles.title}
                  heightArr={[30, 30, 30, 30]}
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
      </View>
    </View>
  );
};

export default WeeklyNutrientCompo;

const styles = StyleSheet.create({
  graphView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  graph: {},
  graphTitle: {
    textAlign: "center",
    marginBottom: 10,
  },
  mainView: { marginVertical: 10 },
  singleHead: {
    height: 30,
  },
  text: { margin: 6, textAlign: "center" },
  btnUpText: {
    textAlign: "center",
    color: "red",
    textAlign: "center",
    backgroundColor: "rgba(255,0,0,0.2)",
    borderRadius: 30,
    width: 60,
  },
  btnDownText: {
    textAlign: "center",
    color: "blue",
    textAlign: "center",
    backgroundColor: "rgba(0,56,255,0.2)",
    borderRadius: 30,
    width: 60,
  },
  btnText: {
    textAlign: "center",
    color: "black",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    width: 60,
  },
  timeText: {
    color: "white",
    fontWeight: "bold",
  },
  circle: {
    borderRadius: 30,
    backgroundColor: "black",
    width: 7,
    height: 7,
    alignItems: "center",
  },
  calText: {
    position: "absolute",
    top: screenSize.height * 0.04,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",

    // textAlign: "center",
    // justifyContent: "center",
  },
});
