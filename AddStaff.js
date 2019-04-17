import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import './gstdashboard.css';
import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import Estimate from './Estimate';
import PurchaseInvoice from './PurchaseInvoice';
import CustomerList from './CustomerList';
import Expense from './Expense';
import AddProduct from './AddProduct';
import PurchaseInvoiceList from './PurchaseInvoice';
import EstimateList from './EstimateList';
import InvoiceList from './InvoiceList';
import Dashboardoverall from './Dashboardoverall';
class AddStaff extends Component {
    constructor() {
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
        this.state = {
            staffName: '',
            address: '',
            contactNo: '',
            dob: '',           
            city: '',
            gender:'',
            date: date,
            nationality:'',
            roleName:'',
            salary:'',
            joiningDate:'',
            email:'',
            formErrors: {
                staffName: '',
                address: '',
                contactNo: '',                        
                city: '',
                gender:'',      
                nationality:'',            
                salary:'',
                email:'',          
               
            },
            staffNameValid: false,
            addressValid: false,
            contactNoValid: false,
            salaryValid: false,          
            nationalityValid: false,      
            emailValid:false,
        }
        this.setState({
            date: date,      
          })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let staffNameValid = this.state.staffNameValid;
        let addressValid = this.state.addressValid;
        let contactNoValid = this.state.contactNoValid;
        let salaryValid = this.state.salaryValid;     
        let nationalityValid = this.state.nationalityValid;
        let emailValid =this.state.emailValid;

        switch (fieldName) {
            case 'staffName':
            staffNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.staffName = staffNameValid ? '' : ' is InCorrect';
                break;
            case 'nationality':
            nationalityValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.nationality = nationalityValid ? '' : ' is InCorrect';
                break;
          
         
            case 'address':
                addressValid = value.length >= 5;
                fieldValidationErrors.address = addressValid ? '' : ' is too short';
                break;
       
            case 'contactNo':
                contactNoValid = value.length <= 10;
                fieldValidationErrors.contactNo = contactNoValid ? '' : ' is InCorrect';
                break;

            case 'salary':
                salaryValid = value.length >= 2;
                fieldValidationErrors.salary = salaryValid ? '' : ' is too short';
                break;

            
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is InCorrect';
                break;
                
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            staffNameValid: staffNameValid,
            addressValid: addressValid,
            contactNoValid: contactNoValid,
            salaryValid: salaryValid,
           
            nationalityValid: nationalityValid,
       
            emailValid:emailValid
        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:
       
                this.state.staffNameValid              
                && this.state.addressValid
                && this.state.contactNoValid
                && this.state.salaryValid
                && this.state.nationalityValid              
                && this.state.emailValid
                    
     });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    AddStaffFunc() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        if (this.state.address.trim().length > 2) {
  
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    staffName: this.state.staffName,
                    address: this.state.address,
                    city: this.state.city,
                    contactNo: this.state.contactNo,
                    dob: this.state.dob,
                    gender:this.state.gender,                   
                    nationality: this.state.nationality,
                    salary: this.state.salary,
                    date:this.state.date,
                    roleName: this.state.roleName,     
                    email:this.state.email, 
                    companyId:this.state.companyId,
             }),
                url: "http://52.66.243.218:8080/ERPDetails/staff/addstaff",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.contactNo == "Mobile") {
                        confirmAlert({
                            title: 'Cant Add Employee',                        // Title dialog
                            message: 'The Mobile Number Already Exists',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
    
                        });
    
    
                    } 
                    else if (data.email == "Email") {
                        confirmAlert({
                            title: 'Cant Add Employee',                        // Title dialog
                            message: 'The EmailId is Already Exists',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
    
                        });
    
    
                    }
                    else {
                    confirmAlert({
                        title: 'Success',                        // Title dialog
                        message: 'Successfully Added staff Details',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });

                    self.state.staffName = "";
                    self.state.nationality = "";
                    self.state.address = "";
                    self.state.contactNo = "";
                    
                    self.state.dob = "";
                    self.state.salary = "";
                    self.state.joiningDate = "";
                    self.state.email="";
                    self.state.city="";
                    self.state.formValid=false;

                  //  $('[name=city]').val('');
                    $('[name=gender]').val('');
                    $('[name=roleName]').val('');

                    self.setState({
                        staffName: '',
            address: '',
            contactNo: '',
            dob: '',           
            city: '',
            gender:'',
       
            nationality:'',
            roleName:'',
            salary:'',
            joiningDate:'',
            email:'',
            formValid:false,

                    });
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={AddStaff} />
                            </div>
                        </Router>, document.getElementById('contentRender'));


                
                }
                    
                },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                },
            });
        } else {
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'address Should Contain Atleast 10 Character',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });

        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    componentDidMount() {
        var roleName;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
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
              console.log("data",data)
   
        roleName += '<option disabled selected hidden >Select a role</option>';
        
        $.each(data.roleRetrievelist, function (i, item) {
         roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'
        });
        $("#roleName").append(roleName);
       
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

    cancelFunc() {
        //$('[name=city]').val('');
        $('[name=gender]').val('');
        $('[name=roleName]').val('');
        ReactDOM.render(<AddStaff />, document.getElementById("contentRender"));
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
        return (

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
                <div class="card" style={{ width: "100%"}}>     
                <div class="card-header">
         <h3 style={{fontWeight:"300",color:"black"}}>Add Employee</h3>
         <hr></hr>   </div>                 
                    <div>
                        <div class="card-body">
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered" name="submissions" action="/action_page.php">
                                <div className={`form-group ${this.errorClass(this.state.formErrors.staffName)}`}>
                                    <label class="control-label col-sm-2" for="staffName">Employee Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="staffName" name="staffName" value={this.state.staffName} onChange={this.handleUserInput} placeholder="Staff Name" />
                                    </div>
                                </div>                              
                                <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                                    <label class="control-label col-sm-2" for="address">address</label>
                                    <div class="col-sm-10">
                                        <textarea rows="2" cols="20" class="form-control" name="address" value={this.state.address} onChange={this.handleUserInput} id="address" placeholder="address"> </textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="city">State<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} id="city" placeholder="State Name" />
                                
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                    <label  style={{fontWeight:"bold"}} class="control-label col-sm-2" for="email">Email ID<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} id="email" placeholder="Email ID" />
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
                                    <label class="control-label col-sm-2" for="contactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" maxlength="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
                                    </div>
                                </div>
                                <div class="form-group">
                                <label for="dob" class="control-label col-sm-2" > DOB<span style={{ color: "red" }}>*</span></label>
                    <div class="col-sm-10">                 
                        <input type="date" onChange={this.handleUserInput} id="dob" name="dob" placeholder="Your DOB.."
                            value={this.state.dob}
                            required /></div></div>
                       <div class="form-group">
                                    <label class="control-label col-sm-2" for="gender">gender<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <select name="gender" id="gender" onChange={this.handleUserInput} class="form-control">
                                            <option selected="selected"  disabled selected hidden  value="--Select--">--Select--</option>                                         
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div> 
                         
                                <div className={`form-group ${this.errorClass(this.state.formErrors.nationality)}`}>
                                    <label class="control-label col-sm-2" for="nationality"> nationality<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" name="nationality" value={this.state.nationality} onChange={this.handleUserInput} id="nationality" placeholder="nationality" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="roleName">Designation<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                    <select id="roleName" className="form-control" onChange={this.handleUserInput} name="roleName">
                                    </select>
                                    </div>
                                </div> 
                            
                                <div className={`form-group ${this.errorClass(this.state.formErrors.salary)}`}>
                                    <label class="control-label col-sm-2" for="salary">salary<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" name="salary" value={this.state.salary} onChange={this.handleUserInput} id="salary" placeholder="salary" />
                                    </div>
                                </div>
        
                              
                           
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button type="button" disabled={!this.state.formValid} onClick={() => this.AddStaffFunc()} style={{ backgroundColor: "#007bff" }} class="btn btn-default">Submit</button> <span></span>
                                            <button type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div></div>
            </div>
        );
    }
}

export default AddStaff;