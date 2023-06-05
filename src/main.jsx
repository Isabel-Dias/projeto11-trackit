import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import Reset from './styles/ResetStyle.js'
import GlobalStyle from './styles/GlobalStyle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
