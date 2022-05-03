import { View, StyleSheet, FlatList } from "react-native";
import ConsultantCard from '../../../components/chat/ConsultantCard'

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
      { title: 'Title Text3', key: 'item3' },
      { title: 'Title Text3', key: 'item4' },
      { title: 'Title Text3', key: 'item5' },
      { title: 'Title Text3', key: 'item6' },
      { title: 'Title Text3', key: 'item7' },
    ]}
    renderItem={({ item, index, separators }) => (
      <ConsultantCard key={item.key}/>
    )}
  />
  )
}

export default ConsultantList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: '2%'
  }
})