import { Modal, StyleSheet, View, Text, Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;

export default function Career(props) {
  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={props.isCareerModalVisible}
        transparent={true}
      >
        <View style={styles.modalView}><Text>x</Text></View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    alignSelf: 'center',
    width: 200,
    height: 500,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})