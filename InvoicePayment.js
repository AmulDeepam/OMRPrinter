import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Website from './Website';
import './gstdashboard.css';
import $ from 'jquery';
import VendorEntryForm from './VendorEntryForm';
import AddProduct from './AddProduct';
import CustomerList from './CustomerList';
import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import InvoiceList from './InvoiceList';
import Estimate from './Estimate';
import EstimateList from './EstimateList';
import PurchaseInvoice from './PurchaseInvoice';
import GSTQuotation from './GSTQuotation';
import PurchaseInvoiceList from './PurchaseInvoice';
import registerServiceWorker from './registerServiceWorker';
import Expense from './Expense';
import WithoutGSTQuotation from './WithoutGSTQuotation';
import QuotationList from './QuotationList';
import AddStaff from './AddStaff';
import StaffList from './StaffList';
import Salary from './Salary';
import SalaryReport from './SalaryReport';
import GST3B from './GST3B';
import AdminAddUser from './AdminAddUser';
import Attendance from './Attendance';
import EmailPage from './EmailPage';
import GSTR1 from './GSTR1';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';

var id;
var discount=0;
var pay=0;
class SalesReportEdit extends Component {

    constructor(props) {
        super(props)

    this.state = {
        
        discount:'0',
        pay:'0',
        paymentMode:'',
        dueAmount:this.props.balanceAmt,
        userName:this.props.userName,
        invoiceNo:this.props.invoiceNo,
        formErrors: {  
        discount:'',
        paymentMode:'',
        pay:'',
        },
        discountValid : false,
        payValid : false,
        paymentModeValid : false,
      

      };

}

validateField(fieldName, value) {
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




componentDidMount(){

    console.log("data passed"+this.props.id);
$("#submit").hide();
   // this.GetOrderDetails();

}


Payment(){

    ReactDOM.render(
        <Router>  
            <div>
	ReactDOM.render(<SalesReportEdit id={this.props.id}  />, document.getElementById("root"));
			
              
              </div>
        </Router>,
        document.getElementById('contentRender'));

}

AddProduct(){

}







handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
        () => { this.validateField(name, value) });

        this.state.balanceAmt='';

        $("#submit").hide();

        if(Number(this.state.discount) > Number(this.state.dueAmount)){
            discount=1;
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Discount Amount Exceeds The Due Amount',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });
        
        }

        if(Number(this.state.pay) > Number(this.state.dueAmount)){
            pay=1;
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Pay Amount Exceeds The Due Amount',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });
        }

        if(discount!=1 && pay!=1){
            var total=Number(this.state.dueAmount)-Number(this.state.discount)-Number(this.state.pay);
            this.state.balanceAmt=total;
            
            this.setState({
                balanceAmt:this.state.balanceAmt,
            })
}   

}




Submit(){

if((Number(this.state.pay))!=0 && this.state.paymentMode!=''){   

    console.log(JSON.stringify({
        invoiceNo:this.state.invoiceNo,
        userName:this.state.userName,
        balanceAmt:this.state.balanceAmt,
        discount:this.state.discount,
        pay:this.state.pay,
        date:this.state.date,
        dueAmount:this.state.dueAmount

    }));
    confirmAlert({
        title: 'Success',                        // Title dialog
        message: 'Amount Updated Successfully.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
    });

}else{
    confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Kindly Fill In All The Fields',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
}


}





render() {
    return (


        <div class="container" style={{height:"20px"}}>

<p>SALES REPORT EDIT</p>

  <ul class="nav nav-tabs">
<li class="active"><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.Payment()}><span style={{display:"inline-grid"}}>Payment</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddProduct()}><span style={{display:"inline-grid"}}>Add Product</span></a></li>
                    
  </ul>

 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="invoice">Invoice<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="invoioce" name="invoiceNo" value={this.state.invoiceNo} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>

 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="username" name="userName" value={this.state.userName} onChange={this.handleUserInput}readOnly />
                                    </div>
                                </div>

 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Due Amount<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="dueamount" name="dueAmount" value={this.state.dueAmount} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>


 <div className={`form-group ${this.errorClass(this.state.formErrors.discount)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Discount<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="discount" name="discount" value={this.state.discount} onChange={this.handleUserInput} />
                                    </div>
                                </div>

 <div className={`form-group ${this.errorClass(this.state.formErrors.pay)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Pay<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="pay" name="pay" value={this.state.pay} onChange={this.handleUserInput} />
                                    </div>
                                </div>


 <div className={`form-group ${this.errorClass(this.state.formErrors.paymentMode)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Payment Mode<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <select  class="form-control" id="paymentmode" name="paymentMode" value={this.state.paymentMode} onChange={this.handleUserInput} >
                                        <option value="" disabled selected>Select your option</option>     <option value="cash" >Cash</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="API">API</option>
                                        <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>



<div className="form-group">
<label class="control-label col-sm-2 font-weight-bold" for="customerName">Balance<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-10">
    <input type="text" class="form-control" id="balanceamt" name="balanceAmt" value={this.state.balanceAmt} onChange={this.handleUserInput} readOnly/>
</div>
</div>

   <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button  style={{fontWeight:"bold"}} type="button"  onClick={() => this.Submit()} class="btn btn-primary">Submit</button> <span></span>
                                       </div>
                                    </div>
</div>


 
</div>




);
}
}

export default SalesReportEdit;