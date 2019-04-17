import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './gstdashboard.css';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReportMenuPage from './ReportMenuPage';
import CustomerStatement from './CustomerStatement';
import CryptoJS from 'crypto-js';
var  currentRow;

var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

class EstimateCustomerStatement extends Component {


    constructor() {
        super()

        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var year= today.getFullYear() ;
       
        this.state = {
            year: year,
            fromDate:today1,
            customerName: '',
            toDate:today1,
            companyId:companyId,
            
          };
    
    
    
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
  
          self.state.orderNumber = temp.orderNumber + 1;
          self.state.customerId = temp.customerId;
          self.state.contactNo = temp.contactNo;
          self.state.address = temp.address;
          if(temp.gstNo==" "){
            self.state.gstNo='-';
          }else{
            self.state.gstNo = temp.gstNo;
          }
         
          self.state.email = temp.email;
  
  
          self.setState({
            orderNumber: self.state.orderNumber,
            customerId: self.state.customerId,
            contactNo: self.state.contactNo,
            address:self.state.address,
            gstNo:self.state.gstNo,
            email:self.state.email,
          })
       
          $.ajax({
            type: 'POST',
            data: JSON.stringify({
                
                fromDate:this.state.fromDate,
                toDate:this.state.toDate,
                customerId:this.state.customerId,
                companyId:this.state.companyId,

            }),
            url: "http://52.66.243.218:8080/ERPDetails/EstimateReport/Estimatecustomerstatementreport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
      
            success: function (data, textStatus, jqXHR) {
    
      
  
                ReactDOM.render(
                    <Router>
                      <div>
                  
          
                        <Route path="/" component={() => <CustomerStatement data={data}  />} />
          
          
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
         
          break;
        } 
      }
  
    }
    componentDidMount(){
      window.scrollTo(0, 0);      
   
    var self = this;
    var customerName;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
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
            orderNumber: item.orderNumber,
            customerId: item.customerId,
            contactNo: item.contactNo,
            address:item.address,
            gstNo:item.gstNo,
            email:item.email,
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
    $('#toDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#fromDate").datepicker("option", "maxDate", dt);
        self.setState({
          toDate: date,
        });

      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    $('#fromDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        $("#toDate").datepicker("option", "minDate", dt);
        self.setState({
          fromDate: date,
        });
      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });


    }


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    
      }

      BackbtnFunc() {
        ReactDOM.render(
          <Router>
            <div>
            
              <Route path="/" component={ReportMenuPage} />
            
      
            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();
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
                   <h4 style={{fontWeight:"300",fontSize:"30px"}}>Customer Statement</h4> 
                   </div>  
                   <div class="card-body">
          <div class="form-group row">
          <div class="col-md-3">
          <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
        
          <label htmlFor="fromDate" style={{ paddingRight: '50px', color: "black" }}> From:</label>
          
          <input
              style={{
                width: '46%',
                color: "black!important"
              }}
              type="text" className="form-control" 
              value={this.state.fromDate}
              id="fromDate" name="fromDate"
              onChange={this.handleUserInput} />
              </form>
          </div>
          <div class="col-md-3">
          <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
          <label
              htmlFor="toDate"
              style={{ marginRight: '70px', color: "black" }}> To:</label>
          <input
              style={{
                width: '50%',
                color: "black!important"
              }}
              type="text" className="form-control" 
              value={this.state.toDate}
              id="toDate" name="toDate"
              onChange={this.handleUserInput} />
              </form>
          </div>
          <div class="col-md-3">
          <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
                
                  <select style={{
                width: '50%',
                color: "black!important"
              }} id="customerName" className="form-control" onChange={this.handleCustomerDetails} name="customerName"
               >

                  </select>  
              </form>
          </div>

          </div>
</div>
     
</div>

  </div>

);
}
}

export default EstimateCustomerStatement;