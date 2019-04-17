
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';
import Website from './Website';
import './gstdashboard.css';
import EstimateReportEdit from './EstimateReportEdit';
import EstimateReportDisplay from './EstimateReportDisplay';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Dashboardoverall from './Dashboardoverall';

var  currentRow;
class EstimateList1 extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
    this.state = {
      date: today,
      companyId:companyId,

    };
  }
  componentDidMount() {   
  
    var self=this;
    $("#nodata").hide();
    window.scrollTo(0, 0);
    this.setState({
        date: this.state.date,
     
      });
      var self=this;
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId:this.state.companyId,
       
    }),
    url: "http://52.66.243.218:8080/ERPDetails/saleorder/estimateinvoicereport",
    contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if(data.estimateinvoicereportlist.length!=0){
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Customer</th><th>Contact</th><th>Status</th><th>Total(Rs)</th><th>Balance(Rs)</th><th colspan="3" style="text-align: center; ">Actions</th></tr></thead>';
    var no;
    $.each(data.estimateinvoicereportlist, function (i, item) {
      no=parseInt(i)+1;
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.customerName + '</td><td>' + item.contactNo + '</td><td>' + item.payment_status +'</td><td>' + item.subtotal1 + '</td><td>' + item.balance_amount + '</td><td class="customerId">'+item.customerId+'</td><td class="companyName">'+item.companyName+'</td>'
      +'<td><button id="delete">Delete</button></td>'
      +'<td><button id="view">View</button></td><td><button id="edit">Edit</button></td></tr></tbody>';
    });
    $("#tableHeadings").append(tab);
    $(".customerId").hide();
    $(".companyName").hide();
         }
         else{
          $("#nodata").show();
          $("#test-table-xls-button").hide();
          $("#myInput").hide();
      }
      
         }, 
        error: function (data) {
            confirmAlert({
              title: 'No Internet',                        // Title dialog
              message: 'Network Connection Problem',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            });
        
          }
        });


    //search button func 
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    $("#tableHeadings").on('click', '#delete', function () {
      // get the current row
      
          currentRow = $(this).closest("tr");
  
      self.state.id = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
      self.state.date=currentRow.find("td:eq(2)").text(); 
      self.state.contactNo=currentRow.find("td:eq(4)").text(); 
  
    
      self.setState({
  
        id:self.state.id,
        date:self.state.date,
        contactNo:self.state.contactNo,
  
      })
  
  self.DeleteFunc(currentRow);
  
    });
  
    $("#tableHeadings").on('click', '#view', function () {
      // get the current row
      
          currentRow = $(this).closest("tr");
  
          self.state.id=currentRow.find("td:eq(1)").text();
        //  self.state.invoiceNo=currentRow.find("td:eq(1)").text(); 
          self.state.date=currentRow.find("td:eq(2)").text(); 
          self.state.userName = currentRow.find("td:eq(3)").text(); // get current row 1st TD value
          self.state.contact=currentRow.find("td:eq(4)").text(); 
          self.state.status=currentRow.find("td:eq(5)").text(); 
          self.state.balanceAmt=currentRow.find("td:eq(7)").text(); 
          self.state.subtotal1=currentRow.find("td:eq(6)").text(); 
          self.state.customerId=currentRow.find("td:eq(8)").text(); 
          self.state.companyName=currentRow.find("td:eq(8)").text(); 
      self.setState({
  
          userName:self.state.userName,
          amount:self.state.amount,
          date:self.state.date,
          customerId:self.state.customerId,
          companyName:self.state.companyName,
      })
  
   
    ReactDOM.render(<EstimateReportDisplay id={self.state.id} invoiceNo={self.state.invoiceNo}
          date={self.state.date} userName={self.state.userName}  contact={self.state.contact}
          companyName={self.state.companyName}   status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} />, document.getElementById("contentRender"));
      
  
    });
  
   $("#tableHeadings").on('click', '#edit', function () {
    // get the current row
    
        currentRow = $(this).closest("tr");
  
    //    self.state.id=currentRow.find("td:eq(1)").text();
    self.state.invoiceNo=currentRow.find("td:eq(1)").text(); 
    self.state.date=currentRow.find("td:eq(2)").text(); 
    self.state.userName = currentRow.find("td:eq(3)").text(); // get current row 1st TD value
    self.state.contact=currentRow.find("td:eq(4)").text(); 
    self.state.status=currentRow.find("td:eq(5)").text(); 
    self.state.balanceAmt=currentRow.find("td:eq(7)").text(); 
    self.state.subtotal1=currentRow.find("td:eq(6)").text();
    self.state.customerId=currentRow.find("td:eq(8)").text();  
   
  
    self.setState({
  
        id:self.state.id,
        invoiceNo:self.state.invoiceNo,
        date:self.state.date,
        userName:self.state.userName ,
        contact:self.state.contact,
        status:self.state.status,
        balanceAmt:self.state.balanceAmt,
        subtotal1:self.state.subtotal1,
        customerId:self.state.customerId,
  
    })
  
    //self.UpdateSubmit(currentRow);
  
  
  ReactDOM.render(<EstimateReportEdit invoiceNo={self.state.invoiceNo} 
        date={self.state.date} userName={self.state.userName}  contact={self.state.contact}
        status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} />, document.getElementById("contentRender"));
    
  
  
   
  
  });

  }


  DeleteFunc(currentRow)
  {
      var self=this;
  
      $.ajax({
          type: 'POST',
          data: JSON.stringify({
              id:self.state.id,
              date:self.state.date,
              contactNo:self.state.contactNo,
              companyId:this.state.companyId,
          }),
         url: "http://52.66.243.218:8080/ERPDetails/EstimateReport/DailyEstimateReportDelete",
          contentType: "application/json",
          dataType: 'json',
          async: false,
    
          success: function (data, textStatus, jqXHR) {
  
              currentRow.remove();
  
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
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Estimate Report</h4>
      </div>
      <div>
      <div class="card-body">

     <input style={{
          color: "black", width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
          type="text" id="myInput" placeholder="Search.." title="Type in a name" />
     <div    style={{ display: "grid" }}>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Estimate_Invoice_List"
                    sheet="tablexls"
                    buttonText="Download Invoice List"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
     
        </div>
<h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>

        </div>
        </div>
</div>
      </div>
    );
  }

}

export default EstimateList1;