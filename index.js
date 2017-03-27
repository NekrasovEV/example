/**
 * Главный файл приложения
 * В данном файле подключается само приложение и рендерится в root класс.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from "react-hot-loader";
import App from "./app";

const rootEl = document.getElementById('root');
ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	rootEl
);


if (module.hot) {
	module.hot.accept(['./app'], () => {
		const NextApp = require('./app').default;

		ReactDOM.render(
			<AppContainer>
				<NextApp />
			</AppContainer>,
			rootEl
		);
	});
}




