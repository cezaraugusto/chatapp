import React from 'react'
import type {User} from '@firebase/auth-types'

import type {IChat} from '../../types'

interface IReadArea {
  user: User | null
  chat: IChat
}

function ReadArea ({user, chat}: IReadArea) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)

    const time = {
      date: date.toLocaleDateString(),
      hour: date.getHours(),
      minute: date.getMinutes()
    }

    return `${time.date} ${time.hour}:${time.minute}`
  }

  return (
    <div
      key={chat.timestamp}
      style={{
        background: user?.uid === chat.uid ? 'lightgreen' : 'lightgray'
      }}
    >
      {chat.content}
      <div>
        {formatTime(chat.timestamp)} by {chat.anonymousUsername}
      </div>
    </div>
  )
}

export default ReadArea
