import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Website from './Website';
import './gstdashboard.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
import { FormErrors } from './FormErrors';
import CustomerList from './CustomerList';
import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import InvoiceList from './InvoiceList';
import Estimate from './Estimate';
import EstimateList from './EstimateList';
import PurchaseInvoice from './PurchaseInvoice';
import PurchaseInvoiceList from './PurchaseInvoice';
import Dashboardoverall from './Dashboardoverall';

import Expense from './Expense';


class AddProduct1 extends Component {
  constructor() {
    super()
    this.state = {
      productName:'',
      productCategory:'',
      unit:'',
      cgst:'',
      sgst:'',
      igst:'',
      hsnCode:'',
      dealerRate:'',
      individualRate:'',
      description:'',
      formErrors: {
        productName:'',
        productCategory:'',       
        unit:'',
        cgst:'',
        sgst:'',
        igst:'',      
        dealerRate:'',
        individualRate:'', 
    },
    productNameValid: false,
    ProductCategoryValid:false,
    unitValid: false,
    cgstValid: false,
    sgstValid: false,
    igstValid: false,
    dealerRateValid:false,
    individualRateValid:false 
   }
}

handleOptionChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  $("input[value='" + value + "']").prop('checked', true);
  this.GetData(value);

}
handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({ [name]: value },
      () => { this.validateField(name, value) });
}

validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let productNameValid = this.state.productNameValid;  
  let dealerRateValid = this.state.dealerRateValid;
  let individualRateValid = this.state.individualRateValid;
  

  switch (fieldName) {
      case 'productName':
          productNameValid = value.length >= 2;
          fieldValidationErrors.productName = productNameValid ? '' : ' is InCorrect';
          break;
      case 'individualRate':
          individualRateValid = value.length >= 1;
          fieldValidationErrors.individualRate = individualRateValid ? '' : ' is InCorrect';
          break; 
     case 'dealerRate':
          dealerRateValid = value.length >= 1;
          fieldValidationErrors.dealerRate = dealerRateValid ? '' : ' is InCorrect';
          break; 
      default:
          break;
  }
  this.setState({
      formErrors: fieldValidationErrors,
      productNameValid: productNameValid,
      dealerRateValid:dealerRateValid,
      individualRateValid:individualRateValid,
  }, this.validateForm);
}
validateForm() {

  this.setState({
      formValid:
             this.state.productNameValid
            && this.state. individualRateValid 
           && this.state.dealerRateValid
    
      

         
  });
}

errorClass(error) {
  return (error.length === 0 ? '' : 'has-error');
}

componentDidMount(){
  window.scrollTo(0, 0);      
   
}
AddProductFunc(){
  var self = this;
  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
if(this.state.productName.trim().length > 0){
  $.ajax({
      type: 'POST',
      data: JSON.stringify({
      productName: this.state.productName,
      unit: this.state.unit,
      cgst: this.state.cgst,
      sgst: this.state.sgst,
      igst: this.state.igst,
      hsnCode: this.state.hsnCode,  
      rate: this.state.rate,
      description: this.state.description,
      productCategory:this.state.productCategory, 
      individualRate:this.state.individualRate,
      dealerRate:this.state.dealerRate,
      companyId:this.state.companyId,
       
      }),
      url: "http://52.66.243.218:8080/ERPDetails/master/addproduct",               
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data.productName == "ProductName") {
          confirmAlert({
              title: 'Cant Add product',                        // Title dialog
              message: 'The product name is Already Exists',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm

          });


      } 
  else {

       confirmAlert({
                      title: 'Success',                        // Title dialog
                      message: 'Successfully Added Product ',               // Message dialog
                      confirmLabel: 'Ok',                           // Text button confirm
                        });

                        self.state.productName = "";
                        self.state.description = "";
                        self.state.dealerRate = "";             
                        self.state.hsnCode = "";
                        self.state.individualRate = "";
                        self.state.formValid=false;
                        
          
                        $('[name=unit]').val('');
                        $('[name=cgst]').val('');
                        $('[name=sgst]').val('');
                        $('[name=igst]').val('');
                        $('[name=productCategory]').val('');
                        
                        self.setState({
                          productName:'',
                          description:'',
                          individualRate:'',
                          dealerRate:'',
                          hsnCode:'',
                          productCategory:'',
                          unit:'',
                          cgst:'',
                          sgst:'', 
                          igst:'',
                          formValid:false,
                        });
                        ReactDOM.render(
                            <Router >
                                <div>                          
                                    <Route path="/" component={AddProduct1} /> 
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
}else{
  confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Enter Product Name',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

}
}
cancelFunc() {
  $('[name=unit]').val('');
  $('[name=cgst]').val('');
  $('[name=sgst]').val('');
  $('[name=igst]').val('');
  $('[name=productCategory]').val('');
  this.state.productName = "";
  this.state.description = "";
  this.state.dealerRate = "";             
  this.state.hsnCode = "";
  this.state.individualRate = "";
  ReactDOM.render(<AddProduct1 />, document.getElementById("contentRender"));
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


      <div class="card">
      <div class="card-header" style={{backgroundColor:""}}>
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Product Entry Form</h4>
      </div>
      <div>
      <div class="card-body">
      <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
       <form class="form-horizontal form-bordered" action="/action_page.php">
  <div className={`form-group ${this.errorClass(this.state.formErrors.productName)}`}>
    <label class="control-label col-sm-2" for="productName">Product Name<span style={{color:"red"}}>*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control" value={this.state.productName} onChange={this.handleUserInput} name="productName" id="productName" placeholder="Product Name"/>
    </div>
  </div>
  <div class="form-group">
      <label class="control-label col-sm-2" for="productCategory">Product Category<span style={{ color: "red" }}>*</span></label>
        <div class="col-sm-10">
            <select name="productCategory" id="productCategory" onChange={this.handleUserInput} class="form-control">
            <option  disabled selected hidden value="">--Select--</option>
             <option value="sale">Sale</option>
                  <option value="purchase">Purchase</option>                                          
                   </select>
                                    </div>
                                </div>
  
  <div class="form-group">
   <label class="control-label col-sm-2">Unit<span style={{color:"red"}}>*</span></label>  
   <div class="col-sm-10"> 
   <select name="unit" id="Unit" onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>                                     
	<option value="Sqft">Sqft</option>
	<option value="Inch">Inch</option>
	<option value="Pcs">Pcs</option>
</select>
   </div>
  </div>

 <div class="form-group">
   <label class="control-label col-sm-2">CGST<span style={{color:"red"}}>*</span></label>  
   <div class="col-sm-10"> 
   <select name="cgst" id="cgst"  onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>                                     
	<option value="0">0 %</option>
	<option value="5">5 %</option>
	<option value="6">6 %</option>
	<option value="9">9 %</option>
	<option value="12">12 %</option>
	<option value="18">18 %</option>
	<option value="28">28 %</option>
</select>
   </div>
  </div>
 <div class="form-group">
   <label class="control-label col-sm-2">SGST<span style={{color:"red"}}>*</span></label>  
   <div class="col-sm-10"> 
   <select name="sgst" id="sgst"  onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>    
	<option value="0">0 %</option>
	<option value="5">5 %</option>
	<option value="6">6 %</option>
	<option value="9">9 %</option>
	<option value="12">12 %</option>
	<option value="18">18 %</option>
	<option value="28">28 %</option>
</select>
   </div>
  </div>

   <div class="form-group">
   <label class="control-label col-sm-2">IGST<span style={{color:"red"}}>*</span></label>  
   <div class="col-sm-10"> 
   <select name="igst" id="igst"  onChange={this.handleUserInput} class="form-control">
   <option value="" disabled selected hidden>--Select--</option>    
	<option value="0">0 %</option>
	<option value="5">5 %</option>
	<option value="6">6 %</option>
	<option value="9">9 %</option>
	<option value="12">12 %</option>
	<option value="18">18 %</option>
	<option value="28">28 %</option>
</select>
   </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-2" for="hsnCode"> HSN Code</label>
    <div class="col-sm-10"> 
      <input type="text" class="form-control" value={this.state.hsnCode} onChange={this.handleUserInput} name="hsnCode" id="hsnCode" placeholder="HSN Code" />
    </div>
  </div>
  <div className={`form-group ${this.errorClass(this.state.formErrors.individualRate)}`}>
    <label class="control-label col-sm-2" for="individualRate"> Individual Rate (Rs)<span style={{color:"red"}}>*</span></label>
    <div class="col-sm-10"> 
      <input type="number"  min="0" class="form-control" value={this.state.individualRate} onChange={this.handleUserInput} name="individualRate" id="individualRate" placeholder="individualRate...  " />
    </div>
  </div>

  <div className={`form-group ${this.errorClass(this.state.formErrors.dealerRate)}`}>
    <label class="control-label col-sm-2" for="dealerRate">Dealer Rate (Rs)<span style={{color:"red"}}>*</span></label>
    <div class="col-sm-10"> 
      <input type="number"  min="0" class="form-control" value={this.state.dealerRate} onChange={this.handleUserInput} name="dealerRate" id="dealerRate" placeholder="dealerRate..  " />
    </div>
  </div>
  
  <div class="form-group">
    <label class="control-label col-sm-2" for="description">description</label>
    <div class="col-sm-10"> 
    <textarea  rows="2" cols="20" class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" > </textarea>
    </div>
  </div>

  <div class="form-group"> 
  <div class="row"  style={{marginLeft:"3px"}}>
    <div class="col-sm-offset-2 col-sm-10">
      <button style={{fontWeight:"bold"}} type="button" disabled={!this.state.formValid} onClick={() => this.AddProductFunc()} class="btn btn-primary">Submit</button> <span></span>
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

export default AddProduct1;