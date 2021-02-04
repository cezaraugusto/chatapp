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
      <input
        type='text'
        onChange={handleChange}
        value={username}
      />
      <input type='submit' disabled={username === ''} value='Go chat!' />
    </form>
  )
}

export default AddNameScreen
