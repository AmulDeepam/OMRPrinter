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
import EstimateList from './EstimateList';
import CryptoJS from 'crypto-js';

var id;
var discount=0;
var pay=0;
class EstimateReportEdit1 extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    

    this.state = {
        date: date,
        discount:'0',
        pay:'0',
        paymentMode:'',
        dueAmount:this.props.balanceAmt,
        userName:this.props.userName,
        invoiceNo:this.props.invoiceNo,
        customerId:this.props.customerId,
        companyId:companyId,
        formErrors: {  
        discount:'',
        paymentMode:'',
        pay:'',
        },

        discountValid : false,
        payValid : false,
        paymentModeValid : false,
      

      };
      this.setState({
        date: date,
       }) 

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

var self=this;
$.ajax({
    type: 'POST',
    data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
   url: "http://52.66.243.218:8080/ERPDetails/EstimateReport/invoicepaymentreport",
    contentType: "application/json",
    dataType: 'json',
    async: false,

    success: function (data, textStatus, jqXHR) {
    
      console.log("data",data)
 var tab = '<thead><tr class="headcolor"><th>Date</th><th>Invoice</th><th>Customer Name</th><th>Due Amount</th><th>Discount</th><th>Pay</th><th>Balance</th></tr></thead>';
  $.each(data.invoicepaymentreportlist, function (i, item) {
  
    tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + item.date + '</td><td>' + item.invoiceNo + '</td><td>' + item.userName + '</td><td>' + item.dueAmount + '</td><td>' + item.discount + '</td><td>' + item.pay + '</td><td>' + item.balanceAmt + '</td></tr></tbody>';
  });
  $("#tableHeadings").append(tab);

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
   // this.GetOrderDetails();

}





handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state[name]=value;
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
        dueAmount:this.state.dueAmount,
        paymentMode:this.state.paymentMode,
        customerId:this.state.customerId,


    }));

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            invoiceNo:this.state.invoiceNo,
            userName:this.state.userName,
            balanceAmt:this.state.balanceAmt,
            discount:this.state.discount,
            pay:this.state.pay,
            date:this.state.date,
            dueAmount:this.state.dueAmount,
            paymentMode:this.state.paymentMode,
            customerId:this.state.customerId,
            companyId:this.state.companyId,
            
            
        }),
        url: "http://52.66.243.218:8080/ERPDetails/EstimateReport/EstimateReportEdit",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
       
            confirmAlert({
                title: 'Success',                        // Title dialog
                message: 'Successfully Updated Payment Details',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
       
             ReactDOM.render(
                <Router >
                    <div>
                        <Route path="/" component={EstimateList} />
                    </div>
                </Router>, document.getElementById('contentRender'));    
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
        message: 'Kindly Fill In All The Fields',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
}


}

BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
        
          <Route path="/" component={EstimateList} />
        
  
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  cancelFunc() {
  
    $('[name=paymentMode]').val('');

    ReactDOM.render(<EstimateReportEdit1 />, document.getElementById("contentRender"));
  }


render() {
    return (


        <div class="container" style={{height:"20px"}}>
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
                        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Invoice Payment</h4>   </div>              
                    <div>
                        <div class="card-body">
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered" name="submissions" >
     




 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="invoiceNo">Invoice<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="invoiceNo" name="invoiceNo" value={this.state.invoiceNo} onChange={this.handleUserInput} readOnly />
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
<label class="control-label col-sm-2 font-weight-bold" for="balanceAmt">Balance<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-10">
    <input type="text" class="form-control" id="balanceAmt" name="balanceAmt" value={this.state.balanceAmt} onChange={this.handleUserInput} readOnly/>
</div>
</div>

   <div class="form-group">
                                    <div class="row" style={{marginLeft:"2px"}} >
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button  style={{fontWeight:"bold"}} type="button"  onClick={() => this.Submit()} class="btn btn-primary">Submit</button> <span></span>
                                       <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                                     
                                       </div>
                                    </div>
</div>

</form>
 </div>
 <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Invoice Payment List</h4>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Payment_List"
                    sheet="tablexls"
                    buttonText="Download Payment List"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered"  id="tableHeadings">

          </table>
        </div>
       
        </div>
 </div>
</div></div>
);
}
}

export default EstimateReportEdit1;