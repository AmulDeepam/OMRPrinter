import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import './gstdashboard.css';
import { FormErrors } from './FormErrors';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Dashboardoverall from './Dashboardoverall';
class Expense1 extends Component {
    constructor(){
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state={
            categoryName:'',
            date: date,
            userName:'',
            amount:'',
            companyId:companyId,
            dateValid:false,
            formErrors: {
                amount:'',                     
            },
            amountValid: false,
            
        }
        this.setState({
            date: date,
           }) 
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
     );
      }
   
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let amountValid = this.state.amountValid;
    

        switch (fieldName) {
            case 'amount':
                amountValid = value.length >= 0;
                fieldValidationErrors.amount = amountValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            amountValid: amountValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.amountValid                       

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
      
    AddExpenseFunc()
    {
       var self=this;
       if ((this.state.categoryName.length >0) && (this.state.userName.length >0) && (this.state.amount.length >0) ){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                categoryName: this.state.categoryName,
                userName:this.state.userName,
                amount:this.state.amount, 
                companyId:this.state.companyId,
             //   date: this.state.date,
             
                          
            }),
          
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addemployee",
            url: "http://52.66.243.218:8080/ERPDetails/expense/addexpense",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.categoryName == "CategoryName") {
                    confirmAlert({
                        title: 'Cant Add Category',                        // Title dialog
                        message: 'The categoryName Already Exists',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                } else {

             confirmAlert({
                            title: 'Success',                        // Title dialog
                            message: 'Successfully Added Expense ',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                              });
                              $("#tableHeadings").empty();
                              $("#userName").empty();
                              $("#categoryName").empty();
                              self.state.amount="";
                              self.state.date="";
                              self.setState({
                                amount: '',
                                date: '',
                                               
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
            message: 'Enter All Details',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
      }

      Initialize(){
          var self=this;
          var categoryName;
          var userName;
        $.ajax({
            type: 'POST', 
            data: JSON.stringify({
                companyId:this.state.companyId,
                
              }),    
            url: "http://52.66.243.218:8080/ERPDetails/expense/categoryreport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {      
             categoryName += '<option value ="" disabled selected hidden >Select categoryName</option>';
              $.each(data.categoryRetrievelist, function (i, item) {
                 categoryName += '<option value="' + item.categoryName + '">' + item.categoryName + '</option>'
              });
              $("#categoryName").append(categoryName);
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
         url: "http://52.66.243.218:8080/ERPDetails/expense/userreport",
         contentType: "application/json",
         dataType: 'json',
         async: false,
         success: function (data, textStatus, jqXHR) {      
             userName += '<option value ="" disabled selected hidden >Select userName</option>';
           $.each(data.userRetrievelist, function (i, item) {
             userName += '<option value="' + item.userName + '">' + item.userName + '</option>'
           });
           $("#userName").append(userName);
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
        url: "http://52.66.243.218:8080/ERPDetails/expense/expensereport",
         contentType: "application/json",
         dataType: 'json',
         async: false,
   
         success: function (data, textStatus, jqXHR) {
             var no;
           console.log("data",data)
           if(data.expenseRetrievelist.length!=0){
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th><th>Actions</th></tr></thead>';
       $.each(data.expenseRetrievelist, function (i, item) {
        no=parseInt(i)+1;
         tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td><td><button id="delete">Delete</button></td></tr></tbody>';
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
                categoryName:self.state.categoryName,
                companyId:this.state.companyId,
                
              }),
             url: "http://52.66.243.218:8080/ERPDetails/expense/deleteexpense",
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
        $("#nodata").hide();
          window.scrollTo(0, 0);      
         var self=this;
       self.Initialize();
       $("#tableHeadings").on('click', '#delete', function () {
        // get the current row
  
           var currentRow = $(this).closest("tr");
           console.log("cr",currentRow);
    var categoryName=currentRow.find("td:eq(1)").html();  
    
    self.state.categoryName = categoryName;  
    
      
        self.setState({
    
            categoryName:self.state.categoryName,
      
      
    
        })
        console.log("console categoryName",self.state.categoryName);
    
    self.DeleteFunc(currentRow);
    
      });
   
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
                <Route path="/" component={AddUser} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}
Expense()
{
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={Expense1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

cancelFunc() {
       
    ReactDOM.render(<Expense1 />, document.getElementById("contentRender"));
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
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.Expense()}><span style={{display:"inline-grid"}}>Expense</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>Add Category</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
                    
  </ul>
           
                        <div class="card">
                        <div class="card-header" style={{backgroundColor:""}}>
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Expense </h4>
      </div>
                 
                  <div class="card-body">
                  <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                   <form class="form-horizontal form-bordered" action="/action_page.php">
              <div class="form-group">
                <label class="control-label col-sm-2" for="categoryName">Category Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                <select id="categoryName" className="form-control" onChange={this.handleUserInput} name="categoryName"
                            style={{ marginBottom: "15px" }} >
                         
                          </select> 
                  </div>
                </div>
                <div class="form-group">
                <label class="control-label col-sm-2" for="userName">User Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
         
                <select id="userName" className="form-control" onChange={this.handleUserInput} name="userName"
                            style={{ marginBottom: "15px" }} >
                           
                          </select> 
                 </div>
                </div>
                <div class="form-group">
                <label class="control-label col-sm-2" for="amount">Amount<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
              
                  <input type="number" min="0" class="form-control" value={this.state.amount} onChange={this.handleUserInput} name="amount" id="amount" placeholder="amount"/>
                </div>
                </div>
            
              
                
              <div class="form-group"> 
              <div class="row" style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10" >
                  <button type="button" disabled={!this.state.formValid}  style={{fontWeight:"bold"}} onClick={() => this.AddExpenseFunc()}  class="btn btn-primary">Submit</button> <span></span>
                  <button type="button"  style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-primary">cancel</button>
                </div>
                </div>
              </div>
              </form></div>

                <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Expense List</h4>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Expense_List"
                    sheet="tablexls"
                    buttonText="Download Expense List"/>
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
export default Expense1;