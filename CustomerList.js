
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
import Dashboardoverall from './Dashboardoverall';
import CustomerListView from './CustomerListView';
import CustomerListEdit from './CustomerListEdit';
var currentRow;
var i = 1;
class CustomerList1 extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      contactNo: '',

    }

  }
  componentDidMount() {
    $("#nodata").hide();
    var self = this;
    window.scrollTo(0, 0);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),

      url: "http://52.66.243.218:8080/ERPDetails/master/customerreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        var no;
        console.log("data", data)
        if (data.customerRetrievelist.length != 0) {
          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Customer Name</th><th>Company Name</th><th style="width:30%;">Address</th><th>Contact No</th><th  colspan="3" style="text-align: center; ">Actions</th></tr></thead>';
          $.each(data.customerRetrievelist, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.customerName + '</td><td>' + item.companyName + '</td><td>' + item.address + '</td><td>' + item.contactNo + '</td><td class="city">' + item.city + '</td><td class="alternatecontactNo">' + item.alternateContactNo + '</td><td class="gstNo">' + item.gstNo + '</td><td class="email">' + item.email + '</td><td class="customerId">' + item.customerId + '</td><td><button id="delete">Delete</button><td><button id="view">View</button></td><td><button id="edit">Edit</button></td></td></tr></tbody>';
          });
          $("#tableHeadings").append(tab);
          $(".city").hide();
          $(".alternatecontactNo").hide();
          $(".gstNo").hide();
          $(".email").hide();
          $(".customerId").hide();
          
        } else {
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

      var currentRow = $(this).closest("tr");
      console.log("cr", currentRow);
      var customerName = currentRow.find("td:eq(1)").text();
      var contactNo = currentRow.find("td:eq(4)").html(); // get current row 1st TD value
      console.log("cr", contactNo);

      self.state.contactNo = contactNo;
      self.state.customerName =customerName;



      self.setState({
        contactNo: self.state.contactNo,
        customerName:self.state.customerName,
      })

      confirmAlert({
        title: 'Delete Confirmation',                        // Title dialog
        message: 'Would you like to delete '+ self.state.customerName + ' details ? ',               // Message dialog
        confirmLabel: 'Delete',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.DeleteFunc(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel

      })
      console.log("console contactno", self.state.contactNo);

      // self.DeleteFunc(currentRow);

    });


    $("#tableHeadings").on('click', '#view', function () {
      // get the current row

      currentRow = $(this).closest("tr");
      self.state.customerName = currentRow.find("td:eq(1)").text();
      self.state.companyName = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
      self.state.address = currentRow.find("td:eq(3)").text();
      self.state.contactNo = currentRow.find("td:eq(4)").text();
      self.state.city = currentRow.find("td:eq(5)").text();
      self.state.alternateContactNo = currentRow.find("td:eq(6)").text(); // get current row 1st TD value
      self.state.gstNo = currentRow.find("td:eq(7)").text();
      self.state.email = currentRow.find("td:eq(8)").text();
      self.state.customerId = currentRow.find("td:eq(9)").text();

      if( self.state.companyName =="null" || self.state.companyName =="-" )
      {
        self.state.companyName=" ";
      } if(self.state.address =="null" || self.state.address =="-")
      {
        self.state.address=" ";
      } if(self.state.city =="null" || self.state.city =="-")
      {
        self.state.city=" ";
      } if(self.state.alternateContactNo =="null" || self.state.alternateContactNo =="-")
      {
        self.state.alternateContactNo=" ";
      }if(self.state.gstNo =="null" || self.state.gstNo =="-")
      {
        self.state.gstNo=" ";
      }if(self.state.email =="null" || self.state.email =="-")
      {
        self.state.email=" ";
      }

      self.setState({
        customerName: self.state.customerName,
        companyName: self.state.companyName,
        address: self.state.address,
        contactNo: self.state.contactNo,
        city: self.state.city,
        alternateContactNo: self.state.alternateContactNo,
        gstNo: self.state.gstNo,
        email: self.state.email,
        customerId:self.state.customerId,

      


      })
      ReactDOM.render(<CustomerListView customerName={self.state.customerName}
        companyName={self.state.companyName} address={self.state.address} contactNo={self.state.contactNo} city={self.state.city} gstNo={self.state.gstNo} email={self.state.email} alternateContactNo={self.state.alternateContactNo} customerId={self.state.customerId}
    />, document.getElementById("contentRender"));



    });


    $("#tableHeadings").on('click', '#edit', function () {
      // get the current row

      currentRow = $(this).closest("tr");
      self.state.customerName = currentRow.find("td:eq(1)").text();
      self.state.companyName = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
      self.state.address = currentRow.find("td:eq(3)").text();
      self.state.contactNo = currentRow.find("td:eq(4)").text();
      self.state.city = currentRow.find("td:eq(5)").text();
      self.state.alternateContactNo = currentRow.find("td:eq(6)").text(); // get current row 1st TD value
      self.state.gstNo = currentRow.find("td:eq(7)").text();
      self.state.email = currentRow.find("td:eq(8)").text();
      self.state.customerId = currentRow.find("td:eq(9)").text();

      self.state.oldCustomerName = self.state.customerName;
      self.state.oldCompanyName = self.state.companyName;
      self.state.oldAddress = self.state.address;
      self.state.oldContactNo = self.state.contactNo;
      self.state.oldCity = self.state.city;
      self.state.oldAlternateContactNo = self.state.alternateContactNo;
      self.state.oldGstNo = self.state.gstNo;
      self.state.oldEmail = self.state.email;
      if( self.state.companyName =="null" || self.state.companyName =="-" )
      {
        self.state.companyName=" ";
      } if(self.state.address =="null" || self.state.address =="-")
      {
        self.state.address=" ";
      } if(self.state.city =="null" || self.state.city =="-")
      {
        self.state.city=" ";
      } if(self.state.alternateContactNo =="null" || self.state.alternateContactNo =="-")
      {
        self.state.alternateContactNo=" ";
      }if(self.state.gstNo =="null" || self.state.gstNo =="-")
      {
        self.state.gstNo=" ";
      }if(self.state.email =="null" || self.state.email =="-")
      {
        self.state.email=" ";
      }

      self.setState({
        customerName: self.state.customerName,
        companyName: self.state.companyName,
        address: self.state.address,
        contactNo: self.state.contactNo,
        city: self.state.city,
        alternateContactNo: self.state.alternateContactNo,
        gstNo: self.state.gstNo,
        email: self.state.email,
        customerId:self.state.customerId,

        oldCustomerName: self.state.oldCustomerName,
        oldCompanyName: self.state.oldCompanyName,
        oldAddress: self.state.oldAddress,
        oldContactNo: self.state.oldContactNo,
        oldCity: self.state.oldCity,
        oldAlternateContactNo: self.state.oldAlternateContactNo,
        oldGstNo: self.state.oldGstNo,
        oldEmail: self.state.oldEmail,



      })
      ReactDOM.render(<CustomerListEdit customerName={self.state.customerName}
        companyName={self.state.companyName} address={self.state.address} contactNo={self.state.contactNo} city={self.state.city} gstNo={self.state.gstNo} email={self.state.email} alternateContactNo={self.state.alternateContactNo} customerId={self.state.customerId}
        oldCustomerName={self.state.oldCustomerName} oldCompanyName={self.state.oldCompanyName} oldAddress={self.state.oldAddress} oldContactNo={self.state.oldContactNo} oldCity={ self.state.oldCity} oldAlternateContactNo={ self.state.oldAlternateContactNo} oldGstNo={ self.state.oldGstNo} oldEmail={ self.state.oldEmail} />, document.getElementById("contentRender"));



    });
  }


  DeleteFunc(currentRow) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        contactNo: self.state.contactNo,
        companyId: self.state.companyId,

      }),
      url: "http://52.66.243.218:8080/ERPDetails/master/deletecustomer",
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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={CustomerList1} />
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
          <div class="card-header" style={{ backgroundColor: "" }}>
            <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Customer List</h4>
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
              <div style={{ display: "grid" }}>
                <div >
                  <ReactHTMLTableToExcel

                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Customer_List"
                    sheet="tablexls"
                    buttonText="Download Customer List" />
                </div>
                <div id="tableOverflow">
                  <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

                  </table>
                </div>

              </div>
              <h2 id="nodata" style={{ textAlign: "center" }}>No Data</h2>
            </div>
          </div>
        </div>

      </div>
    );
  }

}

export default CustomerList1;