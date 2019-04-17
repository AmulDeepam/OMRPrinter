import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Gstdashboard1 from './Gstdashboard1';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import LoginPage from './LoginPage';
//import './LoginPage.css'


ReactDOM.render(<LoginPage/>, document.getElementById('root'));

if (localStorage.getItem('isLoggedIn')) {
	var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
	if (login == "true") {
		
		window.scrollTo(0, 0);
		ReactDOM.render(
			<Router>
				<div >			
					<Route  path="/" component={Gstdashboard1} />
				</div>
			</Router>, document.getElementById('root'));
			
		registerServiceWorker();
	}
	else {
		window.scrollTo(0, 0);      
   
		ReactDOM.render( 
		<Router>
		<div >
		<Route  path="/" component={LoginPage}/>
	
</div>
		</Router>
		, document.getElementById("root"));
		registerServiceWorker();
	}

}
else {
	window.scrollTo(0, 0);      
   
	ReactDOM.render(
		<Router>
		<div >
		<Route  path="/" component={LoginPage}/>
		</div>
		</Router>
		, document.getElementById("root"));
	
		registerServiceWorker();
}
	