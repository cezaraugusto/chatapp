import React, {useState} from 'react'

interface IAddNameDialog {
  anonymousUsername: string
  setAnonymousUsername: (name: string) => void
}

function AddNameDialog ({
  anonymousUsername,
  setAnonymousUsername
}: IAddNameDialog) {
  const [isOpenDialog, setIsOpenDialog] = useState(true)

  const handleSubmit = () => {
    setIsOpenDialog(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnonymousUsername(event.target.value)
  }

  if (!isOpenDialog) return null

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={handleChange}
        value={anonymousUsername}
      />
      <input type='submit' value='Go chat!' />
    </form>
  )
}

export default AddNameDialog
