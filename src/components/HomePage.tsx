import React, {useState, useEffect} from 'react'

import {auth} from '../api/firebase'
import type {IChat} from '../types'
import * as ChatAPI from '../api/chat'
import * as AuthAPI from '../api/auth'
import AddNameScreen from './AddNameScreen'
import ChatSidebar from './Chat/Sidebar'
import WorkspaceCanvas from './Workspace/Canvas'

function randomNumber (min: number, max: number) {
  const r = Math.random() * (max - min) + min

  return Math.floor(r)
}

function HomePage () {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [anonymousUsername, setAnonymousUsername] = useState('')
  const [chats, setChats] = useState<IChat[]>([])

  useEffect(() => {
    ChatAPI.readChats((chatHistory) => setChats(chatHistory))

    // If user ID exist, delete previous node
    // and start one from scratch. This prevents
    // duplicated entries during local dev.
    if (user && anonymousUsername) {
      AuthAPI.setUnauthenticatedUserNode({
        username: anonymousUsername,
        uid: user?.uid,
        coordinates: [randomNumber(150, 700), randomNumber(150, 700)]
      })
    }
  }, [user, anonymousUsername])

  const handleUnload = () => {
    AuthAPI.deleteUnauthenticatedUser()
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  if (!user) return null

  const id = `${user?.uid}-${anonymousUsername}`
  const addNameProps = {user, setAnonymousUsername}
  const workspaceProps = {id, chats}

  const chatProps = {
    user,
    chats,
    anonymousUsername
  }

  return anonymousUsername === ''
    ? (
      <AddNameScreen {...addNameProps} />
      )
    : (
      <main>
        <WorkspaceCanvas {...workspaceProps} />
        <ChatSidebar {...chatProps} />
      </main>
      )
}

export default HomePage
