import React, {useState, useEffect} from 'react'

import {auth} from '../api/firebase'
import type {IChat, TError} from '../types'
import * as ChatAPI from '../api/chat'
import * as UsersAPI from '../api/unauthenticatedUsers'
import Loading from './Chat/Loading'
import AddNameScreen from './Chat/AddNameScreen'
import ChatSidebar from './Chat/Sidebar'
import WorkspaceCanvas from './Workspace/Canvas'

function HomePage () {
  const currentUser = auth().currentUser
  const [user] = useState(currentUser)
  const [anonymousUsername, setAnonymousUsername] = useState('')
  const [chats, setChats] = useState<IChat[]>([])
  const [readError, setReadError] = useState<TError>(null)
  const [loadingChats, setLoadingChats] = useState(false)

  useEffect(() => {
    setReadError(null)
    setLoadingChats(true)

    ChatAPI.readChats((chatHistory) => {
      setChats(chatHistory)
      setLoadingChats(false)
    })

    // If user ID exist, delete previous node
    // and start one from scratch. This prevents
    // duplicated entries during local dev.
    if (anonymousUsername) {
      UsersAPI.setUnauthenticatedUserNode({
        username: anonymousUsername,
        uid: (Date.now()).toString(),
        coordinates: [150, 60]
      })
    }
  }, [anonymousUsername])

  const handleUnload = () => {
    UsersAPI.deleteUnauthenticatedUser()
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  const chatProps = {user, chats, readError, anonymousUsername}

  return (
    <>
      {loadingChats && <Loading />}
      {
        anonymousUsername === ''
          ? (
            <AddNameScreen
              user={user}
              setAnonymousUsername={setAnonymousUsername}
            />
            )
          : (
            <main>
              <WorkspaceCanvas /> {/** read from sourc */}
              <ChatSidebar {...chatProps} />
            </main>
            )
      }
    </>
  )
}

export default HomePage
