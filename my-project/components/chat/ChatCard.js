import { View, Text, TouchableOpacity } from 'react-native'
import ChatRoom from '../../screens/chat/chatroom/ChatRoom'
import { useNavigation } from '@react-navigation/native';

export default function ChatCard() {
  const navigation = useNavigation();
  return (
    <>
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatRoom")}
    >
      <Text>ChatCard</Text>
    </TouchableOpacity>
    </>
  )
}