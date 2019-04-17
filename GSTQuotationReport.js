import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './gstdashboard.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import WithoutGSTQuotationList from './WithoutGSTQuotationList';
import GSTQuotationReportDisplay from './GSTQuotationReportDisplay';
import ReportMenuPage from './ReportMenuPage';

var currentRow;
class GSTQuotationReport extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      date: today,
      companyId:companyId,
      companyName:companyName,

      

    };
  }
  componentDidMount() {   
    $("#nodata").hide();
    var self=this;
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
    url: "http://52.66.243.218:8080/ERPDetails/quotation/gstquotationreport",
    contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
var no;
if(data.gstquotationreportlist.length!=0){
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>date</th><th>Name</th><th>Contact</th><th>Address</th><th>Balance</th><th>Total</th></tr></thead>';
    $.each(data.gstquotationreportlist, function (i, item) {
      no=parseInt(i)+1;
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.customerName + '</td><td>' + item.contactNo + '</td><td>' + item.address +'</td><td>' + item.totalgst + '</td><td>' + item.subtotal1 + '</td></tr></tbody>';

    });
    $("#tableHeadings").append(tab);
  }else{
    $("#nodata").show();
    $("#myInput").hide();
    $("#test-table-xls-button").hide();


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
    
        self.state.invoiceNo = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
        self.state.date=currentRow.find("td:eq(2)").text(); 
    
      
        self.setState({
    
          id:self.state.id,
          date:self.state.date,
    
        })
    
    self.DeleteFunc(currentRow);
    
      });
    
      $("#tableHeadings").on('click', '#view', function () {
        // get the current row
        
            currentRow = $(this).closest("tr");
    
            self.state.invoiceNo=currentRow.find("td:eq(1)").text();
        //    self.state.invoiceNo=currentRow.find("td:eq(1)").text(); 
            self.state.date=currentRow.find("td:eq(2)").text(); 
            self.state.userName = currentRow.find("td:eq(3)").text(); // get current row 1st TD value
            self.state.contact=currentRow.find("td:eq(4)").text(); 
            self.state.status=currentRow.find("td:eq(5)").text(); 
            self.state.balanceAmt=currentRow.find("td:eq(6)").text(); 
            self.state.total=currentRow.find("td:eq(7)").text(); 
    
      
        self.setState({
    
            userName:self.state.userName,
            amount:self.state.amount,
            date:self.state.date,
    
        })
    
     
        ReactDOM.render(<GSTQuotationReportDisplay invoiceNo={self.state.invoiceNo}  />, document.getElementById("contentRender"));
            
    
      });

  }


  DeleteFunc(currentRow)
  {
      var self=this;
  
      $.ajax({
          type: 'POST',
          data: JSON.stringify({
            invoiceNo:self.state.invoiceNo,
              date:self.state.date,
              companyId:this.state.companyId,
          }),
         url: "http://52.66.243.218:8080/ERPDetails/QuotationReport/DeleteGSTQuotationReport",
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
        
          <Route path="/" component={ReportMenuPage} />
        
  
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  printdiv(printarea) {
    var originalContents = document.body.innerHTML;
    $("#test-table-xls-button").hide();
    $("#backbutton").hide();
    $("#print").hide();
    $("#myInput").hide();
    window.print(originalContents);
    $("#backbutton").show();
    $("#print").show();
    $("#test-table-xls-button").show();
    $("#myInput").show();
    // $(w.document.body).html(html);
  
  }
  
  render() {
    return (
        
      <div class="container">
       <div class="row">
                    <div class="col-sm-6 ">
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

                    </div> <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>  
                    <div id="printarea">
                      <div style={{ display: "grid" }}>
                    <h2 style={{fontWeight:"300",fontSize:"30px",textAlign:"center"}}> {this.state.companyName}</h2>
                <h5 style={{fontWeight:"300",fontSize:"30px",textAlign:"center"}}>GSTQuotation REPORT</h5>
                <hr></hr>
</div>
       
          
        <input style={{
          color: "black", width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
        <div    style={{ display: "grid" }}>
<div>
<ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="GSTQuotation_List"
                    sheet="tablexls"
                    buttonText="Download GSTQuotation List"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
        
        </div>

          
    <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>
    </div>
        </div>

    );
  }

}

export default GSTQuotationReport;