import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import './gstdashboard.css';
import { FormErrors } from './FormErrors';
import Expense from './Expense';
import AddUser from './AddUser';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CryptoJS from 'crypto-js';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Dashboardoverall from './Dashboardoverall';
class AddCategory1 extends Component {
    constructor(){
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
        this.state={
            date: date,
            categoryName:'',
            companyId:companyId,
            
            formErrors: {
                categoryName:'',                   
            },
            
        }
        this.setState({
            date: date,
           }) 
      
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let categoryNameValid = this.state.categoryNameValid;
    

        switch (fieldName) {
            case 'categoryName':
                categoryNameValid = value.length >= 2;
                fieldValidationErrors.categoryName = categoryNameValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            categoryNameValid: categoryNameValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.categoryNameValid                       

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
      handleUserInputDate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value,
           });
  
    }
    
      
    AddCategoryFunc()
    {
       var self=this;
       if (this.state.categoryName.trim().length > 0) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                categoryName: this.state.categoryName,
               // date: this.state.date,
          companyId:this.state.companyId,
             
            }),
          
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addemployee",
            url: "http://52.66.243.218:8080/ERPDetails/expense/addcategory",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.categoryName == "CategoryName") {
                    confirmAlert({
                        title: 'Cant Add category',                        // Title dialog
                        message: 'The categoryName '+data.categoryName  + ' Already Exists',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                } else {
             confirmAlert({
                            title: 'Success',                        // Title dialog
                            message: 'Successfully Added Expense ',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                              });

                              self.state.categoryName = "";
                              self.state.formValid=false;

                              self.setState({
                                   categoryName: '',
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
            message: 'Enter Category Name',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
      }
    
 componentDidMount() {
    window.scrollTo(0, 0);    
    $("#nodata").hide();  
   var self=this;
     this.Initialize();
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

Initialize(){
    var self=this;
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
            var no;
          console.log("data",data)
          if(data.categoryRetrievelist.length!=0){
     var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>Date</th><th>Actions</th></tr></thead>';
      $.each(data.categoryRetrievelist, function (i, item) {
        no=parseInt(i)+1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.categoryDate + '</td><td><button id="delete">Delete</button></td></tr></tbody>';
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
         url: "http://52.66.243.218:8080/ERPDetails/expense/deletecategory",
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
                <Route path="/" component={AddCategory1} />
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
cancelFunc() {
       
    
    ReactDOM.render(<AddCategory1 />, document.getElementById("contentRender"));
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
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>Add Category</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
                    
  </ul>

                        <div class="card">
                  <div class="card-header" style={{backgroundColor:""}}>
                    <h4 style={{fontWeight:"300",fontSize:"30px"}}>Add Category</h4>
                  </div>
                 
                  <div class="card-body">
                  <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                   <form class="form-horizontal form-bordered">
              <div className={`form-group ${this.errorClass(this.state.formErrors.categoryName)}`}>
                <label class="control-label col-sm-2" for="categoryName">Category Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={this.state.categoryName} onChange={this.handleUserInput} name="categoryName" id="categoryName" placeholder="Category Name"/>
                </div></div>
             
              <div class="form-group"> 
              <div class="row" style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="button"   disabled={!this.state.formValid}  style={{fontWeight:"bold"}} onClick={() => this.AddCategoryFunc()} class="btn btn-primary">Submit</button> <span></span>
                  <button type="button"  style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                </div>
                </div>
              </div>
              </form></div>
              <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Category List</h4>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Category_List"
                    sheet="tablexls"
                    buttonText="Download Category List"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered"  id="tableHeadings">

          </table>
        </div>
       
        </div>
        <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>  
              </div> </div>
                    );
    }

}
export default AddCategory1;