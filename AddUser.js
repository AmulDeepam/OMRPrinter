import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormErrors } from './FormErrors';
import Expense from './Expense';
import AddCategory from './AddCategory';
import Dashboardoverall from './Dashboardoverall';
class AddUser1 extends Component {
    constructor(){
        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
        this.state={
            userName:'',
            contactNo:'',
            description:'',
            companyId:companyId,
            formErrors: {
                userName:'',
                contactNo:'',
                             
            },
            userNameValid: false,
            contactNoValid: false,
           
        }           
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let userNameValid = this.state.userNameValid;
        let contactNoValid = this.state.contactNoValid;
      
    

        switch (fieldName) {
            case 'userName':
            userNameValid = value.length >= 2;
                fieldValidationErrors.userName = userNameValid ? '' : ' is InCorrect';
                break;
            case 'contactNo':
                contactNoValid = value.length >= 2;
                fieldValidationErrors.contactNo = contactNoValid ? '' : ' is InCorrect';
                break;
                 

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            userNameValid: userNameValid,
            contactNoValid: contactNoValid,
           
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.userNameValid
                && this.state.contactNoValid
                                  

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
      }
    AddUserFunc()
    {  var self=this;

        if (this.state.userName.trim().length > 0 && this.state.contactNo.trim().length > 0 ) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                userName: this.state.userName,
                contactNo: this.state.contactNo,
                description:this.state.description,
                companyId:this.state.companyId,
          
             
            }),
            url: "http://52.66.243.218:8080/ERPDetails/expense/adduser",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.contactNo == "Mobile") {
                    confirmAlert({
                        title: 'Cant Add User',                        // Title dialog
                        message: 'The Mobile No  Already Exists',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                } else {
             confirmAlert({
                            title: 'Success',                        // Title dialog
                            message: 'Successfully Added user ',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                              });

                              ReactDOM.render(
                                <Router >
                                    <div>                          
                                        <Route path="/" component={AddUser1} /> 
                                        </div>
                                </Router>, document.getElementById('contentRender'));
                             self.state.userName = "";
                             self.state.contactNo = "";
                             self.state.description = "";
                             self.state.formValid=false;
                             self.setState({
                                userName: '',
                                contactNo: '',
                                description: '',        
                                formValid:false,           
                            })
                            
                            }
                            $("#tableHeadings").empty();
                            self.Initialize();
                            $("#nodata").hide();
                 

      
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
            message: 'Enter User Name and Contact No',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
      }
      Initialize(){    
        var self=this;
        $("#nodata").hide();
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId:this.state.companyId,
                
              }),
           url: "http://52.66.243.218:8080/ERPDetails/expense/userreport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
      
            success: function (data, textStatus, jqXHR) {
                var no;
              console.log("data",data)
              if(data.userRetrievelist.length!=0){
          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>UserName</th><th>Contact</th><th>Description</th><th>Actions</th></tr></thead>';
          $.each(data.userRetrievelist, function (i, item) {
            no=parseInt(i)+1;
            tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.userName + '</td><td>' + item.contactNo + '</td><td>' + item.description + '</td><td><button id="delete">Delete</button></td></tr></tbody>';
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

    DeleteFunc(currentRow)
  {
      var self=this;
  
      $.ajax({
          type: 'POST',
          data: JSON.stringify({
            userName:self.state.userName,
            companyId:this.state.companyId,
            
          }),
         url: "http://52.66.243.218:8080/ERPDetails/expense/deleteuser",
          contentType: "application/json",
          dataType: 'json',
          async: false,
    
          success: function (data, textStatus, jqXHR) {
  
              currentRow.remove();
  
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
      componentDidMount() {    
        var self=this;  
        window.scrollTo(0, 0);  
        $("#nodata").hide();  
        this.Initialize();
        $("#tableHeadings").on('click', '#delete', function () {
            // get the current row
          
               var currentRow = $(this).closest("tr");
               console.log("cr",currentRow);
        var userName=currentRow.find("td:eq(1)").html();  
        
        self.state.userName = userName;  
        
          
            self.setState({
        
                userName:self.state.userName,
          
          
        
            })
            console.log("console userName",self.state.userName);
        
        self.DeleteFunc(currentRow);
        
          });
    $('#CategoryDate').datepicker({ 
       onSelect: function(date) {
         var dt = new Date(date);
            self.setState({
        date:date,
        dateValid:true,
       });
        
     },
     
     dateFormat: 'yy/mm/dd',
     minDate: '-3M', 
     maxDate: '-1D',
    numberOfMonths:1 } );
}
Expense(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={Expense} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}
AddCategory(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={AddCategory} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}
AddUser(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={AddUser1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}

cancelFunc() {
       
    ReactDOM.render(<AddUser1 />, document.getElementById("contentRender"));
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
    <li><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.Expense()}><span style={{display:"inline-grid"}}>Expense</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>Add Category</span></a></li>
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
                    
  </ul>
            <div class="card">
      <div class="card-header" style={{backgroundColor:""}}>
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Add User</h4>
      </div>
     
      <div class="card-body">
      <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

       <form class="form-horizontal form-bordered" action="/action_page.php">
  <div className={`form-group ${this.errorClass(this.state.formErrors.userName)}`}>
    <label class="control-label col-sm-2" for="userName">User Name<span style={{color:"red"}}>*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control" value={this.state.userName} onChange={this.handleUserInput} name="userName" id="userName" placeholder="User Name"/>
    </div>
    </div>
    <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
    <label class="control-label col-sm-2" for="contactNo"> Contact no.<span style={{color:"red"}}>*</span></label>
    <div class="col-sm-10"> 
      <input type="number" class="form-control"   maxlength="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
    </div>
  </div>
  <div className="form-group">
    <label class="control-label col-sm-2" for="description">description</label>
    <div class="col-sm-10"> 
    <textarea  rows="2" cols="20" class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" > </textarea>
    </div>
  </div>

 
  <div class="form-group"> 
  <div class="row" style={{marginLeft:"3px"}}>
    <div class="col-sm-offset-2 col-sm-10">
      <button type="button"  disabled={!this.state.formValid} style={{fontWeight:"bold"}} onClick={() => this.AddUserFunc()} class="btn btn-primary">Submit</button> <span></span>
      <button type="button"  style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
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
                    buttonText="Download User List"/>
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
export default AddUser1;