import EncryptedStorage from "react-native-encrypted-storage";
import chatSlice from '../slices/chat'

export async function retrieveChatList(dispatch) {
  try {
    const chatListFromStorage = await EncryptedStorage.getItem("chat_list");
    let JsonChatList;
    if (chatListFromStorage !== undefined) {
      JsonChatList = JSON.parse(chatListFromStorage);
      console.log('JsonChatList: ',JsonChatList)
      dispatch(chatSlice.actions.setChatList(JsonChatList.chatList))
      // Congrats! You've just retrieved your first value!
    }
  } catch (error) {
    console.log(error)
      // There was an error on the native side
  } finally {
  
  }
}