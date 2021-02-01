import React from 'react'
import type {User} from '@firebase/auth-types'

import type {IChat} from '../../types'

interface IReadArea {
  user: User | null
  chat: IChat
}

function ReadArea ({user, chat}: IReadArea) {
  const date = new Date(chat.timestamp)

  const formatTime = (timestamp: number) => {
    const time = {
      date: date.toLocaleDateString(),
      hour: date.getHours(),
      minute: date.getMinutes()
    }

    return `${time.date} ${time.hour}:${time.minute}`
  }

  return (
    <article
      key={chat.timestamp}
      style={{
        background: user?.uid === chat.uid ? 'lightgreen' : 'lightgray'
      }}
    >
      {chat.content}
      <footer>
        {formatTime(chat.timestamp)} by&nbsp;
        <time dateTime={date.toDateString()}>
          {chat.anonymousUsername}
        </time>
      </footer>
    </article>
  )
}

export default ReadArea
