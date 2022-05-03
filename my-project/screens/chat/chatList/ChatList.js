import { StyleSheet, View, ScrollView } from "react-native";
import ChatCard from '../../../components/chat/ChatCard'

const chats = [1, 2, 3, 4, 5]

const ChatList = () => {
  return (
    <ScrollView style={styles.container}>
      {chats.map(chat => (
        <ChatCard key={chat}/>
      ))}
    </ScrollView>
  )
}

export default ChatList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    paddingTop: '1.5%'
  }
})