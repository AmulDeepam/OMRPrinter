import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Website from './Website';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './gstdashboard.css';
import './datepicker.css';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Case from "case";
import Dashboardoverall from './Dashboardoverall';
import EstimateList from './EstimateList';
var numberToWord = require('npm-number-to-word');

var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
class Estimate1 extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
    this.state = {
      date: date,
      customerName: '',
     
      contactNo: '',
    //  invoiceNo: '',
      orderNumber: '',
      invoiceDate: date,
      companyId:companyId,
      dueDate: date,
      productName: '',
      saleType: '',
      description: '',
      height: '',
      width: '',
      size: '',
      rate: '',
      amount: '',
      quantity: '1',
      total: 0,
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      balance_amount: '',
      advance: 0,
      discount: 0,
      balance: '',
      individualSale: '',
      dealerSale: '',
      modalCustomerName:'',
      modalContactNo:'',
      payment_status: 'UnPaid',
      formErrors: {
        modalCustomerName: '',

        modalContactNo: '',

      },
      modalCustomerNameValid: false,
      modalContactNoValid: false,

    }
    this.setState({
      date: date,
    })
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalCustomerNameValid = this.state.modalCustomerNameValid;
    let modalContactNoValid = this.state.modalContactNoValid;

    switch (fieldName) {
      case 'modalCustomerName':
      modalCustomerNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.modalCustomerName =modalCustomerNameValid ? '' : ' is InCorrect';
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
      modalCustomerNameValid: modalCustomerNameValid,
      modalContactNoValid: modalContactNoValid,

    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.modalCustomerNameValid
        && this.state.modalContactNoValid


    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }



  componentDidMount() {
    window.scrollTo(0, 0);

    $("#tableHeadings").hide();
    this.DeleteButton();
    var self = this;
    var customerName;
    var productName;
    window.scrollTo(0, 0);
    customerarray.length = 0;
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

    $('#customerName').html('');
    this.SelectCustomer();
  //this.GetInvoiceNo();
  }
  SelectCustomer(){
    var self = this;
    var customerName;
    customerarray=[];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
  
      }),
      url: "http://52.66.243.218:8080/ERPDetails/saleorder/selectcustomer",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
  
        customerName += '<option value ="" disabled selected hidden >Select a customer</option>';
        $.each(data.selectcustomernamelist, function (i, item) {
          customerName += '<option value="' + item.customerName + '">' + item.customerName + '</option>'
          var content = JSON.stringify({
            customerName: item.customerName,
            orderNumber: item.eorderNumber,
            customerId: item.customerId,
            contactNo: item.contactNo,
            address: item.address,
            gstNo: item.gstNo,
            email: item.email,
            companyName:item.companyName,
          });
  
          customerarray.push(content);
  
          console.log("afetr add", customerarray)
        });
        $("#customerName").append(customerName);
  
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
      url: "http://52.66.243.218:8080/ERPDetails/saleorder/estimateinvoiceNo",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        $.each(data.selectEstimateInvoiceNoList, function (i, item) {
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
  AddCustomerFunc() {
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
                customerName: this.state.modalCustomerName,                
                contactNo: this.state.modalContactNo,               
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
              //  confirmAlert({
               //     title: 'Success',                        // Title dialog
               //     message: 'Successfully Added Customer Details',               // Message dialog
              //      confirmLabel: 'Ok',                           // Text button confirm
             //   });
                self.state.modalCustomerName = "";               
                self.state.modalContactNo = "";
                self.state.formValid=false;

               // $('[name=city]').val('');

                self.setState({
                  modalCustomerName: '',                   
                  modalContactNo: '',
                  formValid:false,
                    

                });

               
                 ReactDOM.render(
                    <Router >
                        <div>
                            <Route path="/" component={Estimate1} />
                        </div>
                    </Router>, document.getElementById('contentRender')); 
                     $('#customerName').html('');
                     self.SelectCustomer();

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
            message: 'Fill all the details',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
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
    this.state.subtotal1 = 0;
    this.state.advance =0;
    this.state.subtotal1 = 0;
    this.state.totalitemqty = 0;
    this.state.discount = 0;
    this.state.description = '';
   
    this.setState({
    
      height: '',
      width: '',
      size: '',
      rate: '',
      amount: '',
      quantity: '',
      total: '',
      finalAmount: '',
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      discount: 0,
      balance_amount:0,
      description:'',
      advance:0,
      payment_status:"Unpaid",


    });

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
        url: "http://52.66.243.218:8080/ERPDetails/saleorder/selectindividualsaleproduct",
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
        url: "http://52.66.243.218:8080/ERPDetails/saleorder/selectindividualsaleproduct",
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
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
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
  var self = this;
  if (this.state.unit == "Pcs") {
    self.state.size = 1;

    self.state.amount = Math.round(Number(self.state.size) * Number(self.state.rate));

    self.state.total =Math.round( Number(self.state.amount) * Number(self.state.quantity));


    self.state.finalAmount = Math.round(Number(self.state.total));

    self.setState({
      size: self.state.size,
      amount: self.state.amount,
      total: self.state.total,
      finalAmount: self.state.finalAmount,

    });
  } else {

    this.state.size = Math.round(Number(this.state.height) * Number(this.state.width));

    this.state.amount = Math.round(Number(this.state.size) * Number(this.state.rate));

    this.state.total =Math.round( Number(this.state.amount) * Number(this.state.quantity));


    this.state.finalAmount = Math.round(Number(this.state.total));
    this.setState({
      size: this.state.size,
      amount: this.state.amount,
      total: this.state.total,
      finalAmount: this.state.finalAmount,

    });
  }

}

AdvanceCalc = (e) => {

  /* $("#delete").keyup(function(event) {
     if (event.keyCode === 13) {
       e.preventDefault();
       //  $("#saleinvoice").click();
     }
   });*/

   const name = e.target.name;
   const value = e.target.value;
   //If Entered Amount Exceed the subtotal
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
         //alert("NO NUMBER FOR CHAR");
     }
   
   }else{
     this.state[name] = 0;
     this.setState({ [name]: 0 });

  //   alert("NO NUMBER FOR EMPTY STRING ");
   }



   if(isNumberDt!=false  && sign_data!=-1  &&  decimal_data!=true){

    
   if (value1 > this.state.subtotal1) {

     console.log("Entered Advance is Greater so dont Update");
     alert("Advance Exceeds Total" + value1);

     state_value=0;
     this.AdvanceCalcComplete(value1,state_value);

   } else {

     state_value=value1;
     this.AdvanceCalcComplete(value1,state_value);

   }
 }else{

  
   if (value1 > this.state.subtotal1) {

     console.log("Entered Advance is Greater so dont Update");
     alert("Advance Exceeds Total" + value1);
     state_value=0;
     this.AdvanceCalcComplete(value1,state_value);

   } else {

     state_value=0;
     this.AdvanceCalcComplete(value1,state_value);

   
 }
}
/*$(".delete").keyup(function(event) {
 if (event.keyCode === 13) {
   //  $("#saleinvoice").click();
 }
});
*/
}
  
AdvanceCalcComplete(value1,state_value){
 
     
  this.state.advance = state_value;

  var tot_adv_diff = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));

  if (this.state.subtotal1 == this.state.advance) {

    $('#discount').prop('disabled', true)
    this.state.discount = 0;

  } else if (this.state.discount > tot_adv_diff) {
    this.state.discount = 0;
    $('#discount').prop('disabled', false)

  } else {
    $('#discount').prop('disabled', false)

  }

  this.state.balance_amount =Math.round( Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount)));

  if (this.state.balance_amount == 0) {
    this.state.payment_status = "Paid";

  } else if (this.state.subtotal1 == this.state.balance_amount) {
    this.state.payment_status = "UnPaid";

  } else {
    this.state.payment_status = "PartiallyPaid";

  }
  this.setState({
    advance: state_value,
    discount: this.state.discount,
    balance_amount: this.state.balance_amount,
    payment_status: this.state.payment_status,
  })

}


DiscountCalc = (e) => {
 
  const name = e.target.name;
  const value = e.target.value;

  var value1=value;
  var state_value=0;

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
  
            /*  confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'Decimal Values Not Accepted',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });  */
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
    }else{
  
     // $("#"+name).val(); // get current row 1st TD value
     this.state[name] = 0;
     this.setState({ [name]: 0 });
     /* confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Kindly Enter An Number To Proceed',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        }); */
    }
  
  }else{
    this.state[name] = 0;
    this.setState({ [name]: 0 });
  }


  if(isNumberDt!=false  && sign_data!=-1  &&  decimal_data!=true){
 var tot_minus_adv = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));
  //If discount Exceeds the balance Amount
  if (value1 > tot_minus_adv) {
    alert("Exceeds Balance" + value1);
    state_value=0;
    this.DiscountCalcComplete(value1,state_value);

  } else {

    state_value=value1;
    this.DiscountCalcComplete(value1,state_value);

  }


}else{
  var tot_minus_adv = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));
  //If discount Exceeds the balance Amount
  if (value1 > tot_minus_adv) {
    alert("Exceeds Balance" + value1);
    state_value=0;
    this.DiscountCalcComplete(value1,state_value);
  } else {

    state_value=0;
    this.DiscountCalcComplete(value1,state_value);

  }
}








/*  var tot_minus_adv = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));
  //If discount Exceeds the balance Amount
  if (value > tot_minus_adv) {
    alert("Exceeds Balance" + value);

  } else {
    this.state.discount = value;
    this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount)));
    if (this.state.balance_amount == 0) {
      this.state.payment_status = "Paid";

    } else if (this.state.subtotal1 == this.state.balance_amount) {
      this.state.payment_status = "UnPaid";

    } else {
      this.state.payment_status = "PartiallyPaid";

    }
    this.setState({
      discount: value,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
    })
  }

  */
}
DiscountCalcComplete(value1,state_value){

  this.state.discount = state_value;
  this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount)));
      if (this.state.balance_amount == 0) {
        this.state.payment_status = "Paid";

      } else if (this.state.subtotal1 == this.state.balance_amount) {
        this.state.payment_status = "UnPaid";

      } else {
        this.state.payment_status = "PartiallyPaid";

      }
      this.setState({
        discount: state_value,
        balance_amount: this.state.balance_amount,
        payment_status: this.state.payment_status,
      })
}
  


  handleCustomerDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.customerName = value;

    rougharray.push(this.state.customerName);
    console.log("test array", rougharray);

    this.setState({
      [name]: value,
      customerNameValid: true
    });

    var self = this;
    for (var k = 0; k < customerarray.length; k++) {
      var temp = JSON.parse(customerarray[k]);
      console.log("inpy", temp.customerName);
      if (temp.customerName == this.state.customerName) {
        self.state.orderNumber = temp.orderNumber;
        self.state.customerId = temp.customerId;
        self.state.contactNo = temp.contactNo;
        if(temp.companyName== " " || temp.companyName=="null" || temp.companyName=="-" )
        {
          self.state.companyName=" "
        }
        else{
          self.state.companyName=temp.companyName;
        }
        self.setState({
          orderNumber: Number(self.state.orderNumber) + 1,
          customerId: self.state.customerId,
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

        

          self.state.height = "";
          self.state.width = " ";
          self.state.size = 1;
          self.state.quantity = 1;
          self.state.amount = "";
          self.state.total = "";
          self.state.finalAmount = "";

          self.state.description = temp.description;
          self.state.rate = temp.rate;

          self.setState({
            description: temp.description,
            rate: temp.rate,

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

          self.state.total =Math.round( Number(self.state.amount) * Number(self.state.quantity));


          self.state.finalAmount = Math.round(Number(self.state.total));


          self.setState({
            size: self.state.size,
            amount: self.state.amount,
            total: self.state.total,
            finalAmount: self.state.finalAmount,

          });
          // alert(" handleProductDetails unit is pcs total", self.state.amount, self.state.total, self.state.finalAmount);
          console.log(" handleProductDetails unit is pcs total", self.state.size, self.state.rate, self.state.amount, self.state.total, self.state.finalAmount);
          console.log(" handleProductDetails totalgst_rs", self.state.totalgst_rs);
        }
        else {
          // alert(" handleProductDetails unit is not pcs ", this.state.unit);

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

          self.setState({
            description: temp.description,
            rate: temp.rate,
            height: "",
            width: "",
            size: "",
            total: "",
            finalAmount: "",
            amount: "",

          })
          // alert("unit is not pcs handleProductDetails ", this.state.unit);


          this.state.size = Math.round(Number(this.state.height) * Number(this.state.width));

          this.state.amount = Math.round(Number(this.state.size) * Number(this.state.rate));

          this.state.total =Math.round( Number(this.state.amount) * Number(this.state.quantity));


          this.state.finalAmount =Math.round( Number(this.state.total));



          this.setState({
            size: this.state.size,
            amount: this.state.amount,
            total: this.state.total,
            finalAmount: this.state.finalAmount,

          });
          console.log("  unit is pcs total handleProductDetails ", self.state.size, self.state.rate, self.state.amount, self.state.total, self.state.finalAmount);


          break;
        }
      }
    }

  }
  EstimateInvoiceFunc() {
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

      var height=currentRow.find("td:eq(7)").text();
      var width=currentRow.find("td:eq(8)").text();
      var description=currentRow.find("td:eq(9)").text();
      console.log("hegight ",height);
      if(height==""){
        height=0;
        width=0;
        console.log("hegighttr ",height);
      }
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
  arrData.push(height);
      arrData.push(width);
      arrData.push(description);


    });
    console.log(arrData);
    this.state.invoiceData = arrData.toString();

    this.setState({
      invoiceData: arrData.toString(),
    });
    if ((this.state.customerName.length >0)){
      if((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
   $.ajax({
        type: 'POST',
        data: JSON.stringify({
          customerName: this.state.customerName,
        //  invoiceNo: this.state.invoiceNo,
          orderNumber: this.state.orderNumber,
          invoiceDate: this.state.invoiceDate,
          dueDate: this.state.dueDate,
          saleType: this.state.saleType,
          invoiceData: this.state.invoiceData.toString(),
          date: this.state.date,
          customerId: this.state.customerId,
          contactNo: this.state.contactNo,
          discount: this.state.discount,
          subtotal1: this.state.subtotal1,
          balance_amount: this.state.balance_amount,
          advance: this.state.advance,
          totalitemqty: this.state.totalitemqty,
          payment_status: this.state.payment_status,
          companyId:this.state.companyId,
          companyName:this.state.companyName,


        }),

        url: "http://52.66.243.218:8080/ERPDetails/saleorder/addestimateorder",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          confirmAlert({
            title: 'Success',                        // Title dialog
            message: 'Estimate order  with invoiceNo '+ data.invoiceNo +',orderNo '+ self.state.orderNumber +' and total' +  self.state.subtotal1 +' Details Added and Do you want to View ? ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => { self.ViewFunc() },    // Action after Confirm
            onCancel: () => { self.NoAction() },                         // Text button confirm
          });


        //  self.state.invoiceNo = "";
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
          self.state.finalAmount = "";
          self.state.payment_status = "";
          self.state.subtotal1 = 0;
          self.state.totalgst = 0;
          self.state.totalitemqty = 0;
          self.state.discount = 0;
          self.state.advance = "";
          self.state.formValid=false;
          $("#tablecontents").empty();
     
          $("#tableHeadings").hide();
          $('[name=saleType]').val('');
          $('[name=productName]').val('');
          $('#productName').html('');
    
         $('[name=customerName]').val('');
        //  $('#customerName').html('');
          self.setState({
          //  customerName: '',
           // invoiceNo: '',
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
            finalAmount: '',
            saleType: '',
            productName: '',
            payment_status: 'UnPaid',
            subtotal1: 0,
            totalitemqty: 0,
            totalgst: 0,
            balance_amount: '',
            advance: '',
            discount: 0,
            balance: '',
            formValid:false,


          });
      //    self.GetInvoiceNo();
          self.SelectCustomer();
     
  

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
  
  }else{
    confirmAlert({
      title: 'Error', // Title dialog
      message: 'Please Select Customer Name', // Message dialog
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
        <Route path="/" component={EstimateList} />
      </div>
    </Router>, document.getElementById('contentRender'));
}
NoAction(){

  ReactDOM.render(
    <Router >
      <div>
        <Route path="/" component={Estimate1} />
      </div>
    </Router>, document.getElementById('contentRender'));
}
  DeleteButton() {


    var self = this;
    $("#tableHeadings").on('click', "#delete", function () {

      var currentRow = $(this).closest("tr");


      var amount_item_qty_rowcell = currentRow.find("td:eq(4)").html(); // get current row 2nd table cell TD value
      var total_item_qty_rowcell = currentRow.find("td:eq(5)").html(); // get current row 2nd table cell TD value

      var subtotalvaluedecrement = currentRow.find("td:eq(6)").html(); // get current row 2nd table cell TD value


      console.log("subtotalvaluedecrement" + subtotalvaluedecrement);
      console.log("subtotalvaluedecrement1" + self.state.subtotal1);

      console.log("subtotalvaluedecrement" + total_item_qty_rowcell);
      console.log("subtotalvaluedecrement1" + self.state.totalitemqty);


      console.log("amount_item_qty_rowcell" + amount_item_qty_rowcell);


      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));

      self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
      console.log("subtotal1" + self.state.subtotal1);
      console.log("totalitemqty" + self.state.totalitemqty);
      self.setState({
        subtotal1: self.state.subtotal1,
        payment_status:"Unpaid",
        totalitemqty: self.state.totalitemqty,
        advance: 0,
        discount: 0,
        balance_amount: self.state.subtotal1,



      });


      currentRow.remove();
      var subtotal1 = self.state.subtotal1;

      if (subtotal1 == 0) {
        $("#tableHeadings").hide();
      }
      var numtoword = numberToWord(Number(this.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));

  

    });
  }

  AddToCart() {
    var self = this;

    if (this.state.size != 0 && this.state.finalAmount != 0 && (this.state.saleType.length != 0) && (this.state.productName !=0)) {
      var currentproductvalue;
      //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
      this.state.subtotal1 =Math.round( Number(this.state.subtotal1) + Number(this.state.finalAmount));
      this.state.totalitemqty =Math.round( Number(this.state.totalitemqty) + Number(this.state.quantity));
      var payament_status_details;

      console.log("subtotal " + this.state.subtotal1);
      console.log("totalitemqty " + this.state.totalitemqty);
      var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" ><td>' + self.state.productName + '</td><td>' + self.state.size + '</td><td>' + self.state.unit + '</td><td>' + self.state.rate + '</td><td>' + self.state.amount + '</td><td>' + self.state.quantity + '</td><td>' + self.state.total + '</td> <td  class="heightWidth" >' + self.state.height + '</td><td  class="heightWidth" >' + self.state.width + '</td><td  class="heightWidth" >' + self.state.description + '</td><td><button id="delete">Delete</button></td></tr>';

      $("#tableHeadings").append(tab);
      $("#tableHeadings").show();

      $("#advance").bind('keydown',function(event) {
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
      self.state.finalAmount = "";
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
        finalAmount: '',
        productName: '',
        totalitemqty: this.state.totalitemqty,
        balance_amount: this.state.subtotal1,
        discount: 0,
        advance: 0,

      });

      var numtoword = numberToWord(Number(this.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));
     $(".heightWidth").hide();

    } else {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Select Product and Enter Valid Measurements',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
    }
  }


  cancelFunc() {
    $("#tablecontents").empty();
     
    $("#tableHeadings").hide();
    $('[name=saleType]').val('');
    $('[name=productName]').val('');
    $('#productName').html('');

    $('[name=customerName]').val('');
    ReactDOM.render(<Estimate1 />, document.getElementById("contentRender"));
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

  clearFunc() {
    var self=this;
    self.state.modalCustomerName = ""; 
    self.state.modalContactNo = "";
  
    self.setState({
      modalCustomerName:self.state.modalCustomerName ,
      modalContactNo:self.state.modalContactNo ,
    })
   // self.AddCustomerFunc();
   // ReactDOM.render(<Website />, document.getElementById("contentRender"));
  }
  closeFunc() {
    //alert("MODAL CLOSE");
     var self=this;
    
     self.state.modalCustomerNameValid =false;
     self.state.modalContactNoValid=false;
     self.state.modalCustomerName = ""; 
     self.state.modalContactNo = "";
    
     self.setState({
       
       modalCustomerNameValid:self.state.modalCustomerNameValid,
       modalContactNoValid:self.state.modalContactNoValid,
       modalCustomerName:self.state.modalCustomerName ,
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
        <h4 style={{fontWeight:"300",color:"black",fontSize:"30px"}}>Estimate Invoice</h4>
        <hr></hr>
      </div>
          <div>
            <div class="card-body">
              <form class="form-horizontal form-bordered">
                <div class="form-group">
                  <label class="control-label col-sm-2" for="customerName">Customer Name</label>
                  <div class="col-sm-10">
                    <select id="customerName" className="form-control" onChange={this.handleCustomerDetails} name="customerName"
                      style={{ marginBottom: "15px" }} >

                    </select>  </div>
                    <label class="control-label col-sm-2" for="customerName"></label>

<div class="text-center" class="col-sm-10">
 
  <a href="#myModal" data-toggle="modal" data-target="#myModal" >
    <span
      style={{
        color: "blue",
      }}>  +Add Customer</span>    </a></div>
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
                    <textarea type="text" readOnly class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" ></textarea>
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
                        <td><input class="col-sm-3" type="text" min="1"  class="form-control" value={this.state.width} onChange={this.handleUserHeightWidth} name="width" id="width" />
                        </td>
                        <td><input class="col-sm-3" readOnly type="number" min="1"  class="form-control" value={this.state.size} onChange={this.handleUserHeightWidth} name="size" id="size" />
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
                        <td><input class="col-sm-3" type="text" min="1"  class="form-control" value={this.state.rate} onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                        </td> 
                        <td><input readOnly type="number"  min="1"  class="form-control" value={this.state.amount} onChange={this.handleUserHeightWidth} name="amount" id="amount" />
                        </td>
                        <td><input type="text" min="1"  class="form-control" value={this.state.quantity} onChange={this.handleUserHeightWidth} name="quantity" id="quantity" />
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
                        <th></th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input readOnly type="text" class="form-control" value={this.state.total} onChange={this.handleUserHeightWidth} name="total" id="total" />
                        </td>
                        <td> <button type="button" onClick={() => this.AddToCart()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">AddToCart</button> <span></span>
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
                          <tr><th style={{ width: "50%" }}>Subtotal:</th>
                            <td><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" onChange={this.subtotalcalculationFunc} class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                            <input type="hidden" name="subtotal1" id="subtotal1" />  </tr>
                            <tr><th>Advance:</th>
                          <td>
                            <input name="advance" type="text" id="advance" onkeyup="final_total();" value={this.state.advance} onChange={this.AdvanceCalc} class="form-control advance" /></td>
                        </tr>
                        <tr><th>Discount(Rs):</th><td>
                          <input name="discount" type="text" id="discount" onkeyup="final_total();" value={this.state.discount} onChange={this.DiscountCalc} class="form-control discount" /></td>
                        </tr>
                        <tr> <th>Balance Amount:</th>
                          <td name="balance" class="grand_total" >₹  {this.state.balance_amount} <span id="total"></span></td>
                        </tr>
                        <tr> <th>Payment Status:</th>
                          <td name="payment_status" class="grand_total" >₹  {this.state.payment_status} <span id="payment_status"></span></td>
                        </tr>
                          <tr><th></th>
                            <td>
                              <button type="button" id="estimateInvoice" onClick={() => this.EstimateInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">EstimateInvoice</button> <span></span>
                            </td>
                            <td>
                              <button type="button" onClick={() => this.cancelFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">Clear</button> <span></span>
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
                  <h4 class="modal-title">Add Customer</h4>
                  <button type="button" class="close"  onClick={() => this.closeFunc()}  data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.modalCustomerName)}`}>
                      <label class="control-label col-sm-2 font-weight-bold" for="modalCustomerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="modalCustomerName" name="modalCustomerName" value={this.state.modalCustomerName} onChange={this.handleUserInput} placeholder="Customer Name" />
                      </div>
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.modalContactNo)}`}>
                      <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="modalContactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                      <div class="col-sm-10">
                        <input type="number" class="form-control" min="1" maxlength="10" name="modalContactNo" value={this.state.modalContactNo} onChange={this.handleUserInput} id="modalContactNo" placeholder="Contact no" />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="form-group">
                        <div class="row" style={{ marginLeft: "2px" }}>
                          <div class="col-sm-offset-2 col-sm-10">
                            <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddCustomerFunc()}  data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>
                            <button style={{ fontWeight: "bold" }} type="button"  onClick={() => this.clearFunc()}   class="btn btn-primary">Clear</button>
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

export default Estimate1;