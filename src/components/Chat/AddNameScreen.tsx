import React, {useState} from 'react'

import * as UnauthenticatedUserAPI from '../../api/unauthenticatedUsers'

interface IAddNameScreen {
  setAnonymousUsername: (name: string) => void
}

function AddNameScreen ({setAnonymousUsername}: IAddNameScreen) {
  const [name, setName] = useState('')
  const [showScreen, setLockScreen] = useState(true)

  const handleSubmit = () => {
    setAnonymousUsername(name)
    UnauthenticatedUserAPI.setUnauthenticatedUserNode(name)
    setLockScreen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  if (!showScreen) return null

  return (
    <form className='firstScreen' onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={handleChange}
        value={name}
      />
      <input type='submit' value='Go chat!' />
    </form>
  )
}

export default AddNameScreen
