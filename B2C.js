
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';
import Website from './Website';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './gstdashboard.css';
import GSTR1 from './GSTR1';
import Dashboardoverall from './Dashboardoverall';
var i;
class B2C1 extends Component {
  constructor(data) {
    super(data)
    this.state = {
      date: '',
      companyId: '',
      employeeId: '',
      fromDate: '',
      toDate: '',
      month:'',
      totalgst: 0,
      totalcgst: 0,
      totalsgst: 0,
      totaligst: 0,
      totalgst1: 0,
      totalcgst1: 0,
      totalsgst1: 0,
      totaligst1: 0,
   
    }
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
   
    
  }


  componentDidMount(){
    window.scrollTo(0, 0);      
   
  }
  MonthlyFunc(value) {
    var self=this;
    $(function() {
      $( 'ul.nav li' ).on( 'click', function() {
            $( this ).parent().find( 'li.active' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
      });
});
    $("#tableHeadings").empty();
    window.scrollTo(0, 0);
 

    var today = new Date();

    var val1 = value;

    if (value == ("01") || value == ("03") || value == ("05") || value == ("07") || value == ("08") || value == ("10") || value == ("12")) {

      var j = (i - 1);
      if (j == val1) {

        this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();
        this.state.month=value;

      } else {

        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '31';
         this.state.month=value;
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month:this.state.month,
      });

    }
    else if (value == ("04") || value == ("06") || value == ("09") || value == ("11")) {
      var j = (i - 1);
      if (j == val1) {
        this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();
         this.state.month=value;
      } else {

        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '30';
         this.state.month=value;
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month:this.state.month,
      });
    } else if (value == ("02")) {
      if (today.getFullYear() % 100 == 0 && today.getFullYear() % 400 == 0 && today.getFullYear() % 4 == 0) {
        var j = (i - 1);
        if (j == val1) {
          this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
          this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();
           this.state.month=value;
        } else {

          this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
          this.state.toDate = today.getFullYear() + '-' + value + '-' + '29';
           this.state.month=value;
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month:this.state.month,
        });

      }
      else {
        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '28';
         this.state.month=value;
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month:this.state.month,
        });
      }

    }

   
    this.setState({     
      month: this.state.month,
    });




    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        month: this.state.month,
      }),
      url: "http://52.66.243.218:8080/ERPDetails/gst/businesstocustomerreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
      var tab = '<thead><tr class="headcolor"><th>Invoice No</th><th>Invoice Date</th><th>Customer Name</th><th>Taxable Value</th><th>CGST</th><th>SGST</th><th>IGST</th><th>Total</th></tr></thead>';
        $.each(data.businesstocustomerreportlist, function (i, item) {
 
          tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + item.invoiceNo + '</td><td>' + item.invoiceDate + '</td><td>' + item.customerName + '</td><td>' + item.totalgst + '</td><td>' + item.totalcgst + '</td><td>' + item.totalsgst + '</td><td>' + item.totaligst + '</td><td>' + item.subtotal1 + '</td></tr></tbody>';
        });
       $("#tableHeadings").append(tab);

        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={B2C1} />        

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


      },
    });

  }
  
B2BFunc(){
    ReactDOM.render(
        <Router>
            <div>        
                <Route path="/" component={GSTR1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}
B2CFunc(){
    ReactDOM.render(
        <Router>
            <div>         
                <Route path="/" component={B2C1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
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
      <div class="card-header" style={{backgroundColor:"white"}}>
      <ul class="nav nav-tabs">
    <li><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.B2BFunc()}><span style={{display:"inline-grid"}}>Business to Business</span></a></li>
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.B2CFunc()}><span style={{display:"inline-grid"}}>Business to Customer</span></a></li>
    </ul>
      
      </div>
      </div>
      <div>
      <div class="card-body">
      <ul class="nav nav-tabs">
      <li class="active"><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  className="active"  id="1" onClick={(e) => this.MonthlyFunc("01")}><span style={{display:"inline-grid"}}>January</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="2" onClick={(e) => this.MonthlyFunc("02")}><span style={{display:"inline-grid"}}>Febuary</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="3" onClick={(e) => this.MonthlyFunc("03")}><span style={{display:"inline-grid"}}>March</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="4" onClick={(e) => this.MonthlyFunc("04")}><span style={{display:"inline-grid"}}>April</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="5" onClick={(e) => this.MonthlyFunc("05")}><span style={{display:"inline-grid"}}>May</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="6" onClick={(e) => this.MonthlyFunc("06")}><span style={{display:"inline-grid"}}>June</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="7" onClick={(e) => this.MonthlyFunc("07")}><span style={{display:"inline-grid"}}>July</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="8" onClick={(e) => this.MonthlyFunc("08")}><span style={{display:"inline-grid"}}>August</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="9" onClick={(e) => this.MonthlyFunc("09")}><span style={{display:"inline-grid"}}>September</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="10" onClick={(e) => this.MonthlyFunc("10")}><span style={{display:"inline-grid"}}>October</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="11" onClick={(e) => this.MonthlyFunc("11")}><span style={{display:"inline-grid"}}>November</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="12" onClick={(e) => this.MonthlyFunc("12")}><span style={{display:"inline-grid"}}>December</span></a></li>
              
  </ul>
  <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
      

       
        </div>
        </div>

      
      </div>
    );
  }

}

export default B2C1;