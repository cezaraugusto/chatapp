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
import HowTo from './components/HowTo'
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
      ? <div role='status'>Loading...</div>
      : (
        <Router>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/howto'>How to</Link>
          </nav>
          <Switch>
            <Route path='/howto'>
              <HowTo />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Router>
        )
  )
}

export default App
