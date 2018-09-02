import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { isMobile } from 'utils'
import configureStore from '@/redux/store'
import App from '@/containers/App'

// prepare store
const store = configureStore()

renderWithHotReload(App)

if (module.hot) {
  module.hot.accept('@/router', () => {
    const NextApp = require('@/router').default
    renderWithHotReload(NextApp)
  })
}

function renderWithHotReload (RootElement) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}
