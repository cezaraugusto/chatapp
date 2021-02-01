import React, {useState, useRef} from 'react'

import {auth} from '../../api/firebase'
import type {IChat, TError} from '../../types'
import * as ChatAPI from '../../api/chat'

interface IWriteArea {
  anonymousUsername: string
}

function WriteArea ({anonymousUsername}: IWriteArea) {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [content, setContent] = useState('')
  const [writeError, setWriteError] = useState(null as TError)

  const myRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

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
      anonymousUsername: anonymousUsername,
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

  return (
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
  )
}

export default WriteArea
