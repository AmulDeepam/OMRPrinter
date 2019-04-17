import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './gstdashboard.css';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import CryptoJS from 'crypto-js';
import CustomerList from './CustomerList';

var id;
var discount = 0;
var pay = 0;
class CustomerListEdit extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {

            customerName: this.props.customerName,
            companyName: this.props.companyName,
            address: this.props.address,
            contactNo: this.props.contactNo,
            city: this.props.city,
            alternateContactNo: this.props.alternateContactNo,
            gstNo: this.props.gstNo,
            email: this.props.email,
            customerId: this.props.customerId,


            oldCustomerName: this.props.oldCustomerName,
            oldCompanyName: this.props.oldCompanyName,
            oldAddress: this.props.oldAddress,
            oldContactNo: this.props.oldContactNo,
            oldCity: this.props.oldCity,
            oldAlternateContactNo: this.props.oldAlternateContactNo,
            oldGstNo: this.props.oldGstNo,
            oldEmail: this.props.oldEmail,



            date: date,
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }


    /*validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let discountValid  = this.state.discountValid ;
        let payValid  = this.state.payValid ;
         let paymentModeValid=this.state.paymentModeValid;
       
        switch (fieldName) {
            case 'discount':
        discountValid = value.match(/^(\d*\.)?\d+$/);
                fieldValidationErrors.disount = discountValid ? '' : ' is InCorrect';
                break;
            case 'pay':
                payValid = value.match(/^(\d*\.)?\d+$/);
                fieldValidationErrors.pay = payValid ? '' : ' is InCorrect';
                break;
          case 'paymentMode':
                paymentModeValid = value.length > 0;  
                fieldValidationErrors.paymentMode = paymentModeValid ? '' : ' is InCorrect';
                break;
    
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            discountValid: discountValid,
            payValid: payValid,
            paymentModeValid:paymentModeValid,
           
        }, this.validateForm);
    }
    validateForm() {
    
        this.setState({
            formValid:
                this.state.discountValid
                && this.state.payValid
                && this.state.paymentModeValid
            
    
        });
    }
    
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    
     */


    componentDidMount() {

        console.log("data passed" + this.props.customerId);
        //$("#submit").hide();
        // this.GetOrderDetails();



    }




    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value

        },
        );

    }




    UpdateSubmit() {

        var self = this;
       
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                customerName: self.state.customerName,
                companyName: self.state.companyName,
                address: self.state.address,
                contactNo: self.state.contactNo,
                city: self.state.city,
                alternateContactNo: self.state.alternateContactNo,
                gstNo: self.state.gstNo,
                email: self.state.email,
                customerId: self.state.customerId,


                oldCustomerName: self.state.oldCustomerName,
                oldCompanyName: self.state.oldCompanyName,
                oldAddress: self.state.oldAddress,
                oldContactNo: self.state.oldContactNo,
                oldCity: self.state.oldCity,
                oldAlternateContactNo: self.state.oldAlternateContactNo,
                oldGstNo: self.state.oldGstNo,
                oldEmail: self.state.oldEmail,

                companyId: this.state.companyId,

            }),
            url: "http://52.66.243.218:8080/ERPDetails/master/CustomerDetailsUpdate",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;

                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Customer Details Updated Successfully',               // Message dialog
                    confirmLabel: 'Ok',

                    // Text button confirm
                });

                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={CustomerList} />


                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
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



    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={CustomerList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
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
                        <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Customer Details Edit</h4>   </div>
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="customerName">Customer Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.customerName}
                                            id="customerName"
                                            name="customerName" readOnly />


                                    </div></div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="companyName">Company Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.companyName}
                                            id="companyName"
                                            name="companyName" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="contactNo">Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" /></div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="alternateContactNo">Alternate Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.alternateContactNo}
                                            id="alternateContactNo"
                                            name="alternateContactNo" />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="email">Email</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.email}
                                            id="email"
                                            name="email" />
                                    </div></div>


                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="address">address</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.address}
                                            id="address"
                                            name="address" />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">State</label>
                                    <div class="col-sm-10">

                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.city}
                                            id="city"
                                            name="city" />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gstNo">GST No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.gstNo}
                                            id="gstNo"
                                            name="gstNo" />
                                    </div></div>


                            </form>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" style={{ fontWeight: "bold" }} class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>

                            </div></div></div>


                </div></div>
        );
    }
}

export default CustomerListEdit;