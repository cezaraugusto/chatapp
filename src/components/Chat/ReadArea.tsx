import React from 'react'
import type {User} from '@firebase/auth-types'

import type {IChat} from '../../types'

interface IReadArea {
  user: User | null
  chat: IChat
}

function ReadArea ({user, chat}: IReadArea) {
  const date = new Date(chat.timestamp)

  const formatTime = () => {
    const time = {
      date: date.toLocaleDateString(),
      hour: date.getHours(),
      minute: date.getMinutes()
    }

    return `${time.hour}:${time.minute}`
  }

  const getOwnId = `${user?.uid}-${chat.anonymousUsername}`
  return (
    <article
      key={chat.timestamp}
      className='nes-container with-title'
      style={{
        borderColor: getOwnId === chat.uid ? '#92cc41' : 'inherit'
      }}
    >
      <header className='title'>
        {chat.anonymousUsername}
        <time dateTime={date.toDateString()}>
          ({formatTime()})
        </time>
      </header>
    {chat.content}
    </article>
  )
}

export default ReadArea
