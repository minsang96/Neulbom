import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import ChatRoom from '../../screens/chat/chatroom/ChatRoom'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";
import { useEffect } from 'react';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ChatCard(props) {
  console.log('-----------------------------------------------------')
  console.log('Page: ChatCard')
  const navigation = useNavigation();
  const cardWidth = windowWidth*98/100
  const cardHeight = windowHeight*15/100
  const imgWidth = windowHeight*9.5/100
  const consultants = useSelector(state => state.chat.consultants)
  const userInfo = useSelector((state) => state.user.userInfo);
  let consultant = {}
  let chatUser
  if (userInfo.userType === '0') {
    consultant = consultants.filter(c => c.userSeq === props.consultantSeq)[0]
    // console.log(consultant)
  } else {
    chatUser = props.user
  }

  // const consultant = {expertName: '김의사', userSeq: 4, expertDesc: '실력좋은의사'}
  const chat = useSelector(state => state.chat.chat)
  // console.log(chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1])
  
  // 일반유저로 로그인 했을 시
  if (userInfo.userType === '0') {
    return (
      <>
      <TouchableOpacity
        style={{...styles.card, borderRadius: cardWidth*4/100, height: cardHeight}}
        onPress={() => navigation.navigate("ChatRoom", {consultantName: consultant.expertName, consultantSeq: consultant.userSeq})}
      >
        <Image
          source={{uri: consultant.expertImg}}
          style={{...styles.img ,width: imgWidth, height: imgWidth}}
        ></Image>
        <View style={styles.texts}>
          <View style={styles.intro}>
            <Text style={styles.introContent}>{consultant.expertName}  </Text>
            <Text style={{...styles.introContent, fontSize: 13}}>#{consultant.expertDesc}</Text>
          </View>
          {chat[String(consultant.userSeq)] !== undefined && <View style={{flexDirection: 'row'}}>
            {/* 날짜 바뀌면 날짜로 */}
            {/* <Text style={styles.date}>{chat[String(consultant.userSeq)] !== undefined && chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].time.slice(5,10)} </Text> */}
            <Text style={styles.date}>{chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].time.slice(11,13) < 12 ?
              chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].time.slice(11,16)+' AM' :
              Number(chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].time.slice(11,13))-12+':'+chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].time.slice(14,16)+' PM'}</Text>
          </View>}
          <Text numberOfLines={1} style={styles.chatContent}>{chat[String(consultant.userSeq)] !== undefined && chat[String(consultant.userSeq)][chat[String(consultant.userSeq)].length-1].message}</Text>
        </View>
      </TouchableOpacity>
      </>
    );
  }
  else {
    return (
      <>
      <TouchableOpacity
        style={{...styles.card, borderRadius: cardWidth*4/100, height: cardHeight}}
        onPress={() => navigation.navigate("ChatRoom", {consultantName: chatUser.userInfo.memberNickname, consultantSeq: chatUser.userSeq})}
      >
        <Image
          source={{uri: chatUser.userInfo.memberImg}}
          style={{...styles.img ,width: imgWidth, height: imgWidth}}
        ></Image>
        <View style={styles.texts}>
          <View style={styles.intro}>
            <Text style={styles.introContent}>{chatUser.userInfo.memberNickname}  </Text>
            <Text style={{...styles.introContent, fontSize: 13}}>#{chatUser.userInfo.memberDesc}</Text>
          </View>
          <Text style={styles.date}>오늘 PM 6:30</Text>
          <Text numberOfLines={1} style={styles.chatContent}>{chat[String(chatUser.userSeq)] !== undefined && chat[String(chatUser.userSeq)][chat[String(chatUser.userSeq)].length-1].message}</Text>
        </View>
      </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: "1.5%",
    paddingHorizontal: "4%",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    flexDirection: "row",
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
    marginLeft: "6%",
    paddingRight: "27%",
  },
  date: {
    fontSize: 13,
    marginTop: "1%",
  },
  chatContent: {
    marginTop: "1%",
  },
});
