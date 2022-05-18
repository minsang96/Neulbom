import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import ChatRoom from '../../screens/chat/chatroom/ChatRoom'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";
import { useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChatCard(props) {
  console.log('-----------------------------------------------------')
  console.log('Page: ChatCard')
  const navigation = useNavigation();
  const cardWidth = windowWidth*98/100
  const cardHeight = windowHeight*15/100
  const imgWidth = windowHeight*9/100
  const consultants = useSelector(state => state.chat.consultants)
  const consultant = consultants.filter(c => c.userSeq === props.consultantSeq)[0]
  // const consultant = [{expertName: '김의사', consultantSeq: 3, expertDesc: '실력좋은의사'}]
  const chat = useSelector(state => state.chat.chat)
  // console.log(chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1])
  
  return (
    <>
    <TouchableOpacity
      style={{...styles.card, borderRadius: cardWidth*4/100, height: cardHeight}}
      onPress={() => navigation.navigate("ChatRoom", {consultantName: consultant.expertName, consultantSeq: consultant.userSeq})}
    >
      <Image
        source={require('./me_160x200.jpg')}
        style={{...styles.img ,width: imgWidth, height: imgWidth}}
      ></Image>
      <View style={styles.texts}>
        <View style={styles.intro}>
          <Text style={styles.introContent}>{consultant.expertName}  </Text>
          <Text style={{...styles.introContent, fontSize: 13}}>#{consultant.expertDesc}</Text>
        </View>
        <Text style={styles.date}>오늘 PM 6:30</Text>
        <Text style={styles.chatContent}>{chat[String(consultant.userSeq)] !== undefined && chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].message}</Text>
        {/* <Text style={styles.chatContent}>치킨 드시면 안됩니다.</Text> */}
      </View>
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: '1.5%',
    paddingHorizontal: '4%',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    flexDirection: 'row'
  },
  img: {
    borderRadius: 5000,
  },
  intro: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  introContent: {
    fontSize: 16,
  },
  texts: {
    marginLeft: '6%',
    paddingRight: '27%'
  },
  date: {
    fontSize: 13,
    marginTop: '1%'
  },
  chatContent: {
    marginTop: '1%'
  }
})