import React, {useState, useEffect} from 'react'

import {auth} from '../api/firebase'
import type {IChat} from '../types'
import * as ChatAPI from '../api/chat'
import * as UsersAPI from '../api/unauthenticatedUsers'
import AddNameScreen from './Chat/AddNameScreen'
import ChatSidebar from './Chat/Sidebar'
import WorkspaceCanvas from './Workspace/Canvas'

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
      UsersAPI.setUnauthenticatedUserNode({
        username: anonymousUsername,
        uid: user?.uid,
        coordinates: [Math.random() * 500, Math.random() * 500]
      })
    }
  }, [user, anonymousUsername])

  const handleUnload = () => {
    UsersAPI.deleteUnauthenticatedUser()
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

  console.log('joy and suff')

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
