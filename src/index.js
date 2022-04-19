import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createGlobalStyle } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/global.scss';
import reducer from './store/reducers';
import saga from './store/sagas';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './store/contexts/user';
import { EventProvider } from './store/contexts/playerevent';
import CreateModalProvider from './context/Modal';
import DeleteContextProvider from './context/Delete';
import { PlayersContextProvider } from './context/Players';
import GlobalContextProvider from './context/Global';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(saga);

//=======|GlobalStyles|=====//
const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	font-family: 'Baloo 2';
}

.PhoneInputInput {
	border: none;
	padding: 15px 15px;
	background: transparent;
	outline: none;
}

.modal-backdrop{
	z-index:1000;
	background: rgba(3, 9, 73, 0.4);
}
.modal-open .modal {
	
	z-index:1001;
	background: rgba(3, 9, 73, 0.4);
}

.react-datepicker__input-container {
	height: 50px;
    /* background: red; */
}
.react-datepicker__input-container input{
	height: 100%;
	width:100%;
	border:1px solid #7f8e97;
	outline: none;
	padding-left:10px;
	background: transparent;
}
.react-time-picker {
    /* display: inline-flex; */
    /* position: relative; */
    height: 50px;
	width:100%;
}

.react-time-picker__wrapper {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    height: 100%;
    border: thin solid gray;
	padding-left: 10px;
}
p {
	margin: 0;
}
a {
&:hover {
	color: #ffffff;
}	
}
.css-1lwoewx-Overlay {

	background: rgba(0,0,0,0.9) !important;

.modal_paper {
	background-color:white !important;
	padding:1rem;
	border-radius: 6px;
}
.modalTop2 {
	display: flex;
	justify-content:space-between;
	align-items:center;
}
}

`;

// toast.configure();

ReactDOM.render(
	<>
		<GlobalStyles />
		<DeleteContextProvider>
			<CreateModalProvider>
				<GlobalContextProvider>
					<PlayersContextProvider>
						<Provider store={store}>
							<React.StrictMode>
								<BrowserRouter>
									<UserProvider>
										<EventProvider>
											<App />
										</EventProvider>
									</UserProvider>
								</BrowserRouter>
							</React.StrictMode>
						</Provider>
					</PlayersContextProvider>
				</GlobalContextProvider>
			</CreateModalProvider>
		</DeleteContextProvider>
	</>,
	document.getElementById('root')
);

serviceWorker.unregister();
