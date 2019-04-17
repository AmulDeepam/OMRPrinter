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
import ProductList from './ProductList';

var id;
var discount = 0;
var pay = 0;
class PurchaseListEdit extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {

          
            productName: this.props.productName,
            unit: this.props.unit,
            cgst: this.props.cgst,
            sgst: this.props.sgst,
            igst: this.props.igst,
            hsnCode: this.props.hsnCode,
            individualRate: this.props.individualRate,
            dealerRate: this.props.dealerRate,
            description:this.props.description,
            productCategory:this.props.productCategory,    
            productId:this.props.productId,


            oldProductName: this.props.oldProductName,
            oldUnit: this.props.oldUnit,
            oldCgst: this.props.oldCgst,
            oldSgst: this.props.oldSgst,
            oldIgst: this.props.oldIgst,
            oldHsnCode:this.props.oldHsnCode,
            oldIndividualRate: this.props.oldIndividualRate,
            oldDealerRate: this.props.oldDealerRate,
            OldDescription:this.props.OldDescription,
            OldProductCategory:this.props.OldProductCategory,



            date: date,
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }



    componentDidMount() {

        console.log("data passed" + this.props.productId);
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
                productName: self.state.productName,
                unit: self.state.unit,
                cgst: self.state.cgst,
                sgst: self.state.sgst,
                igst: self.state.igst,
                hsnCode: self.state.hsnCode,
                individualRate: self.state.individualRate,
                dealerRate: self.state.dealerRate,
                description:self.state.description,
                productCategory:self.state.productCategory,    
                productId:self.state.productId,
                
                oldProductName: self.state.oldProductName,
                oldUnit: self.state.oldUnit,
                oldCgst: self.state.oldCgst,
                oldSgst: self.state.oldSgst,
                oldIgst: self.state.oldIgst,
                oldHsnCode: self.state.oldHsnCode,
                oldIndividualRate: self.state.oldIndividualRate,
                oldDealerRate: self.state.oldDealerRate,
                oldDescription:self.state.oldDescription,
                oldProductCategory:self.state.oldProductCategory,
                companyId: this.state.companyId,

            }),
            url: "http://52.66.243.218:8080/ERPDetails/master/ProductDetailsUpdate",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;

                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Product Details Updated Successfully',               // Message dialog
                    confirmLabel: 'Ok',

                    // Text button confirm
                });

                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ProductList} />


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

                    <Route path="/" component={ProductList} />


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
                        <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Edit Product Details</h4>   </div>
                    <div>
                        <div class="card-body">
                        <form class="form-horizontal form-bordered" >
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="customerName">Product Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productName}
                                            id="productName"
                                            name="productName" readOnly />
                                    </div></div>

                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="description">Product Category</label>
                                    <div class="col-sm-10">


            <select name="productCategory" id="productCategory" onChange={this.handleUserInput} value={this.state.productCategory} class="form-control">
            <option  disabled selected hidden value="">--Select--</option>
             <option value="sale">Sale</option>
                  <option value="purchase">Purchase</option>                                          
                   </select>
                                     
                                    </div></div>
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="unit">unit</label>
                                    <div class="col-sm-10">

                                    <select name="unit" id="unit" value={this.state.unit} onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>                                     
	<option value="Sqft">Sqft</option>
	<option value="Inch">Inch</option>
	<option value="Pcs">Pcs</option>
</select></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="cgst">Cgst</label>
                                    <div class="col-sm-10">
                                    <select name="cgst" id="cgst" value={this.state.cgst} onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>                                     
	<option value="0">0 %</option>
	<option value="5">5 %</option>
	<option value="6">6 %</option>
	<option value="9">9 %</option>
	<option value="12">12 %</option>
	<option value="18">18 %</option>
	<option value="28">28 %</option>
</select></div>
                                </div>
                            
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="sgst">Sgst</label>
                                    <div class="col-sm-10">

                                    <select name="sgst" id="sgst"     value={this.state.sgst} onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>    
	<option value="0">0 %</option>
	<option value="5">5 %</option>
	<option value="6">6 %</option>
	<option value="9">9 %</option>
	<option value="12">12 %</option>
	<option value="18">18 %</option>
	<option value="28">28 %</option>
</select>
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="igst">Igst</label>
                                    <div class="col-sm-10">
                                    <select name="igst" id="igst"   value={this.state.igst} onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>    
	<option value="0">0 %</option>
	<option value="5">5 %</option>
	<option value="6">6 %</option>
	<option value="9">9 %</option>
	<option value="12">12 %</option>
	<option value="18">18 %</option>
	<option value="28">28 %</option>
</select>
                                      
                                    </div></div>


                            

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">Individual Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.individualRate}
                                            id="individualRate"
                                            name="individualRate" />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gstNo">Dealer Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.dealerRate}
                                            id="dealerRate"
                                            name="dealerRate" />
                                    </div></div>
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="hsnCode">Hsn Code</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.hsnCode}
                                            id="hsnCode"
                                            name="hsnCode"  />
                                    </div></div>
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="description">Description</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.description}
                                            id="description"
                                            name="description" />
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

export default PurchaseListEdit;