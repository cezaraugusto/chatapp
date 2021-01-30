import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import './App.css'
import Chat from './components/Chat'
import HowTo from './components/HowTo'

function App () {
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/howto'>How to...</Link>
      </nav>
      <hr />
      <Switch>
        <Route path='/howto'>
          <HowTo />
        </Route>
        <Route path='/'>
          <Chat />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
