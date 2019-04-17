import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Gstdashboard1 from './Gstdashboard1';
//import './LoginPage.css';
import ForgotPassword from './ForgotPassword';
import CryptoJS from 'crypto-js';
import Dashboardoverall from './Dashboardoverall';
import SiteRegister from './SiteRegister';
import LicenseEntryForm from './LicenseEntryForm';


class LoginPage extends Component {


    constructor() {

        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
     
        this.state = {
			emailId: '',
			password: '',
			date:date,
			formErrors: { emailId: '', password: '' },
			emailIdValid: false,
			passwordValid: false
        };
        this.setState({
             date:date,
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);     
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        } 
   
    }

    validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailIdValid = this.state.emailIdValid;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {

			case 'emailId':
				emailIdValid = value.length >= 10;
				{ /*  emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);*/ }
				fieldValidationErrors.emailId = emailIdValid ? '' : ' is invalid';
				break;
            case 'password':
           
			 	passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
				fieldValidationErrors.password = passwordValid ? '' : ' is too short';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			emailIdValid: emailIdValid,
			passwordValid: passwordValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({ formValid: this.state.emailIdValid && this.state.passwordValid });
	}

	errorClass(error) {
		return (error.length === 0 ? '' : 'has-error');
	}
	Fpassword() {
		ReactDOM.render(< ForgotPassword />, document.getElementById('root'));

    }
    
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
        );
    }

    Login(){
        var key = "shinchanbaby";
     
		localStorage.setItem('EmailId', CryptoJS.AES.encrypt(this.state.emailId, key));
		localStorage.setItem('Password', CryptoJS.AES.encrypt(this.state.password, key));
     //   localStorage.setItem('Address', CryptoJS.AES.encrypt(this.state.comaddress, key));

		
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                
                emailId:this.state.emailId,
                password:this.state.password,
                date:this.state.date,

            }),
           url: "http://52.66.243.218:8080/ERPDetails/Login/LoginCheck",
           //url: "http://localhost:8080/ERPDetails/Login/LoginCheck",
           
           contentType: "application/json",
            dataType: 'json',
            async: false,
      
            success: function (data, textStatus, jqXHR) {
                window.scrollTo(0, 0);
if(data.status=="active"){
    if(data.emailId=="Success"){

    localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));
   // console.log("permission"+JSON.stringify(data))
    console.log("employeeRolelist"+JSON.stringify(data.employeeRolelist))
    console.log("employeePermisionlist"+JSON.stringify(data.employeePermisionlist))
    console.log("rolename"+JSON.stringify(data.roleName))
    console.log("staffId"+JSON.stringify(data.staffId))
    console.log("employeeList"+JSON.stringify(data.employeeList))
    console.log("companyAddress"+JSON.stringify(data.companyAddress))
    localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
    localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.companyEmailId, key));
    localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, key));
		
    localStorage.setItem('CompanyAddress', CryptoJS.AES.encrypt(JSON.stringify(data.companyAddress), key));
    localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(data.doorNo, key));
    localStorage.setItem('Floor', CryptoJS.AES.encrypt(data.floor, key));
    localStorage.setItem('Street', CryptoJS.AES.encrypt(data.street, key));
    localStorage.setItem('Place', CryptoJS.AES.encrypt(data.place, key));
    localStorage.setItem('State', CryptoJS.AES.encrypt(data.state, key));
  
   
    localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
    localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));

    
   
   
   
    localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
    localStorage.setItem('LicenseKey', CryptoJS.AES.encrypt(data.licenseKey, key));
    localStorage.setItem('Status', CryptoJS.AES.encrypt(data.status, key));
    console.log("cmp name",data.companyName);
    console.log("license key",data.licenseKey);
    console.log("companyAddress",data.companyAddress);
    console.log("CompanyEmailId",data.companyEmailId);
    console.log("ContactNo",data.contactNo);


    console.log("doorNO",data.doorNo);
    console.log("Floor",data.floor);
    console.log("Street",data.street);
    console.log("Place",data.place);
    console.log("State",data.state);
    localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
	localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
	localStorage.setItem('Role', CryptoJS.AES.encrypt(data.roleName, key));
	localStorage.setItem('staffId', CryptoJS.AES.encrypt(data.staffId, key));
	localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
		
                ReactDOM.render(
                    <Router>
                      <div>
                   
                      <Route path="/" component={() => <Gstdashboard1  />} />
                     
          
          
                      </div>
                    </Router>,
                    document.getElementById('root'));
                  registerServiceWorker();
                }
                  else{
                    confirmAlert({
                        title: 'Login Failed',                        // Title dialog
                        message: 'Login Id or Password Incorrect',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                      });

                }
            }
            else if(data.status=="inactive"){


                localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));
                // console.log("permission"+JSON.stringify(data))
                 console.log("employeeRolelist"+JSON.stringify(data.employeeRolelist))
                 console.log("employeePermisionlist"+JSON.stringify(data.employeePermisionlist))
                 console.log("rolename"+JSON.stringify(data.roleName))
                 console.log("staffId"+JSON.stringify(data.staffId))
                 console.log("employeeList"+JSON.stringify(data.employeeList))
                 console.log("employeeList"+JSON.stringify(data.companyAddress))
                 localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
                 localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.companyEmailId, key));
                 localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, key));
                 localStorage.setItem('CompanyAddress', CryptoJS.AES.encrypt(JSON.stringify(data.companyAddress), key));
                 localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
                 localStorage.setItem('LicenseKey', CryptoJS.AES.encrypt(data.licenseKey, key));
                 localStorage.setItem('Status', CryptoJS.AES.encrypt(data.status, key));
                 console.log("cmp name",data.companyName);
                 console.log("license key",data.licenseKey);
                 console.log("companyAddress",data.companyAddress);
                 console.log("CompanyEmailId",data.companyEmailId);
                 console.log("ContactNo",data.contactNo);
                 localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
                 localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
                 localStorage.setItem('Role', CryptoJS.AES.encrypt(data.roleName, key));
                 localStorage.setItem('staffId', CryptoJS.AES.encrypt(data.staffId, key));
                 localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
             
                 localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(data.doorNo, key));
                 localStorage.setItem('Floor', CryptoJS.AES.encrypt(data.floor, key));
                 localStorage.setItem('Street', CryptoJS.AES.encrypt(data.street, key));
                 localStorage.setItem('Place', CryptoJS.AES.encrypt(data.place, key));
                 localStorage.setItem('State', CryptoJS.AES.encrypt(data.state, key));
               
                
                 ReactDOM.render(<LicenseEntryForm />, document.getElementById("root"));
             registerServiceWorker();
            }
            else{
                confirmAlert({
                    title: 'License Expired',                        // Title dialog
                    message: 'License Renewal is Required',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });

                  ReactDOM.render(<LoginPage />, document.getElementById("root"));
            }

        },
        
        error: function (data) {
          
          confirmAlert({
            title: 'No Internet',                        // Title dialog
            message: 'Network Connection Problem',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
      
        }
      });

    }
    SignUpFunc() {


		ReactDOM.render(< SiteRegister />, document.getElementById('root'));

	}
    render() {


        return (

            <div class="container" style={{ marginBottom: "30%" }}>

<div className="loginpage responsive" id="loginpagebg"
				style={{position: "absolute"}}>
				<div className="login-container"
				/* style={{boxShadow: "10px 10px 5px grey"}} */>
					<div className="container" id="logbg" >
						
						<div className="containerlogin" id="loginpage">

							<div className="form-signin-heading text-muted" id="loginname">
								<h2>LogIn</h2>
							</div>


							<form className="form-signin"id="login_details" style={{paddingtop:"70px!important"}}>


								<input type="text" value={this.state.emailId} onChange={this.handleUserInput}
									name="emailId" id="emailId" className="form-control" required="" autoFocus="" placeholder="email-ID / Mobile No" />

								<input type="password" value={this.state.password} onChange={this.handleUserInput} name="password" id="password" className="form-control" required="" placeholder="Password" />

								<div className="checkbox">
									<button type="button" id="forgetpwdID" onClick={() => this.Fpassword()} className="btn btn-link">Forgot Password ?</button>
                                    <button type="button" id="forgetpwdID" onClick={() => this.SignUpFunc()} className="btn btn-link" >Sign Up</button>

								</div>
								<div id="loginSubmitButton1">
								<button type="submit" id="loginSubmitButton" disabled={!this.state.formValid} style={{ backgroundColor: "rgb(226, 39, 45)" }} onClick={() => this.Login()} className="btn btn-md" >Login</button>
								</div>
							</form>

						
						</div>
					</div>
					
				</div>

         </div>
         </div>





);
}

}
export default LoginPage;























 