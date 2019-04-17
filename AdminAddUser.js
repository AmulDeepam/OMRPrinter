import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import './gstdashboard.css';
import ChangePassword from './ChangePassword';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import AddRole from './AddRole';
import Dashboardoverall from './Dashboardoverall';
class AdminAddUser1 extends Component {
    constructor(){
        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
        this.state={
            roleName:'',
            userName:'',            
            email:'',
            companyId:companyId,
            password:'',
               }
      
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
     );
      }
      handleUserInputDate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value,
            categoryDateValid:true});
  
    }
    
      
    AdminAddUserFunc()
    {
       
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                roleName: this.state.roleName,
                userName: this.state.userName,
                email:this.state.email,
                password:this.state.password,   
                companyId:this.state.companyId,
             }),
          
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addemployee",
            url: "http://52.66.243.218:8080/ERPDetails/admin/addadminuser",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             confirmAlert({
                            title: 'Success',                        // Title dialog
                            message: 'Successfully Added user ',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                              });
                            
     
                    
              
                    ReactDOM.render(
                        <Router >
                            <div>                          
                                <Route path="/" component={AdminAddUser1} /> 
                                </div>
                        </Router>, document.getElementById('contentRender'));
                
      
            },
            error: function (data) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
      
            },
        });
      }

      
componentDidMount() {
    var self=this;
    var customerName;
    var roleName;
    window.scrollTo(0, 0);
    $("#nodata").hide(); 
    
    $.ajax({
      type: 'POST', 
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),  
      url: "http://52.66.243.218:8080/ERPDetails/admin/rolereport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
  
        roleName += '<option value ="" disabled selected hidden >Select a role</option>';
        $.each(data.roleRetrievelist, function (i, item) {
            roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'
        });
        $("#roleName").append(roleName);
  },
  error: function (data) {
    confirmAlert({
      title: 'No Internet',                        // Title dialog
      message: 'Network Connection Problem',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  
  }
  });

  $.ajax({
    type: 'POST',
    data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
   url: "http://52.66.243.218:8080/ERPDetails/admin/userreport",
    contentType: "application/json",
    dataType: 'json',
    async: false,

    success: function (data, textStatus, jqXHR) {
        var no;
      console.log("data",data)
      if(data.userRetrievelist.length!=0){
  var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Role</th><th>UserName</th><th>email</th></tr></thead>';
  $.each(data.userRetrievelist, function (i, item) {
    no=parseInt(i)+1;
    tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.roleName + '</td><td>' + item.userName + '</td><td>' + item.email + '</td></tr></tbody>';
  });
  $("#tableHeadings").append(tab);
      }
      else{
        $("#nodata").show();
        $("#test-table-xls-button").hide();
        $("#myInput").hide();
    }
},
error: function (data) {
  console.log("err");
  confirmAlert({
    title: 'No Internet',                        // Title dialog
    message: 'Network Connection Problem',               // Message dialog
    confirmLabel: 'Ok',                           // Text button confirm
  });

}
});
    }
      ChangePassword(){
        ReactDOM.render(
            <Router>
                <div>
      
                    <Route path="/" component={ChangePassword} />
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
      
                    <Route path="/" component={AdminAddUser1} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));

      }
      
      cancelFunc() {
       
        ReactDOM.render(<AdminAddUser1 />, document.getElementById("contentRender"));
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
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}  className="active" onClick={() => this.AdminAddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.ChangePassword()}><span style={{display:"inline-grid"}}>Change Password</span></a></li>
    <li ><a  style={{color:"black",fontWeight:"bold"}} onClick={() => this.AddRole()}><span style={{display:"inline-grid"}}>Add Role</span></a></li>
    </ul>
             
                        <div class="card">
                        <div class="card-header" style={{backgroundColor:""}}>
                    <h4 style={{fontWeight:"300",fontSize:"30px"}}>Add User</h4>
               <hr></hr>   </div>
                 
                  <div class="card-body">
                   <form class="form-horizontal form-bordered" action="/action_page.php">
              <div class="form-group">
                <label class="control-label col-sm-2" for="roleName">Role<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                <select id="roleName" className="form-control" onChange={this.handleUserInput} name="roleName"
                            style={{ marginBottom: "15px" }} >
                             </select> 
                  </div>
                </div>
                <div class="form-group">
                <label class="control-label col-sm-2" for="userName">Full Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
               
                <input type="text" class="form-control" value={this.state.userName} onChange={this.handleUserInput} name="userName" id="userName" placeholder="UserName"/>
             
                 </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" name="email" value={this.state.email}  onChange={this.handleUserInput} id="email" placeholder="Email ID" />
                </div>
             </div>
             <div className="form-group" >
						<label className="control-label col-sm-2" htmlFor="password">Password:<span style={{color:"red"}}>*</span></label>
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

              
                
              <div class="form-group"> 
              <div class="row">
                <div class="col-sm-offset-2 col-sm-10">
                  <button style={{fontWeight:"bold"}} type="button"  onClick={() => this.AdminAddUserFunc()} class="btn btn-primary">Submit</button> <span></span>
                  <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                </div>
                </div>
              </div>
              </form></div>
              <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>User List</h4>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="User_List"
                    sheet="tablexls"
                    buttonText="Download user List"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
       
        </div>
        <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>        
              </div> </div>
                    );
    }

}
export default AdminAddUser1;