import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
// import { Provider } from 'react-redux'

import { App } from './App.jsx'

import './assets/main.scss'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider>
  <Router>
    <App />
  </Router>
  // </Provider>
)
