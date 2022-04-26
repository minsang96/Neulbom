import React from "react";
import { LocaleConfig } from "react-native-calendars";
import { Text, View } from "react-native";
import CalendarCompo from "../../../components/calendar/CalendarCompo";
import ButtonCompo from "../../../components/button/ButtonCompo";

const CalendarTab = () => {
  return (
    <View>
      <CalendarCompo></CalendarCompo>
      <ButtonCompo></ButtonCompo>
    </View>
  );
};

export default CalendarTab;
