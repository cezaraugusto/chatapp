import React, {useState, useEffect} from 'react'

import {auth} from '../api/firebase'
import type {IChat, TError} from '../types'
import * as ChatAPI from '../api/chat'
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

    try {
      ChatAPI.readChats((chatHistory) => {
        setChats(chatHistory)
        setLoadingChats(false)
      })
    } catch (error) {
      setReadError(error.message)
    }
  }, [])

  const chatProps = {user, chats, readError, anonymousUsername}

  return (
    <>
      {loadingChats && <Loading />}
      {
        anonymousUsername === ''
          ? <AddNameScreen setAnonymousUsername={setAnonymousUsername} />
          : (
            <main>
              <WorkspaceCanvas />
              <ChatSidebar {...chatProps} />
            </main>
            )
      }
    </>
  )
}

export default HomePage
