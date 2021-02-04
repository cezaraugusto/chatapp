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
    <form className='firstScreen' onSubmit={handleSubmit}>
    <div className='nes-field'>
      <label htmlFor='name_field'>Your name</label>
      <input
        type='text'
        className='nes-input'
        onChange={handleChange}
        value={username}
      />
    </div>
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
