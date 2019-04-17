import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Website from './Website';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './gstdashboard.css';
import './datepicker.css';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Case from "case";
import CryptoJS from 'crypto-js';
import Dashboardoverall from './Dashboardoverall';
import PurchaseInvoiceList from './PurchaseInvoiceList';
var numberToWord = require('npm-number-to-word');

var inputarray = [];
var testarray = [];
var vendorarray = [];
var rougharray = [];
var tablecontentarray = [];
var insertarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

class PurchaseInvoice1 extends Component {

  getInitialState() {
    return { height: '' }
  }
  constructor(data) {
    super(data)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      date: date,
      vendorName: '',
      contactNo: '',
 //   invoiceNo: '',
      orderNumber: '',
      invoiceDate: date,
      dueDate: date,
      productName: '',
      saleType: '',
      description: '',
      companyId:companyId,
      height: '',
      width: '',
      size: '',
      rate: '',
      amount: '',
      quantity: '1',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      invoiceData: '',
      finalAmount: 0,
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      TotalWithoutGST:0,
      totalgst: 0,
      balance_amount: '',
      adjustment: 0,
      discount: 0,
      shipping: 0,
      individualSale: '',
      dealerSale: '',
      payment_status: 'UnPaid',
      modalVendorName:'',
      modalContactNo:'',
      formErrors: {
        modalVendorName: '',

        modalContactNo: '',
      },
      modalVendorNameValid: false,
      modalContactNoValid: false,

    }
    this.setState({
      date: date,
    })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalVendorNameValid = this.state.modalVendorNameValid;
    let modalContactNoValid = this.state.modalContactNoValid;

    switch (fieldName) {
      case 'modalVendorName':
      modalVendorNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.modalVendorName = modalVendorNameValid ? '' : ' is InCorrect';
        break;

      case 'modalContactNo':
      modalContactNoValid = value.length == 10;
        fieldValidationErrors.modalContactNo = modalContactNoValid ? '' : ' is InCorrect';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      modalVendorNameValid: modalVendorNameValid,
      modalContactNoValid: modalContactNoValid,

    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.modalVendorNameValid
        && this.state.modalContactNoValid


    });
  }
errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
}
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
        () => { this.validateField(name, value) });
} 


handleUserHeightWidth = (e) => {

  const name = e.target.name;
  const value = e.target.value;

  var value1=value;
  var cleanNum ;


if(value1!=""){
 
  var isNumberDt=$.isNumeric(value1);
  if(isNumberDt!==false){
    var sign_data=Math.sign(value1);
  // alert("SIGN VALUE :"+sign_data);
    if(sign_data!=-1){

       cleanNum = value1.match(/^\d+\.?\d{0,2}/);
/*this.state[name] = cleanNum;
this.setState({ [name]: cleanNum });
*/
  if (value == "0") {
    alert("Value Cant Be Zero");
  }
  else {
    this.state[name] = cleanNum;
    this.setState({ [name]: cleanNum });
    this.handleUserHeightWidthComplete();
  }

    }else{

    //  $("#"+name).val(); // get current row 1st TD value
    this.state[name] = '';
    this.setState({ [name]: '' });
   /*   confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Negative Values Not Accepted',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
        */
    }
}else{

 // $("#"+name).val(); // get current row 1st TD value
 this.state[name] = '';
 this.setState({ [name]: '' });
/*  confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Kindly Enter An Number To Proceed',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
    });
    */
}

}else{

this.state[name] = '';
this.setState({ [name]: '' });
this.handleUserHeightWidthComplete();
}

}


handleUserHeightWidthComplete(){

  var self=this;

  if (this.state.unit == "Pcs") {
    self.state.size = 1;

    self.state.amount =Math.round( Number(self.state.size) * Number(self.state.rate));

    self.state.total =Math.round( Number(self.state.amount) * Number(self.state.quantity));


    self.state.finalAmount =Math.round( Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));

    self.state.totalgst_rs = Math.round(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));

    self.setState({
      size: self.state.size,
      amount: self.state.amount,
      total: self.state.total,
      finalAmount: self.state.finalAmount,
      totalgst_rs: self.state.totalgst_rs,


    });
  } else {

    this.state.size =Math.round( Number(this.state.height) * Number(this.state.width));

    this.state.amount = Math.round(Number(this.state.size) * Number(this.state.rate));

    this.state.total =Math.round( Number(this.state.amount) * Number(this.state.quantity));


    this.state.finalAmount =Math.round( Number(this.state.total) + ((0.01 * Number(this.state.cgsta)) * Number(this.state.total)) + (0.01 * Number(this.state.sgsta) * Number(this.state.total)) + (0.01 * Number(this.state.igsta) * Number(this.state.total)));

    this.state.totalgst_rs = Math.round(((0.01 * Number(this.state.cgsta)) * Number(this.state.total)) + (0.01 * Number(this.state.sgsta) * Number(this.state.total)) + (0.01 * Number(this.state.igsta) * Number(this.state.total)));


    this.setState({
      size: this.state.size,
      amount: this.state.amount,
      total: this.state.total,
      finalAmount: this.state.finalAmount,
      totalgst_rs: this.state.totalgst_rs,

    });
  }


}

  
AdjustmentShippingCalc = (e) => {

  const name = e.target.name;
  const value = e.target.value;
 
  var state_value=0;
  var value1=value;

  if(value1!=""){
    var isNumberDt=$.isNumeric(value1);
    if(isNumberDt!==false){
      var sign_data=Math.sign(value1);
    // alert("SIGN VALUE :"+sign_data);
      if(sign_data!=-1){

          var decimal_data = (value1 - Math.floor(value1)) !== 0; 
         // alert("DECIMAL DATA :"+decimal_data);
          if(decimal_data==false){
         
            this.state[name] = value1;
          this.setState({ [name]: value1 });
         
              }else{

             //   $("#"+name).val(); // get current row 1st TD value
             this.state[name] = 0;
             this.setState({ [name]: 0 });
            // alert("NO NUMBER FOR DECI");
          /*  confirmAlert({
                      title: 'Error',                        // Title dialog
                      message: 'Decimal Values Not Accepted',               // Message dialog
                      confirmLabel: 'Ok',                           // Text button confirm
                  });
                  */
              }
              
      }else{

      //  $("#"+name).val(); // get current row 1st TD value
      this.state[name] = 0;
      this.setState({ [name]: 0 });
       /* confirmAlert({
              title: 'Error',                        // Title dialog
              message: 'Negative Values Not Accepted',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
          }); */
      }
   //   alert("NO NUMBER IN -");
  }else{

   // $("#"+name).val(); // get current row 1st TD value
   this.state[name] = 0;
   this.setState({ [name]: 0 });
  /*  confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'Kindly Enter An Number To Proceed',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
      }); */
     // alert("NO NUMBER FOR CHAR");
  }

}else{
  this.state[name] = '';
  this.setState({ [name]: '' });

//   alert("NO NUMBER FOR EMPTY STRING ");
}


if(isNumberDt!=false  && sign_data!=-1  &&  decimal_data!=true){

  state_value=value1;
//  this.AdjustmentShippingCalcComplete(state_value,name);

  this.state[name] = state_value;

    var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

    this.state.finalAmountTotal=total;
    this.setState({
      name:state_value,
      finalAmountTotal:total,
    })
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));

}else{
  state_value=0;
 // this.AdjustmentShippingCalcComplete(state_value,name);

  this.state[name] = state_value;

    var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

    this.state.finalAmountTotal=total;
    this.setState({
      name:state_value,
      finalAmountTotal:total,
    })
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));

}






   /* this.state[name] = value;

    var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

    this.state.finalAmountTotal=total;
    this.setState({
      name:value,
      finalAmountTotal:total,
    })
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));
*/
   
}


  
    //Onchange For Advance
   /* AdjustmentShippingCalc = (e) => {
      const name = e.target.name;
      const value = e.target.value;
     
        this.state[name] = value;
  
        var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));
  
        this.state.finalAmountTotal=total;
        this.setState({
          name:value,
          finalAmountTotal:total,
        })
        var numtoword = numberToWord(Number(this.state.finalAmountTotal));
        $("#numWords").text(Case.capital(numtoword));
  
       
    }

*/
DiscountCalc = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  var state_value=0;
  var value1=value;

  if(value1!=""){
    var isNumberDt=$.isNumeric(value1);
    if(isNumberDt!==false){
      var sign_data=Math.sign(value1);
    // alert("SIGN VALUE :"+sign_data);
      if(sign_data!=-1){
          var decimal_data = (value1 - Math.floor(value1)) !== 0; 
       //   alert("DECIMAL DATA :"+decimal_data);
          if(decimal_data==false){
            this.state[name] = value1;
          this.setState({ [name]: value1 });
              }else{

             //   $("#"+name).val(); // get current row 1st TD value
             this.state[name] = 0;
             this.setState({ [name]: 0 });
            // alert("NO NUMBER FOR DECI");
          /*  confirmAlert({
                      title: 'Error',                        // Title dialog
                      message: 'Decimal Values Not Accepted',               // Message dialog
                      confirmLabel: 'Ok',                           // Text button confirm
                  });
                  */
              }
              
      }else{

      //  $("#"+name).val(); // get current row 1st TD value
      this.state[name] = 0;
      this.setState({ [name]: 0 });
       /* confirmAlert({
              title: 'Error',                        // Title dialog
              message: 'Negative Values Not Accepted',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
          }); */
      }
   //   alert("NO NUMBER IN -");
  }else{

   // $("#"+name).val(); // get current row 1st TD value
   this.state[name] = 0;
   this.setState({ [name]: 0 });
  /*  confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'Kindly Enter An Number To Proceed',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
      }); */
   //   alert("NO NUMBER FOR CHAR");
  }

}else{
  this.state[name] = '';
  this.setState({ [name]: '' });

//   alert("NO NUMBER FOR EMPTY STRING ");
}


if(isNumberDt!=false  && sign_data!=-1  &&  decimal_data!=true){

  state_value=value1;   
 this.state[name] = state_value;
 var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

 if (value > sum) {
  alert("Exceeds Balance" + value);
  state_value=0;
  this.state.discount = state_value;
  this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

  this.setState({
    discount: state_value,
    finalAmountTotal: this.state.finalAmountTotal,
  })

  var numtoword = numberToWord(Number(this.state.finalAmountTotal));

  $("#numWords").text(Case.capital(numtoword));

} else {
  this.state.discount = value;
  this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

  this.setState({
    discount: state_value,
    finalAmountTotal: this.state.finalAmountTotal,
  })
}
var numtoword = numberToWord(Number(this.state.finalAmountTotal));

$("#numWords").text(Case.capital(numtoword));




}else{
  state_value=0;
   this.state[name] = state_value;
   var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

   if (value > sum) {
    alert("Exceeds Balance" + value);
    this.state.discount = state_value;
    this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

    this.setState({
      discount: state_value,
      finalAmountTotal: this.state.finalAmountTotal,
    })
  
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));

    $("#numWords").text(Case.capital(numtoword));

  } else {
    this.state.discount = state_value;
    this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

    this.setState({
      discount: state_value,
      finalAmountTotal: this.state.finalAmountTotal,
    })
  }
  var numtoword = numberToWord(Number(this.state.finalAmountTotal));

  $("#numWords").text(Case.capital(numtoword));

}







 /* var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

 
  //If discount Exceeds the balance Amount
  if (value > sum) {
    alert("Exceeds Balance" + value);

  } else {
    this.state.discount = value;
    this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

    this.setState({
      discount: value,
      finalAmountTotal: this.state.finalAmountTotal,
    })
  }
  var numtoword = numberToWord(Number(this.state.finalAmountTotal));

  $("#numWords").text(Case.capital(numtoword));
*/
}


    //Onchange For Discount
   /* DiscountCalc = (e) => {
      const name = e.target.name;
      const value = e.target.value;
  
      var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));
  
     
      //If discount Exceeds the balance Amount
      if (value > sum) {
        alert("Exceeds Balance" + value);
  
      } else {
        this.state.discount = value;
        this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));
  
        this.setState({
          discount: value,
          finalAmountTotal: this.state.finalAmountTotal,
        })
      }
      var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    
      $("#numWords").text(Case.capital(numtoword));
  
    }
  
*/
  handleVendorDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.vendorName = value;

    rougharray.push(this.state.vendorName);
    console.log("test array", rougharray);

    this.setState({
      [name]: value,
      vendorNameValid: true
    });

    var self = this;
    for (var k = 0; k < vendorarray.length; k++) {
      var temp = JSON.parse(vendorarray[k]);
      console.log("inpy", temp.vendorName);
      if (temp.vendorName == this.state.vendorName) {

        self.state.orderNumber = temp.orderNumber + 1;
        self.state.vendorId = temp.vendorId;
        self.state.contactNo = temp.contactNo;
        if(temp.companyName== " " || temp.companyName=="null" || temp.companyName=="-" )
        {
          self.state.companyName=" "
        }
        else{
          self.state.companyName=temp.companyName;
        }
        self.setState({
          orderNumber: self.state.orderNumber,
          vendorId: self.state.vendorId,
          contactNo: self.state.contactNo,
          companyName:self.state.companyName,
        })

        break;
      }
    }

  }
  handleProductDetails = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.state.productName = value;

    testarray.push(this.state.productName);
    console.log("test array", testarray);

    this.setState({
      [name]: value,
      productNameValid: true
    });

    var self = this;


    for (var k = 0; k < inputarray.length; k++) {
      var temp = JSON.parse(inputarray[k]);

      if (temp.productName == self.state.productName) {
        this.state.unit = temp.unit;
        if (temp.unit == "Pcs") {


          $('#height').prop('disabled', true)
          $('#width').prop('disabled', true)

          /*  self.state.heightValid = "true";
           self.state.widthValid = "true ";
    */
          self.state.height = "";
          self.state.width = " ";
          self.state.size = 1;
          self.state.quantity = 1;
          self.state.amount = "";
          self.state.total = "";
          self.state.finalAmount = "";

          self.state.description = temp.description;
          self.state.rate = temp.rate;
          self.state.cgsta = temp.cgsta;
          self.state.sgsta = temp.sgsta;
          self.state.igsta = temp.igsta;

          self.setState({
            description: temp.description,
            rate: temp.rate,
            cgsta: temp.cgsta,
            sgsta: temp.sgsta,
            igsta: temp.igsta,

            height: "",
            width: "",
            size: "1",
            amount: "",
            quantity: "1",
            total: "",
            finalAmount: "",
            amount: "",

          })

          self.state.size = 1;

          self.state.amount =Math.round( Number(self.state.size) * Number(self.state.rate));

          self.state.total = Math.round(Number(self.state.amount) * Number(self.state.quantity));


          self.state.finalAmount =Math.round( Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));

          self.state.totalgst_rs =Math.round( Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
            + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
            + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));


          self.setState({
            size: self.state.size,
            amount: self.state.amount,
            total: self.state.total,
            finalAmount: self.state.finalAmount,
            totalgst_rs: self.state.totalgst_rs,


          });
          console.log(" handleProductDetails unit is pcs total", self.state.size, self.state.rate, self.state.amount, self.state.total, self.state.finalAmount);
          console.log(" handleProductDetails totalgst_rs", self.state.totalgst_rs);
        }
        else {

          $('#height').prop('disabled', false)
          $('#width').prop('disabled', false)

          self.state.height = "";
          self.state.width = "";
          self.state.size = "";
          self.state.quantity = 1;
          self.state.total = "";
          self.state.finalAmount = "";

          self.state.description = temp.description;
          self.state.rate = temp.rate;
          self.state.cgsta = temp.cgsta;
          self.state.sgsta = temp.sgsta;
          self.state.igsta = temp.igsta;

          self.setState({
            description: temp.description,
            rate: temp.rate,
            cgsta: temp.cgsta,
            sgsta: temp.sgsta,
            igsta: temp.igsta,

            height: "",
            width: "",
            size: "",
            total: "",
            finalAmount: "",
            amount: "",

          })



          this.state.size = Math.round(Number(this.state.height) * Number(this.state.width));
          this.state.amount = Math.round(Number(this.state.size) * Number(this.state.rate));
          this.state.total = Math.round(Number(this.state.amount) * Number(this.state.quantity));
          this.state.finalAmount = Math.round(Number(this.state.total) + ((0.01 * Number(this.state.cgsta)) * Number(this.state.total)) + (0.01 * Number(this.state.sgsta) * Number(this.state.total)) + (0.01 * Number(this.state.igsta) * Number(this.state.total)));
          this.state.totalgst_rs =Math.round( ((0.01 * Number(this.state.cgsta)) * Number(this.state.total)) + (0.01 * Number(this.state.sgsta) * Number(this.state.total)) + (0.01 * Number(this.state.igsta) * Number(this.state.total)));


          this.setState({
            size: this.state.size,
            amount: this.state.amount,
            total: this.state.total,
            finalAmount: this.state.finalAmount,
            totalgst_rs: this.state.totalgst_rs,


          });
          console.log("totalgst_rs handleProductDetails", self.state.totalgst_rs);
          console.log("  unit is pcs total handleProductDetails ", self.state.size, self.state.rate, self.state.amount, self.state.total, self.state.finalAmount);


          break;
        }
      }
    }

  }

  componentDidMount() {
    window.scrollTo(0, 0);

    $("#tableHeadings").hide();

    this.DeleteButton();

    var self = this;
    var vendorName;
    var productName;
    window.scrollTo(0, 0);
    vendorarray.length = 0;
    $('#dueDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#invoiceDate").datepicker("option", "maxDate", dt);
        self.setState({
          dueDate: date,
        });

      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: '3M',
      numberOfMonths: 1
    });
    $('#invoiceDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        $("#dueDate").datepicker("option", "minDate", dt);
        self.setState({
          invoiceDate: date,
        });
      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    $("#invoiceDate").datepicker().datepicker("setDate", new Date());
    $("#dueDate").datepicker().datepicker("setDate", new Date());
   
    $('#vendorName').html('');
    this.SelectVendor();
 // this.GetInvoiceNo();
  }
  SelectVendor(){
    var self = this;
    var vendorName;
    vendorarray=[];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
      url: "http://52.66.243.218:8080/ERPDetails/vendororder/selectvendor",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        vendorName += '<option value ="" disabled selected hidden >Select a vendor</option>';
        $.each(data.selectvendornamelist, function (i, item) {
          vendorName += '<option value="' + item.vendorName + '">' + item.vendorName + '</option>'
     
          if(item.vendorName.length==0)
          {
            self.state.vendorName=item.companyName;
            alert("inside empty if"+self.state.vendorName)
            self.setState({
              vendorName:self.state.vendorName,
             });
          }else{

            self.state.vendorName=item.vendorName;
            alert("inside else"+self.state.vendorName)
            self.setState({
              vendorName:self.state.vendorName,
             });
          }
          
       
        // alert(self.state.vendorName)
          var content = JSON.stringify({
          
            vendorName: item.vendorName,
            orderNumber: item.orderNumber,
            vendorId: item.vendorId,
            contactNo: item.contactNo,
            companyName:item.companyName,
          });

          vendorarray.push(content);

          console.log("afetr add", vendorarray)
        });
        $("#vendorName").append(vendorName);

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
  GetInvoiceNo(){
    var invoiceNumber;
    var self=this;
    $.ajax({

      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
      url: "http://52.66.243.218:8080/ERPDetails/vendororder/invoiceNo",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        $.each(data.selectInvoiceNoList, function (i, item) {
          self.state.invoiceNumber = item.invoiceNo;

          self.setState({
            invoiceNo: item.invoiceNo,
          })
        });


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
  handleIndividualSale = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.state.saleType = value;
    this.setState({
      [name]: value,
      saleTypeValid: true

    });
    $('#productName').html('');
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
    
    this.state.height = "";
    this.state.width = "";
    this.state.size = "";
    this.state.rate = "";
    this.state.amount = "";
    this.state.quantity = "";
    this.state.total = "";
    this.state.cgsta = "";
    this.state.sgsta = "";
    this.state.igsta = "";
    this.state.finalAmount = "";
    this.state.shipping =0;
    this.state.subtotal1 = 0;
    this.state.totalgst = 0;
    this.state.totalitemqty = 0;
    this.state.discount = 0;
    this.state.adjustment = 0;
    this.state.description = '';
    this.state.finalAmountTotal = 0;
    this.state.TotalWithoutGST=0;
    this.state.payment_status = "Unpaid";
   
    this.setState({
    
      height: '',
      width: '',
      size: '',
      rate: '',
      amount: '',
      quantity: '',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      totalgst: 0,
      finalAmountTotal: 0,
      TotalWithoutGST:0,
      adjustment: '',
      discount: 0,
      shipping: 0,
      description:'',


    });

    subtotal_cgst=0;
    subtotal_igst=0;
    subtotal_sgst=0;
  
    inputarray.length = 0;
    var self = this;
    var productName;
    var rate;
    var individualSale;
    var dealerSale;
    var feed;
    if (this.state.saleType == 'individualSale') {

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          saleType: this.state.saleType,
          companyId:this.state.companyId,
        }),
        url: "http://52.66.243.218:8080/ERPDetails/vendororder/selectindividualsaleproduct",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          console.log("whole product" + data.selectindividualsaleproductlist);
          productName += '<option value ="" disabled selected hidden >Select a product</option>';
          $.each(data.selectindividualsaleproductlist, function (i, item) {

            productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
            var feed = JSON.stringify({
              productName: item.productName,
              rate: item.individualRate,
              description: item.description,
              cgsta: item.cgst,
              sgsta: item.sgst,
              igsta: item.igst,
              unit: item.unit,

            });
            inputarray.push(feed);
            console.log("afetr add", inputarray)
          });
          $("#productName").append(productName);




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

    else if (this.state.saleType == 'dealerSale') {

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          saleType: this.state.saleType,
          companyId:this.state.companyId,
        }),
        url: "http://52.66.243.218:8080/ERPDetails/vendororder/selectindividualsaleproduct",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          productName += '<option value ="" disabled selected hidden >Select a product</option>';
          $.each(data.selectindividualsaleproductlist, function (i, item) {
            productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
            var feed = JSON.stringify({
              productName: item.productName,
              rate: item.dealerRate,
              description: item.description,
              cgsta: item.cgst,
              sgsta: item.sgst,
              igsta: item.igst,
              unit: item.unit,
            });
            inputarray.push(feed);
            console.log("afetr add", inputarray)
          });
          $("#productName").append(productName);




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
    }

  }
  AddVendorFunc() {
    var self = this;
 
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
this.state.companyId = companyId;
this.setState({
  companyId: companyId,
});
    
    if (this.state.modalContactNo.trim().length > 2) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                vendorName: this.state.modalVendorName,              
                contactNo: this.state.modalContactNo,               
                companyId:this.state.companyId,
            }),
            url: "http://52.66.243.218:8080/ERPDetails/master/addvendor",               
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.contactNo == "Mobile") {
                    confirmAlert({
                        title: 'Cant Add Vendor',                        // Title dialog
                        message: 'The Mobile Number is Already Exists',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                }
              else {
              //  confirmAlert({
              //      title: 'Success',                        // Title dialog
              //      message: 'Successfully Added vendor Details',               // Message dialog
               //     confirmLabel: 'Ok',                           // Text button confirm
              //  });
                ReactDOM.render(
                    <Router >
                        <div>
                            <Route path="/" component={PurchaseInvoice1} />
                        </div>
                    </Router>, document.getElementById('contentRender'));
  $('#vendorName').html('');
  self.SelectVendor();
                self.state.modalVendorName = "";
                self.state.modalContactNo = "";
                self.state.formValid=false;

               // $('[name=city]').val('');

                self.setState({
                  modalVendorName: '',                  
                  modalContactNo: '',     
                    formValid:false,           

                });
            

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

  PurchaseInvoiceFunc() {

    var self = this;

    var arrData = [];
    // loop over each table row (tr)
    $("#tablecontents tr").each(function () {
      var currentRow = $(this);

      var productName=currentRow.find("td:eq(0)").text();
      var size=currentRow.find("td:eq(1)").text();
      var unit=currentRow.find("td:eq(2)").text();
      var rate=currentRow.find("td:eq(3)").text();
      var amount=currentRow.find("td:eq(4)").text();
      var quantity=currentRow.find("td:eq(5)").text();
      var total=currentRow.find("td:eq(6)").text();
      var cgst=currentRow.find("td:eq(7)").text();
      var sgst=currentRow.find("td:eq(8)").text();
      var igst=currentRow.find("td:eq(9)").text();
      var finalAmount=currentRow.find("td:eq(10)").text();


      var height = currentRow.find("td:eq(11)").text();
      
      var width = currentRow.find("td:eq(12)").text();
      if(height==""){
        height=0;
        width=0;
      }
      var description = currentRow.find("td:eq(13)").text();
      if(description==""){
        description='-';
      }
     
      arrData.push(productName);
      arrData.push(size);
      arrData.push(unit);
      arrData.push(rate);
      arrData.push(amount);
      arrData.push(quantity);
      arrData.push(total);
      arrData.push(cgst);
      arrData.push(sgst);
      arrData.push(igst);
      arrData.push(finalAmount);
      arrData.push(height);
      arrData.push(width);
      arrData.push(description);



    });

    console.log(arrData);
    this.state.invoiceData = arrData.toString();

    this.setState({
      invoiceData: arrData.toString(),
    });

    if ((this.state.vendorName.length >0)){
      if((this.state.invoiceData.trim().length>1)){
      if((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          vendorName: this.state.vendorName,
        //  invoiceNo: this.state.invoiceNo,
          orderNumber: this.state.orderNumber,
          invoiceDate: this.state.invoiceDate,
          dueDate: this.state.dueDate,
          saleType: this.state.saleType,
          invoiceData: this.state.invoiceData.toString(),
          date: this.state.date,
          vendorId: this.state.vendorId,
          contactNo: this.state.contactNo,
          totalcgst: subtotal_cgst,
          totalsgst: subtotal_sgst,
          totaligst: subtotal_igst,
          discount: this.state.discount,

          subtotal1: this.state.subtotal1,
          totalgst: this.state.totalgst,
          finalAmountTotal: this.state.finalAmountTotal,
          adjustment: this.state.adjustment,
          totalitemqty: this.state.totalitemqty,
          totalgst: this.state.totalgst,
          shipping: this.state.shipping,
          payment_status: this.state.payment_status,
          companyId:this.state.companyId,
          companyName:this.state.companyName,
        }),

        url: "http://52.66.243.218:8080/ERPDetails/vendororder/addpurchaseorder",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          confirmAlert({
            title: 'Success',                        // Title dialog
            message: 'purchase order  with invoiceNo '+ data.invoiceNo +',orderNo '+ self.state.orderNumber +' and total' +  self.state.finalAmountTotal +'  Details Added and Do you want to view ?  ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => { self.ViewFunc() },    // Action after Confirm
            onCancel: () => { self.NoAction() },                             // Text button confirm
          });



       //   self.state.invoiceNo = "";
          self.state.orderNumber = "";
          self.state.invoiceDate = "";
          self.state.dueDate = "";
          self.state.description = "";
          self.state.height = "";
          self.state.width = "";
          self.state.size = "";
          self.state.rate = "";
          self.state.amount = "";
          self.state.quantity = "";
          self.state.total = "";
          self.state.cgsta = "";
          self.state.sgsta = "";
          self.state.igsta = "";
          self.state.finalAmount = "";
          self.state.subtotal1 = 0;
          self.state.shipping =0;
          self.state.adjustment = 0;
          self.state.discount = 0;
          self.state.finalAmountTotal = 0;
          self.state.payment_status = "Unpaid";
          self.state.subtotal1 = 0;
          self.state.totalgst = 0;
          self.state.totalitemqty = 0;
          self.state.finalAmountTotal = 0;
          self.state.TotalWithoutGST=0;
       
          $("#tablecontents").empty();
          $("#tableHeadings").hide();
          $('#productName').html('');
   
          $('[name=saleType]').val('');
          $('[name=productName]').val('');
          $('[name=vendorName]').val('');
          $('#vendorName').html('');
          self.setState({
            vendorName: '',
          //  invoiceNo: '',
            orderNumber: '',
            invoiceDate: '',
            dueDate: '',
            description: '',
            height: '',
            width: '',
            size: '',
            rate: '',
            amount: '',
            quantity: '',
            total: '',
            cgsta: '',
            sgsta: '',
            igsta: '',
            finalAmount: '',
            saleType: '',
            productName: '',
            subtotal1: 0,
            totalitemqty: 0,
            TotalWithoutGST:0,
            totalgst: 0,
            balance_amount: '',
            advance: '',
            discount: 0,
            balance: '',
            individualSale: '',
            dealerSale: '',
            payment_status: 'UnPaid',

          });
        //  self.GetInvoiceNo();
          self.SelectVendor();
        


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
    else{
      confirmAlert({
        title: 'Error', // Title dialog
        message: 'Please Select Due Dates', // Message dialog
        confirmLabel: 'Ok', // Text button confirm
      });
    }
    
    }
    else{
      confirmAlert({
        title: 'Error', // Title dialog
        message: 'No items in Cart', // Message dialog
        confirmLabel: 'Ok', // Text button confirm
      });
    }}
    
    else{
    confirmAlert({
      title: 'Error', // Title dialog
      message: 'Please Select Vendor Name', // Message dialog
      confirmLabel: 'Ok', // Text button confirm
    });
    }
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    } 

    ViewFunc(){
      ReactDOM.render(
        <Router >
          <div>
            <Route path="/" component={PurchaseInvoiceList} />
          </div>
        </Router>, document.getElementById('contentRender'));
    }
 
NoAction(){
  ReactDOM.render(
    <Router >
      <div>
        <Route path="/" component={PurchaseInvoice1} />
      </div>
    </Router>, document.getElementById('contentRender'));
}
  AddToCart() {
    var self = this;

    var currentproductvalue;
    if (this.state.size != 0 && this.state.finalAmount != 0 && (this.state.saleType.length != 0) && (this.state.productName !=0)) {
      //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
      this.state.subtotal1 =Math.round( Number(this.state.subtotal1) + Number(this.state.finalAmount));
      this.state.totalitemqty =Math.round( Number(this.state.totalitemqty) + Number(this.state.quantity));
      this.state.totalgst = Math.round(Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs)));
      this.state.TotalWithoutGST=Math.round(Number(this.state.TotalWithoutGST)+Number(this.state.total));
  
      subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
      subtotal_sgst =Math.round( Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
      subtotal_igst =Math.round( Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));
      var payament_status_details;


      console.log("subtotal " + this.state.subtotal1);
      console.log("totalitemqty " + this.state.totalitemqty);
      console.log("totalgst " + this.state.totalgst);
      console.log("totalgst_rs " + this.state.totalgst_rs);
      console.log("sandy done", subtotal_cgst, subtotal_sgst, subtotal_igst)


      var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" ><td>' + self.state.productName + '</td><td>' + self.state.size + '</td><td>' + self.state.unit + '</td><td>' + self.state.rate + '</td><td>' + self.state.amount + '</td><td>' + self.state.quantity + '</td><td>' + self.state.total + '</td><td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td><td  id="Gstcal" >' + self.state.igsta + '</td><td  id="finalAmountcal" >' + self.state.finalAmount + '</td><td  class="heightWidth" >' + self.state.height + '</td><td  class="heightWidth" >' + self.state.width + '</td><td  class="heightWidth" >' + self.state.description  + '</td> <td><button id="delete">Delete</button></td></tr>';

      $("#tableHeadings").append(tab);
      $("#tableHeadings").show();
      $("#shipping").bind('keydown',function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          //  $("#saleinvoice").click();
        }
      });
      $("#adjustment").bind('keydown',function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          //  $("#saleinvoice").click();
        }
      });

      $("#discount").bind('keydown',function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          //  $("#saleinvoice").click();
        }
      });


      self.state.description = "";
      self.state.height = "";
      self.state.width = "";
      self.state.size = "";
      self.state.rate = "";
      self.state.amount = "";
      self.state.quantity = "";
      self.state.total = "";
      self.state.cgsta = "";
      self.state.sgsta = "";
      self.state.igsta = "";
      self.state.finalAmount = 0;
     // self.state.TotalWithoutGST="";
     
      
      $('[name=productName]').val('');

      self.setState({

        description: '',
        height: '',
        width: '',
        size: '',
        rate: '',
        amount: '',
        quantity: '',
        total: '',
        cgsta: '',
        sgsta: '',
        igsta: '',
        finalAmount: '',
        productName: '',
        totalgst: this.state.totalgst,
        finalAmountTotal:this.state.subtotal1,
        totalitemqty: this.state.totalitemqty,
        TotalWithoutGST:this.state.TotalWithoutGST,
 
        shipping:0,
        adjustment: 0,
        discount: 0,
     
      });
      advancebalance_calc = this.state.subtotal1;
      console.log("AddToCart after totalgst " + this.state.totalgst);
      console.log("AddToCart after  totalgst_rs " + this.state.totalgst_rs);
      var numtoword = numberToWord(Number(self.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));
    
      $(".heightWidth").hide();

    }
      else {
        confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'Select Product and Enter Valid Measurements',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }
  }
  cancelFunc() {

    ReactDOM.render(<PurchaseInvoice1 />, document.getElementById("contentRender"));
  }





  DeleteButton() {


    var self = this;
    $("#tableHeadings").on('click', "#delete", function () {
  
      var currentRow = $(this).closest("tr");
  
  
      var amount_item_qty_rowcell = currentRow.find("td:eq(4)").html(); // get current row 2nd table cell TD value
      var total_item_qty_rowcell = currentRow.find("td:eq(5)").html(); // get current row 2nd table cell TD value
      var cgst_item_qty_rowcell = currentRow.find("td:eq(7)").html(); // get current row 2nd table cell TD value
      var sgst_item_qty_rowcell = currentRow.find("td:eq(8)").html(); // get current row 2nd table cell TD value
      var igst_item_qty_rowcell = currentRow.find("td:eq(9)").html(); // get current row 2nd table cell TD value
      var TotalWithoutGST_rowcell = currentRow.find("td:eq(6)").html(); // get current row 2nd table cell TD value


  
      var subtotalvaluedecrement = currentRow.find("td:eq(10)").html(); // get current row 2nd table cell TD value
  
      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));
  
      self.state.totalitemqty =Math.round( Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
  
  
  
      // self.state.totalgst = Number(self.state.totalgst) - (Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell));
  
      //gst calculation
  
      /* var In_rs_gst = Number(0.01 * (cgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)
                    + Number(0.01 * (sgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)
                    + Number(0.01 * (igst_item_qty_rowcell)) * Number(amount_item_qty_rowcell);
  */
      var In_rs_gst =Math.round( (Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell)) * 0.01 * Number(amount_item_qty_rowcell));
      console.log("totalgst ", self.state.totalgst);
      self.state.totalgst =Math.round( Number(self.state.totalgst) - Number(In_rs_gst));
      self.state.TotalWithoutGST=Math.round( Number(self.state.TotalWithoutGST) - Number(TotalWithoutGST_rowcell));
     
      subtotal_cgst = Math.round(Number(subtotal_cgst) - ((0.01 * Number(cgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)));
      subtotal_sgst =Math.round( Number(subtotal_sgst) - ((0.01 * Number(sgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)));
      subtotal_igst =Math.round( Number(subtotal_igst) - ((0.01 * Number(igst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)));
   
  
      console.log("In_rs_gst" + In_rs_gst);
      console.log("subtotal_cgst  subtotal_sgst" + subtotal_cgst, subtotal_sgst, subtotal_igst);
  
      var cgst_item_qty_rowcell =Math.round( (0.01 * (Number(cgst_item_qty_rowcell)) * Number(subtotalvaluedecrement)));
      var cgst_item_qty_rowcell_another =Math.round( (0.01 * (Number(cgst_item_qty_rowcell)) * (subtotalvaluedecrement)));
  
      console.log("cgst_item_qty_rowcell" + cgst_item_qty_rowcell);
  
      console.log("cgst_item_qty_rowcell_another" + cgst_item_qty_rowcell_another);
  
      console.log("subtotal1" + self.state.subtotal1);
      console.log("totalitemqty" + self.state.totalitemqty);
      console.log("totalgst" + self.state.totalgst);
      console.log("subtotalvaluedecrement" + self.state.totalgst_rs);
  
  
      self.setState({
        subtotal1: self.state.subtotal1,
        totalitemqty: self.state.totalitemqty,
        TotalWithoutGST:self.state.TotalWithoutGST,
        totalgst: self.state.totalgst,
        adjustment: 0,
        discount: 0,
        finalAmountTotal: self.state.subtotal1,
        shipping:0,
      }); 
      currentRow.remove();
      var subtotal1 = self.state.subtotal1;
  
      if (subtotal1 == 0) {
        $("#tableHeadings").hide();
      }
  
      var numtoword = numberToWord(Number(self.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));
  
  
    });
  } 
  
  
  /*
      subtotalcalculationFunc() {
  
        var subtotaladdition;
        var finalAmount;
       
        this.state.finalAmount = subtotaladdition;
       
        console.log("hi" + this.state.finalAmount);
       
        this.setState({
        finalAmount: finalAmount,
        });
        }
       
          */
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

         
clearFunc() {
  var self=this;
  self.state.modalVendorName = ""; 
  self.state.modalContactNo = "";

  self.setState({
    modalVendorName:self.state.modalVendorName ,
    modalContactNo:self.state.modalContactNo ,
  })
 // self.AddCustomerFunc();
 // ReactDOM.render(<Website />, document.getElementById("contentRender"));
}

closeFunc() {
 //alert("MODAL CLOSE");
  var self=this;
 
  self.state.modalVendorNameValid =false;
  self.state.modalContactNoValid=false;
  self.state.modalVendorName = ""; 
  self.state.modalContactNo = "";
 
  self.setState({
    
    modalVendorNameValid:self.state.modalVendorNameValid,
    modalContactNoValid:self.state.modalContactNoValid,
    modalVendorName:self.state.modalVendorName ,
    modalContactNo:self.state.modalContactNo ,
    

  })


 // $('#myModal').dialog('close');

 // self.AddCustomerFunc();
 // ReactDOM.render(<Website />, document.getElementById("contentRender"));
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
        <div class="card-header" style={{backgroundColor:"white"}}>
        <h4 style={{fontWeight:"300",color:"black",fontSize:"30px"}}>Purchase Invoice</h4>
        <hr></hr>
      </div>
          <div>
            <div class="card-body">
              <form class="form-horizontal form-bordered">
                <div class="form-group">
                  <label class="control-label col-sm-2" for="vendorName">Vendor Name</label>
                  <div class="col-sm-10">
                    <select id="vendorName" className="form-control" onChange={this.handleVendorDetails} name="vendorName"
                      style={{ marginBottom: "15px" }} >

                    </select>  </div>
                    <label class="control-label col-sm-2" for="vendorName"></label>

<div class="text-center" class="col-sm-10">
 
  <a href="#myModal" data-toggle="modal" data-target="#myModal" >
    <span
      style={{
        color: "blue",
      }}>  +Add Vendor</span>    </a></div>
                </div>
              
                <div class="form-group">
                  <label class="control-label col-sm-2" for="orderNumber">Order Number</label>
                  <div class="col-sm-10">
                    <input type="text" readOnly class="form-control" value={this.state.orderNumber} onChange={this.handleUserInput} name="orderNumber" id="orderNumber" />
                  </div>
                </div>
                <div class="form-group">

                  <label class="control-label col-sm-2">Invoice Date</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" value={this.state.invoiceDate} id="invoiceDate" name="invoiceDate"
                      onChange={this.handleUserInput} />
                  </div>
                  <label class="control-label col-sm-2">Due Date</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" value={this.state.dueDate} id="dueDate" name="dueDate"
                      onChange={this.handleUserInput} />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="city">Sale Type<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-10">
                    <select name="saleType" id="saleType" onChange={this.handleIndividualSale} class="form-control">
                      <option value="" disabled selected hidden>--Select--</option>
                      <option value="individualSale">Individual Sale</option>
                      <option value="dealerSale">Dealer Sale</option>
                    </select>
                  </div>
                </div>
                <hr></hr>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="productName">Product</label>
                  <div class="col-sm-10">
                    <select id="productName" className="form-control" onChange={this.handleProductDetails} name="productName"
                      style={{ marginBottom: "15px" }} >

                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="description">Description</label>
                  <div class="col-sm-10">
                    <textarea type="text" class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" ></textarea>
                  </div>
                </div>
                <hr></hr>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Height</th>
                        <th>Width</th>
                        <th>Size</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input class="col-sm-3" type="text" min="1" class="form-control" value={this.state.height} onChange={this.handleUserHeightWidth} name="height" id="height" />
                        </td>
                        <td><input class="col-sm-3" type="text" min="1" class="form-control" value={this.state.width} onChange={this.handleUserHeightWidth} name="width" id="width" />
                        </td>
                        <td><input class="col-sm-3" readOnly type="number" min="1" class="form-control" value={this.state.size} onChange={this.handleUserHeightWidth} name="size" id="size" />
                        </td>


                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Quantity</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input class="col-sm-3" type="text" min="1"class="form-control" value={this.state.rate} onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                        </td>
                        <td><input readOnly type="number" min="1" class="form-control" value={this.state.amount} onChange={this.handleUserHeightWidth} name="amount" id="amount" />
                        </td>
                        <td><input type="text" min="1" class="form-control" value={this.state.quantity} onChange={this.handleUserHeightWidth} name="quantity" id="quantity" />
                        </td>


                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>CGST(%)</th>
                        <th>SGST(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input readOnly type="text" class="form-control" value={this.state.total} onChange={this.handleUserHeightWidth} name="total" id="total" />
                        </td>
                        <td><input readOnly type="text" class="form-control" value={this.state.cgsta} onChange={this.handleUserInput} name="cgsta " id="cgsta " />
                        </td>
                        <td><input readOnly type="text" class="form-control" value={this.state.sgsta} onChange={this.handleUserInput} name="sgsta " id="sgsta " />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>

                        <th>IGST(%)</th>
                        <th>Final Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input readOnly type="text" class="form-control" value={this.state.igsta} onChange={this.handleUserInput} name="igsta" id="igsta" />
                        </td>
                        <td><input readOnly type="text" class="form-control" value={this.state.finalAmount} onChange={this.handleUserHeightWidth} name="finalAmount " id="finalAmount " />
                        </td>
                        <td>
                          <button type="button" onClick={() => this.AddToCart()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">AddToCart</button> <span></span>

                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr></hr>
                <div id="tableOverflow">
                  <table class="table" id="tableHeadings">
                    <thead>
                      <tr>
                        <th>ProductName</th>
                        <th>Size</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>CGST (%)</th>
                        <th>SGST (%)</th>
                        <th>IGST (%)</th>
                        <th>Final Amount</th>
                      </tr>
                    </thead>
                    <tbody id="tablecontents" style={{ backgroundColor: "white" }}></tbody>
                  </table>
                </div>
                <hr></hr>



                <div class="form-group">


                  <div class="col-sm-6">
                    <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>
                    <p class="lead">In Words:   <span id="numWords"></span></p>

                  </div>

                  <div class="col-sm-6">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                        <tr><th style={{ width: "50%" }}>Total(withoutGST):</th>
                          <td><input name="TotalWithoutGST" readOnly type="text" value={this.state.TotalWithoutGST} id="TotalWithoutGST"  class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                          <input type="hidden" name="TotalWithoutGST" id="TotalWithoutGST" />  </tr>

                        <tr><th>Total GST</th>
                            <td> ₹ {this.state.totalgst} <span id="tgst"></span></td>
                          </tr>

                          <tr><th style={{ width: "50%" }}>Subtotal:</th>
                            <td><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" onChange={this.subtotalcalculationFunc} class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                            <input type="hidden" name="subtotal1" id="subtotal1" />  </tr>
                      
                          <tr><th>Shipping:</th>
                            <td>
                              <input name="shipping" type="text" id="shipping" value={this.state.shipping} onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>
                          </tr>
                          <tr><th>Adjustment:</th>
                            <td>
                              <input name="adjustment" value={this.state.adjustment} type="number" min="1" id="adjustment" onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>
                          </tr>
                          <tr><th>Discount(Rs):</th><td>
                            <input name="discount" type="number" min="1" value={this.state.discount} id="discount" onkeyup="final_total();" onChange={this.DiscountCalc} class="form-control" /></td>
                          </tr>
                          <tr> <th>Total:</th>
                            <td name="finalAmountTotal" class="grand_total" >₹  {this.state.finalAmountTotal} <span id="finalAmountTotal"></span></td>
                          </tr>

                          <tr><th></th>
                            <td>
                              <button type="button" id="saleinvoice" onClick={() => this.PurchaseInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">SaveInvoice</button> <span></span>
                            </td>
                            <td> <button type="button" onClick={() => this.CancelFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">cancel</button> <span></span>
                            </td>
                          </tr>

                        </tbody>
                      </table></div>

                  </div>
                </div>
              </form>
            </div>
          </div></div>

          <div style={{ position: " ",zIndex: "0" }}>
          <div class="modal fade" id="myModal"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Add Vendor</h4>
                  <button type="button"  onClick={() => this.closeFunc()} class="close" data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.modalVendorName)}`}>
                      <label class="control-label col-sm-2 font-weight-bold" for="modalVendorName">Vendor Name<span style={{ color: "red" }}>*</span></label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="modalVendorName" 
                        name="modalVendorName" value={this.state.modalVendorName} 
                        onChange={this.handleUserInput} placeholder="Vendor Name" />
                      </div>
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.modalContactNo)}`}>
                      <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="contactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                    
                       <div class="col-sm-10">
                        <input type="number" min="1" maxLength="10" class="form-control"
                         name="modalContactNo" 
                        value={this.state.modalContactNo} onChange={this.handleUserInput} 
                        id="modalContactNo" placeholder="Contact no" />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="form-group">
                        <div class="row" style={{ marginLeft: "2px" }}>
                          <div class="col-sm-offset-2 col-sm-10">
                            <button style={{ fontWeight: "bold" }} type="button" 
                            disabled={!this.state.formValid} onClick={() => this.AddVendorFunc()}  
                            data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>
                           
                            <button style={{ fontWeight: "bold" }} type="button" 
                            onClick={() => this.clearFunc()}  
                            class="btn btn-primary">Clear</button>
                          </div>
                        </div>
                      </div></div>
                       </form> 
                  </div>


                </div>
              </div>

            </div>

          </div>
       
          </div>

      </div>
    );
  }
}

export default PurchaseInvoice1;