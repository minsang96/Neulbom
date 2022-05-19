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
        source={{uri: consultantInfo.expertImg}}
        style={{...styles.img ,width: imgWidth, height: imgWidth}}
      >
      </Image>
      <Text style={{fontSize: 19, fontWeight: '700', margin: '1%'}}>{consultantInfo.expertName}</Text>
      <Text style={{textAlign: 'center', width: '85%', fontSize: 14.5, lineHeight: 20}}>#{consultantInfo.expertDesc}</Text>
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