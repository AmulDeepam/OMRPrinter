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
class ProductListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,

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
                        <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Product Details</h4>   </div>
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
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.productCategory}
                                            id="productCategory"
                                            name="productCategory" readOnly />
                                    </div></div>
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="unit">unit</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.unit}
                                            id="unit"
                                            name="unit" readOnly /></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="cgst">Cgst</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.cgst}
                                            id="cgst"
                                            name="cgst" readOnly />
                                    </div>
                                </div>
                            
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="sgst">Sgst</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.sgst}
                                            id="sgst"
                                            name="sgst" readOnly  />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="igst">Igst</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.igst}
                                            id="igst"
                                            name="igst" readOnly />
                                    </div></div>


                            

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">Individual Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.individualRate}
                                            id="individualRate"
                                            name="individualRate" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gstNo">Dealer Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.dealerRate}
                                            id="dealerRate"
                                            name="dealerRate" readOnly />
                                    </div></div>
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="hsnCode">Hsn Code</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.hsnCode}
                                            id="hsnCode"
                                            name="hsnCode" readOnly />
                                    </div></div>
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="description">Description</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.description}
                                            id="description"
                                            name="description" readOnly />
                                    </div></div>


                            </form>
                        </div>

                    </div>


                </div></div>
        );
    }
}

export default ProductListView;