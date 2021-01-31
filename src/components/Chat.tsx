import React, {useState, useEffect, useRef} from 'react'

import {auth, db} from '../api/firebase'

interface IChat {
  content: string
  timestamp: number
  uid: string
}

function Chat () {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [chats, setChats] = useState([] as IChat[])
  const [content, setContent] = useState('')
  const [readError, setReadError] = useState(null)
  const [writeError, setWriteError] = useState(null)
  const [loadingChats, setLoadingChats] = useState(false)

  const myRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  useEffect(() => {
    setReadError(null)
    setLoadingChats(true)

    try {
      db.ref('chats').on('value', snapshot => {
        if (!snapshot || !snapshot.val()) return

        const currentChatHistory: IChat[] = Object.values(snapshot.val())
        const chatHistory: IChat[] = []

        for (const chat of currentChatHistory) {
          chatHistory.push(chat)
        }

        const chatHistorySorted = chatHistory
          .sort((a, b) => a.timestamp - b.timestamp)

        const chatArea = myRef.current

        setChats(chatHistorySorted)
        chatArea?.scrollBy(0, chatArea.scrollHeight)
        setLoadingChats(false)
      })
    } catch (error) {
      setReadError(error.message)
      setLoadingChats(false)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setWriteError(null)

    const chatArea = myRef.current

    try {
      await db.ref('chats').push({
        content,
        timestamp: Date.now(),
        uid: user?.uid
      })

      setContent('')
      chatArea?.scrollBy(0, chatArea.scrollHeight)
    } catch (error) {
      setWriteError(error.message)
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
        {/* TODO: loading component */}
        {
          loadingChats
            ? <span className='sr-only'>Loading...</span>
            : ''
        }
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
            <p
              key={chat.timestamp}
              style={{
                background: user?.uid === chat.uid ? 'lightgreen' : 'lightgray'
              }}
            >
              {chat.content}
              <div>
                {formatTime(chat.timestamp)}
              </div>
            </p>
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
