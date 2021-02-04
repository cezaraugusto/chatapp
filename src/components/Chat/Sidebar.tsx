import React, {useRef} from 'react'
import type {User} from '@firebase/auth-types'

import type {IChat} from '../../types'
import WriteArea from './WriteArea'
import ReadArea from './ReadArea'
import * as UsersAPI from '../../api/unauthenticatedUsers'

interface IChatSidebar {
  user: User | null
  chats: IChat[]
  anonymousUsername: string
}

function ChatSidebar (props: IChatSidebar) {
  const {user, chats, anonymousUsername} = props
  const chatRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  const handleLogout = () => {
    UsersAPI.deleteUnauthenticatedUser()
  }

  return (
    <section id='sidebar'>
      <header>
        <b>Welcome,</b> {anonymousUsername}.&nbsp;
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className='chatList' ref={chatRef}>
        {chats.map((chat) => {
          return (
            <ReadArea
              key={chat.timestamp}
              user={user}
              chat={chat}
            />
          )
        })}
      </div>
      <WriteArea
        chatArea={chatRef}
        anonymousUsername={anonymousUsername}
      />
    </section>
  )
}

export default ChatSidebar
