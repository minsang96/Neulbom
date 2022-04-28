import React, { useState } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { Agenda } from "react-native-calendars";

const WeeklyReport = () => {
  const [items, setItems] = useState({
    "2017-05-16": [{ name: "item 1 - any js object" }],
    "2017-05-23": [{ name: "item 2 - any js object", height: 80 }],
    "2017-05-24": [],
    "2017-05-25": [
      { name: "item 3 - any js object" },
      { name: "any js object" },
    ],
  });

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => Alert.alert(item.name)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => r1.name !== r2.name;

  return (
    <View>
      <Text>hey</Text>
      <Agenda
        items={items}
        selected="2017-05-16"
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
    </View>
  );
};

export default WeeklyReport;
