import userSlice from "../slices/user";
import * as ImagePicker from "expo-image-picker";

const onGallery = async (imgType, dispatch) => {
  try {
    console.log('onGallery tried')
    let result_g = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result_g);

    // 사진이 선택되면, image에 uri 저장
    if (!result_g.cancelled) {
      if (imgType === '자격 증명서') {
        dispatch(userSlice.actions.setConsultantCertImageUri(result_g.uri))
        console.log('dispatched')
      } else if (imgType === '프로필사진') {
        dispatch(userSlice.actions.setConsultantProfileImageUri(result_g.uri))
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("onGallery end");
  }
};

export default onGallery