import React, {useEffect, useState} from 'react'

import {auth} from '../../api/firebase'
import type {IChat, TError} from '../../types'
import * as ChatAPI from '../../api/chat'

interface IWriteArea {
  anonymousUsername: string
  chatArea: React.MutableRefObject<HTMLDivElement | null>
}

function WriteArea ({anonymousUsername, chatArea}: IWriteArea) {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [content, setContent] = useState('')
  const [writeError, setWriteError] = useState(null as TError)

  const handleAfterWriteMessage = (getChatArea: HTMLDivElement | null) => {
    if (!getChatArea) return

    setContent('')
    const heightToScroll = getChatArea.scrollHeight

    getChatArea?.scrollBy(0, heightToScroll)
  }

  const handleWriteError = (error: {message: TError}) => {
    const message = error?.message

    if (message) setWriteError(message)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  // Update service that will trigger a new message
  // each time a new chat member joins.
  useEffect(() => {
    const message: IChat = {
      anonymousUsername: anonymousUsername,
      content: `${anonymousUsername} just joined.`,
      timestamp: Date.now(),
      uid: `${user?.uid}-${anonymousUsername}` || ''
    }

    try {
      ChatAPI.writeChats(message)
      handleAfterWriteMessage(chatArea?.current)
    } catch (error) {
      handleWriteError(error)
    }
  }, [chatArea, user?.uid, anonymousUsername])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setWriteError(null)

    const message: IChat = {
      anonymousUsername: anonymousUsername,
      content,
      timestamp: Date.now(),
      uid: `${user?.uid}-${anonymousUsername}` || ''
    }

    try {
      ChatAPI.writeChats(message)
      handleAfterWriteMessage(chatArea?.current)
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
