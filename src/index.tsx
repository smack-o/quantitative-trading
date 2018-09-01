import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';

import { configureStore } from '@/redux/store';
import { App } from '@/containers/App';

// prepare store
const history = createBrowserHistory();
const store = configureStore(history);

renderWithHotReload(App);

if (module.hot) {
    module.hot.accept('@/router', () => {
        const NextApp = require('@/router').default;
        renderWithHotReload(NextApp);
    });
}

function renderWithHotReload(RootElement: any) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}
