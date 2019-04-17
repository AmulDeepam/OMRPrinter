
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './gstdashboard.css';
import SalaryReportDisplay from './SalaryReportDisplay';
import Dashboardoverall from './Dashboardoverall';
var currentRow;
class SalaryReport extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
   
    this.state = {
      StaffId:'',
      month:''
      
    };

  }
  componentDidMount() {

    var self=this;
    $("#nodata").hide();
    window.scrollTo(0, 0);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
        companyId: companyId,
    });

    var self=this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
     url: "http://52.66.243.218:8080/ERPDetails/Payroll/salaryreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        if(data.length!=0){
    var tab = '<thead><tr class="headcolor"><th>StaffId</th><th>StaffName</th><th>Month</th><th>TotalWorkingHrs</th><th>GeneralWorkingHrs</th><th>OTWorkingHrs</th><th>Salary</th><th colspan="2" style="text-align: center; ">Actions</th></tr></thead>';
    
    
    $.each(data, function (i, item) {
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + item.staffId + '</td><td>' + item.staffName + '</td><td>' + item.month + '</td><td>' + item.totalWorkingHrs + '</td><td>' + item.workingHrs + '</td><td>' + item.otWorkingHrs + '</td><td>' + item.empTotalWorkingHrsSalary + '</td>'
      +'<td><button id="delete">Delete</button></td>'
        +'<td><button id="view" class="Update" data-toggle="modal" data-target="#myModalview" >View</button></td></tr></tbody>';
    });
    $("#tableHeadings").append(tab);
  }else{
    $("#nodata").show();
    $("#test-table-xls-button").hide();
    $("#myInput").hide();
}
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
  
      self.state.staffId=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
      self.state.month=currentRow.find("td:eq(2)").text(); 
  
      self.setState({
  
        staffId:self.state.staffId,
        month:self.state.month,
  
      })
  
  self.DeleteFunc(currentRow);
  
    });
  
    $("#tableHeadings").on('click', '#view', function () {
      // get the current row
      
          currentRow = $(this).closest("tr");
  
          //self.state.id=currentRow.find("td:eq(0)").text();
          self.state.staffId=currentRow.find("td:eq(0)").text(); 
          self.state.month=currentRow.find("td:eq(2)").text(); 
        
      self.setState({
  
        staffId:self.state.staffId,
        month:self.state.month,
         
      })
  
   
    ReactDOM.render(<SalaryReportDisplay staffId={self.state.staffId}
          month={self.state.month}  />, document.getElementById("contentRender"));
      
  
    });


  }

    DeleteFunc(currentRow)
    {

    
  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  this.state.companyId = companyId;
  this.setState({
      companyId: companyId,
  });
  var self=this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                staffId:self.state.staffId,
                month:self.state.month,
                companyId:this.state.companyId,
            }),
           url: "http://52.66.243.218:8080/ERPDetails/Payroll/salaryreportDelete",
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
                <div class="card-header">
         <h3 style={{fontWeight:"300",color:"black"}}>Salary Report</h3>
         <hr></hr>   </div>
      <div>
      <div class="card-body">

        <input style={{
          color: "black", width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
        <div    style={{ display: "grid" }}>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Salary_Report"
                    sheet="tablexls"
                    buttonText="Download Salary Report"/>
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

export default SalaryReport;