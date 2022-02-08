import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { NhostApolloProvider } from './react-apollo'
import { NhostProvider } from './react-auth'
import { initNhost } from './state'

const nhost = initNhost({
  backendUrl: 'http://127.0.0.1:1337'
})

ReactDOM.render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider>
        <App />
      </NhostApolloProvider>
    </NhostProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
