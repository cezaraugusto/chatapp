import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import './App.css'
import {auth} from './api/firebase'
import HomePage from './components/HomePage'
import {authenticateAnonymously} from './api/authenticateAnonymously'

function App () {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)

        return
      }

      authenticateAnonymously()
      setAuthenticated(false)
    })
  }, [])

  return (
    // Do not load until anonymous
    // authentication is finished.
    !authenticated
      ? (
        <div className='loading' role='status'>
          <progress
            className='nes-progress is-pattern'
            value='70'
            max='100'
          />
          <h3 className='topic-title'>Loading chat...</h3>
        </div>
        )
      : (
        <Router>
          <nav>
            <Link to='/'>Home</Link>
            <a
              href='https://github.com/cezaraugusto'
              rel='noreferrer noopener'
              target='_blank'
            >
              <span className='nes-text is-success'>Ask developer!</span>
            </a>
          </nav>
          <Switch>
          <Route path='/'>
            <HomePage />
          </Route>
          </Switch>
        </Router>
        )
  )
}

export default App
