import React, {useState} from 'react'

interface IAddNameScreen {
  setAnonymousUsername: (name: string) => void
}

function AddNameScreen ({setAnonymousUsername}: IAddNameScreen) {
  const [name, setName] = useState('')
  const [isOpenDialog, setIsOpenDialog] = useState(true)

  const handleSubmit = () => {
    setAnonymousUsername(name)
    setIsOpenDialog(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  if (!isOpenDialog) return null

  return (
    <form onSubmit={handleSubmit}>
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
