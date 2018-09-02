import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from '@/redux/middleware/logger';
import rootReducer from '@/redux/reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
    let middleware = applyMiddleware(thunk);

    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }

    const store = createStore(rootReducer, initialState, middleware);

    if (module.hot) {
        module.hot.accept('@/redux/reducers', () => {
            const nextReducer = require('@/redux/reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
