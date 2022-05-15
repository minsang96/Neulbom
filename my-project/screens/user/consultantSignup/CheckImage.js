import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import ButtonGreen2 from '../../../components/button/ButtonGreen2';
import { useDispatch, useSelector } from "react-redux";
import userSlice from '../../../slices/user';
import onGallery from '../../../api/onGallery'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgWidth = windowWidth*74/100

export default function CheckImage(props) {
  const dispatch = useDispatch();
  const profileImgUri = useSelector(state => state.user.consultantProfileImageUri)
  const certImgUri = useSelector(state => state.user.consultantCertImageUri)
  const ButtonCompo = (props) => {
    return (
      <TouchableOpacity
        style={{
          ...props.styles,
          backgroundColor: "#e2e2e2",
          padding: 11,
          marginVertical: 9,
          // marginHorizontal: 25,
          alignItems: "center",
          borderRadius: 10,
          width: '66%',
          justifyContent: 'center'
        }}
        onPress={props.onPressButton}
      >
        <Text style={{ color: "#172A3A", fontSize: 14 }}>다른 이미지 가져오기</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{...styles.container, height: windowHeight}}>
      <Text style={styles.title}>{props.route.params.imgType}</Text>
      <View style={{...styles.imgContainer, width: imgWidth, height: imgWidth}}>
        {props.route.params.imgType === '프로필사진' && <Image source={{uri: profileImgUri}} style={{width: '100%', height: '100%'}}/>}
        {props.route.params.imgType === '자격 증명서' && <Image source={{uri: certImgUri}} style={{width: '100%', height: '100%'}}/>}
      </View>
      <ButtonCompo onPressButton={() => {onGallery(props.route.params.imgType, dispatch)}}></ButtonCompo>
      <ButtonGreen2
        onPressButton={() => {props.navigation.navigate('ConsultantSignUp')}}
        buttonName='완료' padding={10} width='66%'></ButtonGreen2>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginTop: '16%',
    fontSize: 23,
    fontWeight: '700',
    marginBottom: '9%'
  },
  imgContainer: {
    marginBottom: '8%',
    borderWidth: 1,
    borderColor: '#e2e2e2'
  }
})