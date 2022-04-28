import { Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

function ConsultantCard() {
// function ConsultantCard({ navigation: { navigate } }) {
  const navigation = useNavigation();
  const cardWidth = windowWidth/2
  const imgWidth = cardWidth*55/100
  return (
    <TouchableOpacity
      style={{...styles.container, width: cardWidth}}
      onPress={() => navigation.navigate("ConsultantInfo")}
    >
      <Image
        source={require('./me_160x200.jpg')}
        style={{...styles.img ,width: imgWidth, height: imgWidth}}
      >
      </Image>
      <Text>손형선</Text>
      <Text>#</Text>
    </TouchableOpacity>
)}

export default ConsultantCard

const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%'
  },
  img: {
    borderRadius: 5000,
  }
})