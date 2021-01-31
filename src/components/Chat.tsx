import React, {useState, useEffect, useRef} from 'react'

import {auth} from '../api/firebase'
import type {IChat, TError} from '../types'
import * as ChatAPI from '../api/chat'
import Loading from './Chat/Loading'
import WriteArea from './Chat/WriteArea'

function Chat () {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [chats, setChats] = useState<IChat[]>([])
  const [readError, setReadError] = useState<TError>(null)
  const [loadingChats, setLoadingChats] = useState(false)

  const myRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  useEffect(() => {
    setReadError(null)
    setLoadingChats(true)

    try {
      ChatAPI.readChats((chatHistory) => {
        const chatArea = myRef.current

        setChats(chatHistory)
        chatArea?.scrollBy(0, chatArea.scrollHeight)
        setLoadingChats(false)
      })
    } catch (error) {
      setReadError(error.message)
    }
  }, [])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)

    const time = {
      date: date.toLocaleDateString(),
      hour: date.getHours(),
      minute: date.getMinutes()
    }

    return `${time.date} ${time.hour}:${time.minute}`
  }

  return (
    <div>
      <hr />
      <div ref={myRef}>
        {loadingChats && <Loading />}
        {/* TODO: messagelist component */}
        {chats.map((chat: IChat) => {
          if (readError) {
            return (
              <span>
                Unable to read messages! {readError}
              </span>
            )
          }

          return (
            <div
              key={chat.timestamp}
              style={{
                background: user?.uid === chat.uid ? 'lightgreen' : 'lightgray'
              }}
            >
              {chat.content}
              <div>
                {formatTime(chat.timestamp)}
              </div>
            </div>
          )
        })}
      </div>
      <WriteArea />
    </div>
  )
}

export default Chat
