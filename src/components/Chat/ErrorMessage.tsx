import React from 'react'

interface IErrorMessage {
  error: string
}

function ErrorMessage ({error}: IErrorMessage) {
  return (
    <div>
      <span>{error}</span>
    </div>
  )
}

export default ErrorMessage
