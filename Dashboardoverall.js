import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import { Pie, Bar, HorizontalBar, Doughnut, Bubble, Line } from 'react-chartjs-2';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Chart from 'chart.js';

import CryptoJS from 'crypto-js';
//jsfile
import Expense from './Expense';

import AdminAddUser from './AdminAddUser';
import AddRole from './AddRole';
import AddProduct from './AddProduct';
import VendorEntryForm from './VendorEntryForm';
import SaleOrder from './SaleOrder';
import GSTQuotation from './GSTQuotation';
import InvoiceList from './InvoiceList';

//import ChangePassword1 from './ChangePassword1';

//css
import './gstdashboard.css';


class Dashboardoverall extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {

      date: '',
      current_Month: '',
      current_Year: '',
      companyId:companyId,
      SaleInvoice_Total_Amt: 0,
      monthly_Purchase: 0,
      monthly_Expense: 0,
      monthly_Profit: 0,
      monthly_PurchaseInvoice: 0,
      monthly_ExpenseInvoice: 0,
      total_No_of_Vendors: 0,
      total_No_of_ProductList: 0,
      total_No_of_SaleInvoice: 0,
      total_No_of_WithGST_Quotation: 0,
      total_No_of_SaleInvoice_Qty: 0,
      total_No_of_SaleInvoice_Qty_Estimate: 0,
      total_No_of_Salary_paid: 0,

      total_Sales_Amount_Annually: 0,
      total_Purchase_Amount_Annually: 0,



      chartData: {

        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: 'Sales',
          backgroundColor: [
            'rgb(53, 202, 45)',

          ],
        },
        {
          label: 'Purchase',
          backgroundColor: [
            '#7377f1',
          ],

        },
        ],
      },
      doughnutData: {

        labels: ['Sale Qty', 'Paid Salary', 'Total Expense'],
        datasets: [{
          label: 'Statistics',
          backgroundColor: [
            '#ca2374',
            '#13abc4',
            '#36622b'

          ],

        },

        ]
      },
      formErrors: { passwordValid: '', },
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.DashboardDisplayFunc();

    this.state.monthly_Profit = Math.round(((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

    console.log("", this.state.monthly_Profit, this.state.SaleInvoice_Total_Amt, this.state.monthly_PurchaseInvoice, this.state.monthly_ExpenseInvoice);


    /*   var ctx = document.getElementById("#myChart");
*/

  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }


  addProduct() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={AddProduct} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  addQuotation() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={GSTQuotation} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  addSalesInvoice() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={SaleOrder} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  addVendors() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={VendorEntryForm} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  viewAll() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={InvoiceList} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  DashboardDisplayFunc(value) {

    var today = new Date();
    this.state.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.current_Month = today.getMonth() + 1;
    this.state.current_Year = today.getFullYear();


    var self = this;


    console.log("this.state.date", this.state.date);
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        current_Month: this.state.current_Month,
        current_Year: this.state.current_Year,
        companyId:this.state.companyId,

      }),
     url: "http://52.66.243.218:8080/ERPDetails/DashboardDisplay/DashboardDisplayFrontpage",
    // url: "http://localhost:8080/ERPDetails/DashboardDisplay/DashboardDisplayFrontpage",
     
     contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("dt", data);
        console.log("monthly_SalesInvoice"+data.monthly_SalesInvoice );
        console.log("monthly_PurchaseInvoice"+data.monthly_PurchaseInvoice );
        if (data.monthly_SalesInvoice != null)
        {
          self.state.SaleInvoice_Total_Amt = data.monthly_SalesInvoice;
        }
         else{
          self.state.SaleInvoice_Total_Amt="0";
         }

        if (data.monthly_PurchaseInvoice != null)
        {
          self.state.monthly_PurchaseInvoice = data.monthly_PurchaseInvoice;
        }else{

          self.state.monthly_PurchaseInvoice="0";
        }
     //  alert("monthlypurchasevaluenot"+self.state.monthly_PurchaseInvoice)

        if (data.monthly_ExpenseInvoice != null)
          self.state.monthly_ExpenseInvoice = data.monthly_ExpenseInvoice;

        self.state.total_No_of_Vendors = data.total_No_of_Vendors;
        self.state.total_No_of_ProductList = data.total_No_of_ProductList;
        self.state.total_No_of_SaleInvoice = data.total_No_of_SaleInvoice;
        self.state.total_No_of_WithGST_Quotation = data.total_No_of_WithGST_Quotation;

        if (data.total_No_of_SaleInvoice_Qty != null)
          self.state.total_No_of_SaleInvoice_Qty = data.total_No_of_SaleInvoice_Qty;

        if (data.total_No_of_SaleInvoice_Qty_Estimate != null)
          self.state.total_No_of_SaleInvoice_Qty_Estimate = data.total_No_of_SaleInvoice_Qty_Estimate;

        if (data.total_No_of_Salary_paid != null)
          self.state.total_No_of_Salary_paid = data.total_No_of_Salary_paid;

        if (data.total_Sales_Amount_Annually != null)
          self.state.total_Sales_Amount_Annually = data.total_Sales_Amount_Annually;

        if (data.total_Purchase_Amount_Annually != null)
          self.state.total_Purchase_Amount_Annually = data.total_Purchase_Amount_Annually;

        if (data.total_No_of_SaleInvoice_Qty != null)
          self.state.doughnutData.datasets[0].data[0] = self.state.total_No_of_SaleInvoice_Qty;

        if (data.total_No_of_Salary_paid != null)
          self.state.doughnutData.datasets[0].data[1] = self.state.total_No_of_Salary_paid;

        if (data.monthly_ExpenseInvoice != null)
          self.state.doughnutData.datasets[0].data[2] = self.state.monthly_ExpenseInvoice;


        var janvalue = 0;
        var febvalue = 0;
        var marvalue = 0;
        var aprvalue = 0;
        var mayvalue = 0;
        var junvalue = 0;
        var julvalue = 0;
        var augvalue = 0;
        var sepvalue = 0;
        var octvalue = 0;
        var novvalue = 0;
        var decvalue = 0;


        $.each(data.dashboard_LineChart_List, function (i, item) {
          if (item.current_Month == 1) {
            janvalue = item.monthly_SalesInvoice;


          }
          else if (item.current_Month == 2) {
            febvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 3) {
         //   alert("monthlysaleinvoicevalue"+item.monthly_SalesInvoice);
            marvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 4) {
            aprvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 5) {
            mayvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 6) {
            junvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 7) {
            julvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 8) {
            augvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 9) {
            sepvalue = item.monthly_SalesInvoice;

          }
          else if (item.current_Month == 10) {
            octvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 11) {
            novvalue = item.monthly_SalesInvoice;

          }
          else if (item.current_Month == 12) {
            decvalue = item.monthly_SalesInvoice;

          }
        });


        self.state.chartData.datasets[0].data[0] = janvalue;
        self.state.chartData.datasets[0].data[1] = febvalue;
        self.state.chartData.datasets[0].data[2] = marvalue;
        self.state.chartData.datasets[0].data[3] = aprvalue;
        self.state.chartData.datasets[0].data[4] = mayvalue;
        self.state.chartData.datasets[0].data[5] = junvalue;
        self.state.chartData.datasets[0].data[6] = julvalue;
        self.state.chartData.datasets[0].data[7] = augvalue;
        self.state.chartData.datasets[0].data[8] = sepvalue;
        self.state.chartData.datasets[0].data[9] = octvalue;
        self.state.chartData.datasets[0].data[10] = novvalue;
        self.state.chartData.datasets[0].data[11] = decvalue;
         janvalue = 0;
         febvalue = 0;
         marvalue = 0;
         aprvalue = 0;
         mayvalue = 0;
         junvalue = 0;
         julvalue = 0;
         augvalue = 0;
         sepvalue = 0;
         octvalue = 0;
         novvalue = 0;
         decvalue = 0;

        $.each(data.dashboard_LineChart_List_purchase, function (i, item) {
          if (item.current_Month == 1) {
            janvalue = item.monthly_PurchaseInvoice;


          }
          else if (item.current_Month == 2) {
            febvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 3) {
           // alert("monthlyPurchaseinvoicevalue"+item.monthly_PurchaseInvoice);
            marvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 4) {
            aprvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 5) {
            mayvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 6) {
            junvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 7) {
            julvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 8) {
            augvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 9) {
            sepvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 10) {
            octvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 11) {
            novvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 12) {
            decvalue = item.monthly_PurchaseInvoice;

          }
        });


        self.state.chartData.datasets[1].data[0] = janvalue;
        self.state.chartData.datasets[1].data[1] = febvalue;
        self.state.chartData.datasets[1].data[2] = marvalue;
        self.state.chartData.datasets[1].data[3] = aprvalue;
        self.state.chartData.datasets[1].data[4] = mayvalue;
        self.state.chartData.datasets[1].data[5] = junvalue;
        self.state.chartData.datasets[1].data[6] = julvalue;
        self.state.chartData.datasets[1].data[7] = augvalue;
        self.state.chartData.datasets[1].data[8] = sepvalue;
        self.state.chartData.datasets[1].data[9] = octvalue;
        self.state.chartData.datasets[1].data[10] = novvalue;
        self.state.chartData.datasets[1].data[11] = decvalue;

console.log("chartdata",self.state.chartData)
        self.setState({
          SaleInvoice_Total_Amt: self.state.SaleInvoice_Total_Amt,
          monthly_PurchaseInvoice: self.state.monthly_PurchaseInvoice,
          monthly_ExpenseInvoice: self.state.monthly_ExpenseInvoice,
          total_No_of_Vendors: self.state.total_No_of_Vendors,
          total_No_of_ProductList: self.state.total_No_of_ProductList,
          total_No_of_SaleInvoice: self.state.total_No_of_SaleInvoice,
          total_No_of_WithGST_Quotation: self.state.total_No_of_WithGST_Quotation,
          total_No_of_SaleInvoice_Qty: self.state.total_No_of_SaleInvoice_Qty,
          total_No_of_SaleInvoice_Qty_Estimate: self.state.total_No_of_SaleInvoice_Qty_Estimate,
          total_No_of_Salary_paid: self.state.total_No_of_Salary_paid,
          total_Sales_Amount_Annually: self.state.total_Sales_Amount_Annually,
          total_Purchase_Amount_Annually: self.state.total_Purchase_Amount_Annually,


        });

        console.log("this.state.date", data, data.SaleInvoice_Total_Amt, self.state.SaleInvoice_Total_Amt, self.state.dashboard_LineChart_List);
        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Status</th><th>Total</th></tr></thead>';
        console.log("recent s",data.dailyInvoiceList);
        if(data.dailyInvoiceList!=null){
        $.each(data.dailyInvoiceList, function (i, item) {
          no = parseInt(i) + 1;
          tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td>'
            + '<td>' + item.status + '</td><td>' + item.subTotal + '</td></tr></tbody>';


        });
        $("#tableHeadings").append(tab);

      }else{
        $("#tableHeadings").append('<h4>No Recent Sales</h3>');
        $("#loginSubmitButton").hide();

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



  }


  render() {


    return (
      <div class="container">
        <div class="content-wrapper" style={{ minHeight: "914px" }}>
          {/*   <!-- Content Header (Page header) --> */}
          <section class="content-header sty-one">
            <h1>Dashboard</h1>

          </section>
          {/*   <!-- Main content --> */}
          <section class="content">
            {/*   <h3>line graph yearly Earnings</h3>
 */}
            {/*  <div>

              <Line data={this.state.chartData}

                options={{
                }} />
            </div>
 */}
            <div id="dispchart" className="chart">

              {/*   <Pie data={this.state.chartData} width={50} height={200} options={{
                maintainAspectRatio: false
              }} /> */}

            </div>

            <div class="row">
              <div class="col-lg-3">
                <div class="tile-progress tile-pink">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ec3b83",
                      padding: "5px 0px",
                      color: "white"
                    }}>

                    <h3>₹ <span id="ContentPlaceHolder1_Lbl_monthlysale">{Math.round(this.state.SaleInvoice_Total_Amt)}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "#ec3b83" }}>
                    <div class="progress-bar" style={{ width: "65.50%", height: "20px", backgroundColor: "white" }}></div>
                  </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(212, 53, 118)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",
                    }}>
                    <h6>Monthly Sales</h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="tile-progress tile-red">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#f56954",
                      padding: "5px 0px",
                      color: "white"
                    }}>

                    <h3>₹ <span id="ContentPlaceHolder1_Lbl_monthlypurchase">{Math.round(this.state.monthly_PurchaseInvoice)}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "#f56954" }}>
                    <div class="progress-bar" style={{ width: "55.50%", height: "20px", backgroundColor: "white" }}></div>
                  </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(220, 94, 75)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",
                    }}>
                    <h6>Monthly Purchase</h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="tile-progress tile-cyan">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(0, 178, 158)",
                      padding: "5px 0px",
                      color: "white"
                    }}>

                    <h3>₹ <span id="ContentPlaceHolder1_Lbl_monthlyexpense">{Math.round(this.state.monthly_ExpenseInvoice)}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "rgb(0, 178, 158)" }}>
                    <div class="progress-bar" style={{ width: "45.50%", height: "20px", backgroundColor: "white" }}></div>
                  </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(0, 160, 142)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",
                    }}>
                    <h6>Monthly Expense</h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="tile-progress tile-aqua">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(0, 192, 239)",
                      padding: "5px 0px",
                      color: "white"
                    }}>

                    <h3>₹ <span id="ContentPlaceHolder1_Lbl_monthlyprofit">{Math.round(this.state.monthly_Profit)}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "rgb(0, 192, 239)" }}>
                    <div class="progress-bar" style={{ width: "75.50%", height: "20px", backgroundColor: "white" }}></div>
                  </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(0, 172, 215)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",
                    }}>
                    <h6>Monthly Profits</h6>
                  </div>
                </div>
              </div>

            </div>
            {/*   <!-- /.row -->
       */}
            <div class="row">
              <div class="col-lg-12">
                <div class="col-lg-9 info-box">

                  <div class="d-flex flex-wrap">
                    <div>
                      <h5>Yearly Earning {this.state.current_Year} </h5>
                    </div>
                    <div>
                      <Line data={this.state.chartData} width={"827px"} height={"330px"} style={{
                        width: "827px",
                        height: "330px!important",
                      }}

                        options={{

                          responsive: true,  
                          scales: {
                            yAxes: [
                              {
                                 ticks: {
                                  beginAtZero: true
                                }
                              }
                            ]
                          }
                        
                        }} />
                    </div>
                    {/*  <div class="ml-auto">
                        <ul class="list-inline">
                          <li class="text-green"> <i class="fa fa-circle"></i> Purchase</li>
                          <li class="text-blue"> <i class="fa fa-circle"></i> Sale</li>
                        </ul>
                      </div> */}
                  </div>

                </div>

                {/*         <div class="col-lg-9 m-b-3">

                    </div> */}
                <div class="col-3">
                  <div class="col-lg-3 m-t-5">
                    <div class="m-b-5 text-center"
                      style={{
                        padding: "10px 0px",
                        marginBottom: "20px",
                        backgroundColor: "#f5f5f5"
                      }}>
                      <span class="glyphicon glyphicon-flag"
                        style={{
                          color: "rgb(53, 202, 45)",
                          fontSize: "45px"
                        }}></span>
                      <hr style={{ borderTop: "3px solid #c9c6c6" }} />
                      <h6 class="f-14">Sale (₹)</h6>
                      <h4 id="salesTotalLable">₹{Math.round(this.state.total_Sales_Amount_Annually)}</h4>
                    </div>
                    <div class="m-b-5 text-center"
                      style={{
                        padding: "10px 0px",
                        marginBottom: "20px",
                        backgroundColor: "#f5f5f5"
                      }}
                    > <span class="glyphicon glyphicon-shopping-cart"
                      style={{
                        color: "#7377f1",
                        fontSize: "45px"
                      }}></span>
                      <hr style={{ borderTop: "3px solid #c9c6c6" }} />
                      <h6 class="f-14">Purchase (₹)</h6>
                      <h4 id="earningTotalLable">₹{Math.round(this.state.total_Purchase_Amount_Annually)}</h4>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            {/*   <!-- /.row -->
      */}
            <div class="card m-b-3" style={{ padding: "30px 20px" }}>
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-3 col-sm-6 col-xs-12"
                    style={{
                      color: "white",
                      backgroundColor: " #ff8a4a"
                    }}>
                    <div>
                      <div class="info-box-content">
                        <h4 class="text-blue text-center">Vendors</h4>
                        <h3 class="f-25 text-black text-center">
                          <span id="ContentPlaceHolder1_lbl_total_vendor" value>{this.state.total_No_of_Vendors}</span></h3>  </div>
                      <hr style={{ borderTop: "3px solid rgb(144, 57, 9)" }} />
                      <div class="text-center">
                        <a href="#" onClick={() => this.addVendors()}>
                          <span class="glyphicon glyphicon-plus"
                            style={{
                              color: "white",
                            }}></span>
                          Add Vendor</a></div>
                    </div>
                    {/*     <!-- /.info-box -->  */}
                  </div>
                  <div class="col-lg-3 col-sm-6 col-xs-12"
                    style={{
                      color: "white",
                      backgroundColor: " #298f9b"
                    }}>

                    <div>
                      <div class="info-box-content">
                        <h4 class="text-danger text-center"
                          style={{
                            color: "white"
                          }}>
                          Products</h4>
                        <h3 class="f-25 text-black text-center">
                          <span id="ContentPlaceHolder1_lbl_total_products">{this.state.total_No_of_ProductList}</span></h3>
                      </div>

                      <hr style={{ borderTop: "3px solid rgb(39, 63, 66)" }} />
                      <div class="text-center" >
                        <a href="#" onClick={() => this.addProduct()}>
                          <span class="glyphicon glyphicon-plus"
                            style={{
                              color: "white",
                            }}></span>Add Product</a></div>
                    </div>

                    {/*          <!-- /.info-box -->  */}
                  </div>
                  <div class="col-lg-3 col-sm-6 col-xs-12"
                    style={{
                      color: "white",
                      backgroundColor: " #909eb4"
                    }}>
                    <div>
                      <div class="info-box-content">
                        <h4 class="text-info text-center"
                          style={{
                            color: "white"
                          }}
                        >Invoices</h4>
                        <h3 class="f-25 text-black text-center"><span id="ContentPlaceHolder1_lbl_total_invoice">{this.state.total_No_of_SaleInvoice}</span></h3></div>
                      <hr style={{ borderTop: "3px solid rgb(39, 63, 66)" }} />
                      <div class="text-center">
                        <a href="#" onClick={() => this.addSalesInvoice()}>
                          <span class="glyphicon glyphicon-plus"
                            style={{
                              color: "white",
                            }}></span> Add Invoice</a></div>
                    </div>

                    {/*        <!-- /.info-box -->  */}
                  </div>
                  <div class="col-lg-3 col-sm-6 col-xs-12"
                    style={{
                      color: "white",
                      backgroundColor: " #d52484"
                    }}>
                    <div>
                      <div class="info-box-content">
                        <h4 class="text-green text-center">Quotations</h4>
                        <h3 class="f-25 text-black text-center"><span id="ContentPlaceHolder1_lbl_total_quotation">{this.state.total_No_of_WithGST_Quotation}</span></h3> </div>
                      <hr style={{ borderTop: "3px solid rgb(111, 43, 80)" }} />
                      <div class="text-center">
                        <a href="#" onClick={() => this.addQuotation()}>
                          <span class="glyphicon glyphicon-plus"
                            style={{
                              color: "white",
                            }}></span> Add Quotation</a></div>
                    </div>

                    {/*       <!-- /.info-box -->  */}
                  </div>
                </div>
              </div>
            </div>


            <div class="row" style={{ paddingBottom: "20px" }}>
              <div class="col-lg-6">
                <div>
                  <h3> Recent Sales</h3>
                  <button type="button" id="loginSubmitButton" style={{ float: "right",backgroundColor:"rgb(38, 66, 92)" }} onClick={() => this.viewAll()} className="btn btn-md-primary" >ViewAll</button>

                </div>
                <p></p>
                <div>
                  <table class="table" style={{overflowX:"auto"}} id="tableHeadings">

                  </table>
                </div>
              </div>


              {/* Doughnut chart  */}

              <div class="col-lg-6" style={{ paddingTop: "0px" }}>
                <div>
                  <h3> Statistics</h3>
                  <div class="col-lg-9 " style={{ textAlign: "-webkit-center" }}>
                    <Doughnut width={"400px"} height={"260px"} data={this.state.doughnutData}
                      options={{
                      }} />
                  </div>
                  <div class="col-lg-3 ">
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Sale Qty</h6>
                      <h4 id="Donut1">{this.state.total_No_of_SaleInvoice_Qty}</h4>
                    </div>
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Paid Salary</h6>
                      <h4 id="Donut2">{this.state.total_No_of_Salary_paid}</h4>
                    </div>
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Total Exp</h6>
                      <h4 id="Donut3">{this.state.monthly_ExpenseInvoice}</h4>
                    </div>
                  </div>

                </div>
              </div>


            </div>


          </section>

        </div>

      </div >
    );
  }

}
export default Dashboardoverall;


//0000000000000000000000000
/* var ctx;

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}); */