import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultants: null,
  chatList: [],
  chat: {},
  socketConnected: [],
  // isChatting: false,
  users: []
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConsultants: (state, action) => {
      state.consultants = action.payload
    },
    setChatList: (state, action) => {
      state.chatList = action.payload
    },
    setChat: (state, action) => {
      if (Object.keys(state.chat).includes(String(action.payload[0]))) {
        state.chat[action.payload[0]].push(action.payload[1])
      } else {
        state.chat[action.payload[0]] = [action.payload[1]]
      }
      console.log('chat dispatched')
      console.log(state.chat)
    },
    setSocketConnected: (state, action) => {
      state.socketConnected.push(action.payload)
    },
    setInitialChat: (state, action) => {
      state.chat[action.payload[0]] = action.payload[1]
    },
    clearChat: (state, action) => {
      state.chat = {} 
    },
    setUsers: (state, action) => {
      state.users.push({userSeq: action.payload[0], userInfo: action.payload[1]})
    }
  }
});

export const {
  setConsultants
} = chatSlice.actions;

export default chatSlice;