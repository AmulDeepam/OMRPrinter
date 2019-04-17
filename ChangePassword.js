import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import Expense from './Expense';
import './gstdashboard.css';
import AdminAddUser from './AdminAddUser';
import AddRole from './AddRole';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import CryptoJS from 'crypto-js';
import Dashboardoverall from './Dashboardoverall';
class ChangePassword1 extends Component {
    constructor(){
        super()
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
	
        this.state={

            password: '',
            staffId: '',
            companyId:companyId,
            passwordValid: false,
            formErrors: { passwordValid: '', },
        }
          }

          componentDidMount(){
          
            window.scrollTo(0, 0);      
   
          }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },);
      } 
   

Passwordverify() {

    var password = document.getElementById("password");
    var confirmpassword = document.getElementById("confirmpassword");
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    if (password.value == confirmpassword.value) {
        this.setState({
            staffId: staffId,
            password: this.state.password,
          
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({       
                staffId: staffId,       
                password: this.state.password,
                companyId:this.state.companyId,

            }),
            url: "http://52.66.243.218:8080/ERPDetails/admin/updatePassword",
             contentType: "application/json",
            dataType: 'json',


            success: function (data, textStatus, jqXHR) {
                localStorage.setItem('Password', CryptoJS.AES.encrypt(self.state.password, "shinchanbaby"));
				
                confirmAlert({
                    title: 'Password Reset Done ',                        // Title dialog
                    message: 'Changed the Password  Successfully ',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                });

                ReactDOM.render(
                    <Router>
                        <div>

                        <Route path="/" component={() => <ChangePassword1 />} />

                            </div>
                    </Router>, document.getElementById('contentRender'));
                registerServiceWorker();


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
    
        else {
            confirmAlert({
                title: 'Password Reset Failed',                        // Title dialog
                message: 'Resetting Password Failed Because Passwords Are Not  Same',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm


            });



        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ChangePassword1} />
                 
                </div>
            </Router>,
            document.getElementById('contentRender'));
    }
}

ChangePassword(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={ChangePassword1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
  }
  AddRole(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={AddRole} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
  }
  AdminAddUser(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={AdminAddUser} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

  }
  cancelFunc() {
       
    ReactDOM.render(<ChangePassword1 />, document.getElementById("contentRender"));
}
BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
        
          <Route path="/" component={Dashboardoverall} />
        
  
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
    render() {
        return(
            <div class="container">
                 <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
     <ul class="nav nav-tabs">
    <li><a  style={{color:"black",fontWeight:"bold"}}  className="active" onClick={() => this.AdminAddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.ChangePassword()}><span style={{display:"inline-grid"}}>Change Password</span></a></li>
    <li ><a  style={{color:"black",fontWeight:"bold"}} onClick={() => this.AddRole()}><span style={{display:"inline-grid"}}>Add Role</span></a></li>
    </ul>

                        <div class="card">
                        <div class="card-header" style={{backgroundColor:""}}>
                    <h4 style={{fontWeight:"300",fontSize:"30px"}}>Change Password</h4>
                <hr></hr>  </div>
                 
                  <div class="card-body">
                   <form class="form-horizontal form-bordered" >
                   <div className="form-group" >
						<label className="control-label col-sm-2" htmlFor="password">NewPassword:</label>
                        <div class="col-sm-10">
						<input type="password" value={this.state.password}
							onChange={this.handleUserInput}
							name="password"
							id="password"
							className="form-control"
							required=""
							placeholder="Enter password" />
                            </div>
					</div>



					<div className="form-group">
						<label class class="control-label col-sm-2" htmlFor="confirmpassword">Confirm Password:</label>
                        <div class="col-sm-10">
                        <input type="password"
                            name="confirmpassword"
							id="confirmpassword"
							className="form-control"
							placeholder="Confirm Password " />
                            </div>

					</div>
                    <div class="form-group"> 
                    <div class="col-sm-offset-2 col-sm-10">
					<button style={{fontWeight:"bold"}} type="button" onClick={() => this.Passwordverify()} class="btn btn-primary">Reset Password</button><span> </span>
                    <button style={{fontWeight:"bold"}} type="button"  onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                       </div></div>
              </form></div>
            
              </div> </div>
                    );
    }

}
export default ChangePassword1;