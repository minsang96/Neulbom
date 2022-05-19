import { StyleSheet, View, ScrollView, TouchableOpacity, Text, LogBox } from "react-native";
import ChatCard from '../../../components/chat/ChatCard'
import EncryptedStorage from "react-native-encrypted-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatSlice from '../../../slices/chat'

const ChatList = () => {
  console.log('Page: ChatList')
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  async function clearStorage() {
    try {
        await EncryptedStorage.clear();
        // Congrats! You've just cleared the device storage!
    } catch (error) {
        // There was an error on the native side
    }
}
  async function deleteChatList() {
    try {
        await EncryptedStorage.removeItem("chat_list");
        console.log('deleted successfully')
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
    }
  }
  console.log('chatList: ', chatList)
  const loadChats = async () => {
    console.log('load chat')
    chatList && chatList.map(async(consultantSeq) => {
      try {
        const chatFromStorage = await EncryptedStorage.getItem(`chatWith${consultantSeq}`)
        let JsonChat;
        if (chatFromStorage !== undefined && chatFromStorage !== null) {
          JsonChat = JSON.parse(chatFromStorage);
          console.log('JsonChat: ')
          console.log(JsonChat)
          dispatch(chatSlice.actions.setInitialChat([consultantSeq, JsonChat['chat']]))
        }
      } catch {
        
      }
    })
  }
  useEffect(() => {
    // 왜 여기서 실행시켜야 하는지 잘 모르겠음 ㅠㅠ
    loadChats()
    LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])
  }, [])

  return (
    <ScrollView style={styles.container}>
      {chatList && chatList.map((consultantSeq, index) => (
        <ChatCard key={consultantSeq} consultantSeq={consultantSeq} />
      ))}
      <TouchableOpacity onPress={() => deleteChatList()}>
        <Text>채팅목록삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearStorage()}>
        <Text>encrypted storage 다 비우기</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ChatList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    paddingTop: '3.5%',
    backgroundColor: 'white'
  }
})