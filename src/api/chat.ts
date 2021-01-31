
import {db} from './firebase'
import type {IChat} from '../types'

interface IReadChats {
  (chatHistory: IChat[]): void
}

export function readChats (chatHistoryCb: IReadChats) {
  db.ref('chats').on('value', snapshot => {
    if (!snapshot || !snapshot.val()) return

    const chatHistory: IChat[] = []
    const currentChatHistory: IChat[] = Object.values(snapshot.val())

    for (const chat of currentChatHistory) {
      chatHistory.push(chat)
    }

    const chatHistorySorted = chatHistory
      .sort((a, b) => a.timestamp - b.timestamp)

    chatHistoryCb(chatHistorySorted)
  })
}

export function writeChats (message: IChat) {
  const {content, timestamp, uid} = message

  db.ref('chats').push({content, timestamp, uid})
}
