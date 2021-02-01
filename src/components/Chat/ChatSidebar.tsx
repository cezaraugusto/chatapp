import React, {useRef} from 'react'
import type {User} from '@firebase/auth-types'

import type {IChat, TError} from '../../types'
import WriteArea from './WriteArea'
import ReadArea from './ReadArea'
import ErrorMessage from './ErrorMessage'

interface IChatSidebar {
  user: User | null
  chats: IChat[]
  readError: TError
  anonymousUsername: string
}

function ChatSidebar (props: IChatSidebar) {
  const {user, chats, readError, anonymousUsername} = props
  const chatRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  return (
    <section id='sidebar'>
      <header>Logged in as: {anonymousUsername}</header>
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
    </section>
  )
}

export default ChatSidebar
