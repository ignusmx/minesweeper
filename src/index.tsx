import React                          from "react"
import {StrictMode}                   from "react"
import {createRoot}                   from "react-dom/client";
import {Provider}                     from "react-redux"
import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware           from "redux-saga"
import App                            from "./App"
import registerServiceWorker          from "./registerServiceWorker"
import reducers                       from "./control/reducers"
import handleNewMessage               from "./control/sagas"
import setupSocket                    from "./control/socket"
import "./index.css"

const sagaMiddleware = createSagaMiddleware()

const store = createStore
(
	reducers,
	applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(handleNewMessage, {socket})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render
(
   <Provider store={store}>
		<App />
	</Provider>,
 );

registerServiceWorker()
