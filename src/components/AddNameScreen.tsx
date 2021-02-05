import React, {useState} from 'react'
import type {User} from '@firebase/auth-types'

interface IAddNameScreen {
  user: User
  setAnonymousUsername: (username: string) => void
}

function AddNameScreen ({setAnonymousUsername}: IAddNameScreen) {
  const [username, setUsername] = useState('')
  const [showScreen, setLockScreen] = useState(true)

  const handleSubmit = () => {
    setAnonymousUsername(username)

    setLockScreen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  if (!showScreen) return null

  return (
    <form className='first-screen nes-field' onSubmit={handleSubmit}>
      <h1 className='section-title'>
        Hello!<br />Welcome to the chat app
      </h1>
      <input
        type='text'
        name='namefield'
        placeholder='Your name'
        className='nes-input'
        onChange={handleChange}
        value={username}
      />
      <input
        type='submit'
        className='nes-btn is-primary'
        disabled={username === ''}
        value='Go chat!'
      />
    </form>
  )
}

export default AddNameScreen
