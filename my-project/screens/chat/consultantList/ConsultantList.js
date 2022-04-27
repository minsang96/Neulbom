import { View, Text, ScrollView, StyleSheet, TouchableHighlight, FlatList, Dimensions } from "react-native";
import ConsultantCard from '../../../components/chat/ConsultantCard'

const windowWidth = Dimensions.get('window').width;

const ConsultantList = () => {
  return (
  <FlatList
    style={styles.container}
    horizontal={false}
    numColumns={2}
    ItemSeparatorComponent={
      Platform.OS !== 'android' &&
      (({ highlighted }) => (
        <View
          style={[
            style.separator,
            highlighted && { marginLeft: 0 }
          ]}
        />
      ))
    }
    data={[
      { title: 'Title Text', key: 'item1' },
      { title: 'Title Text2', key: 'item2' },
      { title: 'Title Text3', key: 'item3' }
    ]}
    renderItem={({ item, index, separators }) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <ConsultantCard width={windowWidth/2}/>
    </TouchableHighlight>
    )}
  />
  )
}

export default ConsultantList;

const styles = StyleSheet.create({
  container: {
  
  }
})