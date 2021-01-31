import React, {useState, useEffect, useRef} from 'react'

import {auth} from '../api/firebase'
import type {IChat, TError} from '../types'
import * as ChatAPI from '../api/chat'
import Loading from './Chat/Loading'
import WriteArea from './Chat/WriteArea'
import ReadArea from './Chat/ReadArea'
import ErrorMessage from './Chat/ErrorMessage'

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

  return (
    <div>
      <hr />
      <section ref={myRef}>
        {loadingChats && <Loading />}

        {chats.map((chat) => {
          if (readError) return <ErrorMessage error={readError} />
          return <ReadArea key={chat.timestamp} user={user} chat={chat} />
        })
        }
      </section>
      <WriteArea />
    </div>
  )
}

export default Chat
