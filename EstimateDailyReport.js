import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import './gstdashboard.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import Estimate from './Estimate';
import EstimateList from './EstimateList';

import registerServiceWorker from './registerServiceWorker';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

//import SalesReportEdit from './SalesReportEdit';
import EstimateReportDisplay from './EstimateReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import EstimateReportEdit from './EstimateReportEdit';
var numberToWord = require('npm-number-to-word');
var  currentRow;

class EstimateDailyReport extends Component {

    constructor() {
        super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
        date: today1,
        companyId:companyId,
        companyName:companyName,
      };



}


componentDidMount(){

$("#nodata").hide();
var self=this;

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            date:this.state.date,
            companyId:this.state.companyId,
        }),
       url: "http://52.66.243.218:8080/ERPDetails/EstimateReport/DailyEstimateReport",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {
            var no;
           
   if(data.length!=0){
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead>';
      $.each(data, function (i, item) {
        no=parseInt(i)+1;
        tab += '<tbody id= "myTable" ><tr   id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
        +'<td>'+item.status+'</td><td>'+item.subtotal1+'</td><td>'+item.balanceAmt+'</td><td class="customerId">'+item.customerId+'</td></tr></tbody>';


      });
      $("#tableHeadings").append(tab);
      $(".customerId").hide();
    }else{
        $("#nodata").show();
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



  $("#tableHeadings").on('click', '#delete', function () {
    // get the current row
    
        currentRow = $(this).closest("tr");

    self.state.id = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
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

        self.state.id=currentRow.find("td:eq(1)").text();
      //  self.state.invoiceNo=currentRow.find("td:eq(1)").text(); 
        self.state.date=currentRow.find("td:eq(2)").text(); 
        self.state.userName = currentRow.find("td:eq(3)").text(); // get current row 1st TD value
        self.state.contact=currentRow.find("td:eq(4)").text(); 
        self.state.status=currentRow.find("td:eq(5)").text(); 
        self.state.balanceAmt=currentRow.find("td:eq(7)").text(); 
        self.state.subtotal1=currentRow.find("td:eq(6)").text(); 

  
    self.setState({

        userName:self.state.userName,
        amount:self.state.amount,
        date:self.state.date,

    })

 
	ReactDOM.render(<EstimateReportDisplay id={self.state.id} invoiceNo={self.state.invoiceNo}
        date={self.state.date} userName={self.state.userName}  contact={self.state.contact}
        status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} />, document.getElementById("contentRender"));
		

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


handleUserInput =(e) =>{

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

    window.print(originalContents);
    $("#backbutton").show();
    $("#print").show();
    $("#test-table-xls-button").show();
    // $(w.document.body).html(html);

}




    render() {
        return (


            <div class="container" style={{height:"20px"}}>
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
                <h5 style={{fontWeight:"300",fontSize:"30px",textAlign:"center"}}>ESTIMATE DAILY REPORT</h5>
                <hr></hr>
</div>
       

 

     <div    style={{ display: "grid" }}>
               
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="DailyEstimate_List"
                    sheet="tablexls"
                    buttonText="Download DailyEstimate List"/>
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

export default EstimateDailyReport;