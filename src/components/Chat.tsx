import React, {useState, useEffect, useRef} from 'react'

import {auth} from '../api/firebase'
import type {IChat, TError} from '../types'
import * as ChatAPI from '../api/chat'
import Loading from './Chat/Loading'
import WriteArea from './Chat/WriteArea'
import ReadArea from './Chat/ReadArea'
import ErrorMessage from './Chat/ErrorMessage'
import AddNameScreen from './Chat/AddNameScreen'

function Chat () {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [anonymousUsername, setAnonymousUsername] = useState('')
  const [chats, setChats] = useState<IChat[]>([])
  const [readError, setReadError] = useState<TError>(null)
  const [loadingChats, setLoadingChats] = useState(false)

  const chatRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  useEffect(() => {
    setReadError(null)
    setLoadingChats(true)

    try {
      ChatAPI.readChats((chatHistory) => {
        const chatArea = chatRef.current

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
      {loadingChats && <Loading />}
      {
        anonymousUsername === ''
          ? <AddNameScreen setAnonymousUsername={setAnonymousUsername} />
          : (
            <>
              <section
                ref={chatRef}
                style={{height: '500px', overflow: 'scroll'}}
              >
                {chats.map((chat) => {
                  if (readError) return <ErrorMessage error={readError} />

                  return (
                    <ReadArea
                      key={chat.timestamp}
                      user={user}
                      chat={chat}
                    />
                  )
                })}
              </section>
              <WriteArea
                chatArea={chatRef}
                anonymousUsername={anonymousUsername}
              />
              <div>Logged in as: {anonymousUsername}</div>
            </>
            )
      }
    </div>
  )
}

export default Chat
