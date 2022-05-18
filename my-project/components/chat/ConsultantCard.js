import { Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

function ConsultantCard(props) {
// const ConsultantCard = ({ navigation: { navigate } }) => {
  const navigation = useNavigation();
  const cardWidth = windowWidth/2
  const imgWidth = cardWidth*55/100
  const consultantInfo = props.consultantInfo
  return (
    <TouchableOpacity
      style={{...styles.container, width: cardWidth}}
      onPress={() => navigation.navigate("ConsultantInfo", consultantInfo)}
    >
      <Image
        source={require('./me_160x200.jpg')}
        style={{...styles.img ,width: imgWidth, height: imgWidth}}
      >
      </Image>
      <Text>{consultantInfo.expertName}</Text>
      <Text>#{consultantInfo.expertDesc}</Text>
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