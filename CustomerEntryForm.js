import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import './gstdashboard.css';
import Case from 'case';

import CryptoJS from 'crypto-js';
import SaleOrder from './SaleOrder';

class CustomerEntryForm1 extends Component {
    constructor() {
        super()
        this.state = {
            customerName: '',        
            contactNo: '',       
            formErrors: {
                customerName: '',
                contactNo: '',
           
            },
            customerNameValid: false,
            contactNoValid: false,        
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);      
   
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let customerNameValid = this.state.customerNameValid;        
        let contactNoValid = this.state.contactNoValid;       


        switch (fieldName) {
            case 'customerName':
                customerNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.customerName = customerNameValid ? '' : ' is InCorrect';
                break;
          
            case 'contactNo':
                contactNoValid = value.length <= 10;
                fieldValidationErrors.contactNo = contactNoValid ? '' : ' is InCorrect';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            customerNameValid: customerNameValid,
            contactNoValid: contactNoValid,         
       
        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:
                this.state.customerNameValid
                && this.state.contactNoValid           
          

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    AddCustomerFunc() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        if (this.state.contactNo.trim().length > 2) {
            
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    customerName: this.state.customerName,
                    contactNo: this.state.contactNo,
                    companyId:this.state.companyId,
                    
                }),
                url: "http://52.66.243.218:8080/ERPDetails/master/addcustomer",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.contactNo == "Mobile") {
                        confirmAlert({
                            title: 'Cant Add Customer',                        // Title dialog
                            message: 'The Mobile Number is Already Exists',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
    
                        });
    
    
                    } 
            else {
                    confirmAlert({
                        title: 'Success',                        // Title dialog
                        message: 'Successfully Added Customer Details',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                    self.state.customerName = "";
                    self.state.contactNo = "";
                    self.state.formValid=false;

                   // $('[name=city]').val('');

                    self.setState({
                        customerName: '',
                        contactNo: '',
                        formValid:false,

                    });
                     ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={CustomerEntryForm1} />
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
                message: 'Address Should Contain Atleast 2 Character',               // Message dialog
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
    cancelFunc() {
        this.state.customerName = "";        
        this.state.contactNo = ""; 
        ReactDOM.render(<CustomerEntryForm1 />, document.getElementById("contentRender"));
    }
    BackbtnFunc() {
        ReactDOM.render(
          <Router>
            <div>
            
              <Route path="/" component={SaleOrder} />
            
      
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

                <div class="card">     
                <div class="card-header">          
                        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Customer Entry Form</h4>   </div>              
                    <div>
                        <div class="card-body">
                            <div style={{color:"red"}} className="panel panel-default">
                                <FormErrors style={{color:"red"}} formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered" name="submissions">
                                <div className={`form-group ${this.errorClass(this.state.formErrors.customerName)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="customerName" name="customerName" value={this.state.customerName} onChange={this.handleUserInput} placeholder="Customer Name" />
                                    </div>
                                </div>
                      
                          
                                <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
                                    <label  style={{fontWeight:"bold"}} class="control-label col-sm-2" for="contactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control"  min="1" maxlength="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
                                    </div>
                                </div>
                            
                           
                               
                           

                                <div class="form-group">
                                    <div class="row"  style={{marginLeft:"2px"}}>
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button  style={{fontWeight:"bold"}} type="button" disabled={!this.state.formValid} onClick={() => this.AddCustomerFunc()} class="btn btn-primary">Submit</button> <span></span>
                                            <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
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

export default CustomerEntryForm1;