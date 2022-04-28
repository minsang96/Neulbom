import { StyleSheet } from "react-native";
import ChatCard from '../../../components/chat/ChatCard'

const chats = [1, 2, 3, 4, 5]

const ChatList = () => {
  return (
    <>
      {chats.map(chat => (
        <ChatCard key={chat}/>
      ))}
    </>
  )
}

export default ChatList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '2%'
  }
})