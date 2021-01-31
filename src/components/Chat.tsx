import React, {useState, useEffect, useRef} from 'react'

import {auth} from '../api/firebase'
import type {IChat, TError} from '../types'
import * as ChatAPI from '../api/chat'
import Loading from '../components/Chat/Loading'

function Chat () {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [chats, setChats] = useState([] as IChat[])
  const [content, setContent] = useState('')
  const [readError, setReadError] = useState(null as TError)
  const [writeError, setWriteError] = useState(null as TError)
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleWriteMessage = (chatArea: HTMLDivElement | null) => {
    setContent('')
    chatArea?.scrollBy(0, chatArea.scrollHeight)
  }

  const handleWriteError = (error: {message: TError}) => {
    const message = error?.message

    if (message) setWriteError(message)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setWriteError(null)

    const chatArea = myRef.current

    const message: IChat = {
      content,
      timestamp: Date.now(),
      uid: user?.uid || ''
    }

    try {
      ChatAPI.writeChats(message)
      handleWriteMessage(chatArea)
    } catch (error) {
      handleWriteError(error)
    }
  }

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
      {/* TODO: messagesender */}
      <form onSubmit={handleSubmit}>
        <textarea
          name='content'
          onChange={handleChange}
          value={content}
        />
        {/* TODO: errorbanner component */}
        {writeError ? <p>{writeError}</p> : null}
        <input type='submit' value='Send!' />
      </form>
    </div>
  )
}

export default Chat
