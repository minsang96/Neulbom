import { View, Image, Text, StyleSheet } from 'react-native'

export default function ConsultantCard(props) {
  const imgWidth = props.width*55/100
  return (
    <View style={{...styles.container, width: props.width}}>
      <Image 
        source={require('./me_160x200.jpg')}
        style={{...styles.img ,width: imgWidth, height: imgWidth}}
      >    
      </Image>
      <Text>손형선</Text>
      <Text>#</Text>
    </View>
  )}

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