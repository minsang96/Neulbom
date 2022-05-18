import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import ConsultantCard from '../../../components/chat/ConsultantCard'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatSlice from '../../../slices/chat'

const ConsultantList = () => {
  const dispatch = useDispatch();
  const consultants = useSelector(state => state.chat.consultants)
  const chatList = useSelector((state) => state.chat.chatList);

  console.log('Redux ChatList:', chatList)
  const getConsultantList = async() => {
    try {
      const res = await axios.get('https://k6a104.p.ssafy.io/api/consulting/expert')
      // console.log(res.data.data)
      dispatch(chatSlice.actions.setConsultants(res.data.data))
    } catch(error) {
      console.log(error)
      // Alert.alert('알림', 'email 혹은 패스워드가 틀립니다.');
    } finally {

    }
  }

  console.log(consultants)
  useEffect(() => {
    console.log('Page: ConsultantList')
    getConsultantList()
  }, [])
  useEffect(() => {

  }, [])
  return (
    <FlatList
    style={styles.container}
    horizontal={false}
    numColumns={2}
    ItemSeparatorComponent={
      Platform.OS !== 'android' &&
      (({ highlighted }) => (
        <View
        style={[
          style.separator,
          highlighted && { marginLeft: 0 }
        ]}
        />
        ))
      }
      data={consultants}
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      renderItem={({ item, index, separators }) => (
        // data={[{item}, {item2}, {item3}]}
        <ConsultantCard consultantInfo={item}
          // key={item.userSeq}
        />
        )}
    />
  )
}

export default ConsultantList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: '2%'
  }
})