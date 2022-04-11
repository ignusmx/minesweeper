import React                          from "react"
import ReactDOM                       from "react-dom/client";
import {Provider}                     from "react-redux"
import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware           from "redux-saga"
import registerServiceWorker          from "./registerServiceWorker"
import reducers                       from "./control/reducers"
import handleNewMessage               from "./control/sagas"
import setupSocket                    from "./control/socket"
import App                            from "./App"
import reportWebVitals                from "./reportWebVitals";
import "./index.css"

const sagaMiddleware = createSagaMiddleware()
const store          = createStore
(
	reducers,
	applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(handleNewMessage, {socket})

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render
(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);

registerServiceWorker()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
