import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
import $ from 'jquery';
import './datepicker.css';
import Expense from './Expense';
import './gstdashboard.css';
import AdminAddUser from './AdminAddUser'
import ChangePassword from './ChangePassword';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Dashboardoverall from './Dashboardoverall';
class AddRole1 extends Component {
    constructor(){
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
        this.state={
            date: date,
            roleName:'',

            formErrors: {
                roleName:'',                   
            },
            
           roleNameValid: false,

        }
        this.setState({
            date: date,
           }) 
      
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let roleNameValid = this.state.roleNameValid;
    

        switch (fieldName) {
            case 'roleName':
                roleNameValid = value.length >= 2;
                fieldValidationErrors.roleName = roleNameValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            roleNameValid: roleNameValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.roleNameValid                       

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
     );
      }
 
    
      
    AddRoleFunc()
    {
    var self=this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
        companyId: companyId,
    });
    if (this.state.roleName.trim().length > 0) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                roleName: this.state.roleName,
                companyId:this.state.companyId,
          //      date: this.state.date
          
             
            }),
          
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addemployee",
            url: "http://52.66.243.218:8080/ERPDetails/admin/addrole",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.roleName == "RoleName") {
                    confirmAlert({
                        title: 'Cant Add Role',                        // Title dialog
                        message: 'The roleName Already Exists',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                } else {
             confirmAlert({
                            title: 'Success',                        // Title dialog
                            message: 'Successfully Added role ',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                              });  
                              self.state.roleName = "";
                              self.state.formValid=false;
                              self.setState({
                                roleName: '',
                                formValid:false,
                               })    
                                          
                            }
                            $("#tableHeadings").empty();
                            self.Initialize();
                
      
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
    else {
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Enter Role Name',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
      }

      componentDidMount() {
       window.scrollTo(0, 0);      
       this.Initialize();
    
       $("#nodata").hide(); 

    $(document).ready(function () {

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

    });
}
Initialize(){
    var self=this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            companyId:self.state.companyId,
            
          }),
       url: "http://52.66.243.218:8080/ERPDetails/admin/rolereport",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {
            var no;
          console.log("data",data)
          if(data.roleRetrievelist.length!=0){
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Role</th><th>Date</th></tr></thead>';
      $.each(data.roleRetrievelist, function (i, item) {
        no=parseInt(i)+1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.roleName + '</td><td>' + item.roleDate + '</td></tr></tbody>';
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
  
                <Route path="/" component={AddRole1} />
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
       
    ReactDOM.render(<AddRole1 />, document.getElementById("contentRender"));
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
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.ChangePassword()}><span style={{display:"inline-grid"}}>Change Password</span></a></li>
    <li  class="active"><a  style={{color:"black",fontWeight:"bold"}} onClick={() => this.AddRole()}><span style={{display:"inline-grid"}}>Add Role</span></a></li>
    </ul>

                        <div class="card">
                        <div class="card-header" style={{backgroundColor:""}}>
                    <h4 style={{fontWeight:"300",fontSize:"30px"}}>Add Role</h4><hr></hr>
                  </div>
                 
                  <div class="card-body">
                   <form class="form-horizontal form-bordered" >
                   <div className={`form-group ${this.errorClass(this.state.formErrors.roleName)}`}>
                <label class="control-label col-sm-2" for="roleName">Role Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={this.state.roleName} onChange={this.handleUserInput} name="roleName" id="roleName" placeholder="Role Name"/>
                </div></div>
              
              <div class="form-group"> 
              <div class="row"  style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10">
                  <button style={{fontWeight:"bold"}} type="button"  disabled={!this.state.formValid}  onClick={() => this.AddRoleFunc()} class="btn btn-primary">Submit</button> <span></span>
                  <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                </div>
                </div>
              </div>
              </form></div>
              <div style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Role List</h4>
<div>
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Role_List"
                    sheet="tablexls"
                    buttonText="Download Role List"/>
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
export default AddRole1;