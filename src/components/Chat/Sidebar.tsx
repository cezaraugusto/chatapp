import React, {useRef} from 'react'
import type {User} from '@firebase/auth-types'

import type {IChat} from '../../types'
import WriteArea from './WriteArea'
import ReadArea from './ReadArea'
import * as UsersAPI from '../../api/unauthenticatedUsers'
import HowItWorksButton from '../HowItWorksButton'

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
    <section className='sidebar'>
      <section className='nes-container'>
        <p><b>Welcome,</b> {anonymousUsername}</p>
        <div className='mid-center'>
          <HowItWorksButton />
          <button className='nes-btn is-error' onClick={handleLogout}>
            Log me out!
          </button>
          <a
            className='nes-btn is-normal'
            href='https://github.com/cezaraugusto/pokechat'
            rel='noreferrer noopener'
            target='_blank'
          >
            Get the code
          </a>
        </div>
      </section>
      <div className='mid-center'>
        <h3 className='topic-title'>
          Your workspace&nbsp;
          <i className='nes-icon is-small heart' />
          <i className='nes-icon is-small heart' />
          <i className='nes-icon is-small heart' />
          <i className='nes-icon is-small heart' />
          <i className='nes-icon is-small heart' />
        </h3>
      </div>
      <div
        ref={chatRef}
        className='chatList'
      >
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
