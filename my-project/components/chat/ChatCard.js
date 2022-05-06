import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import ChatRoom from '../../screens/chat/chatroom/ChatRoom'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChatCard() {
  const navigation = useNavigation();
  const cardWidth = windowWidth*98/100
  const cardHeight = windowHeight*15/100
  const imgWidth = windowHeight*9/100
  return (
    <>
    <TouchableOpacity
      style={{...styles.card, borderRadius: cardWidth*4/100, height: cardHeight}}
      onPress={() => navigation.navigate("ChatRoom")}
    >
      <Image
        source={require('./me_160x200.jpg')}
        style={{...styles.img ,width: imgWidth, height: imgWidth}}
      ></Image>
      <View style={styles.texts}>
        <View style={styles.intro}>
          <Text style={styles.introContent}>손형선  </Text>
          <Text style={styles.introContent}>#영양사</Text>
        </View>
        <Text style={styles.date}>오늘 PM 6:30</Text>
        <Text style={styles.chatContent}>치킨 드시면 안됩니다.</Text>
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