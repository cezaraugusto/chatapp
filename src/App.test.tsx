import React from 'react'
import {render, screen} from '@testing-library/react'

import App from './App'

test('renders loading page', () => {
  render(<App />)
  const linkElement = screen.getByText(/Loading chat.../i)

  expect(linkElement).toBeInTheDocument()
})
