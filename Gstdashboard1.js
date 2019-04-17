import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Website from './Website';
import { Provider as AlertProvider, useAlert, positions, transitions } from 'react-alert';

import $ from 'jquery';
import CryptoJS from 'crypto-js';

//css
import './Gstdashboard1css.css';
import './Tictoksheader.css';
//pages
import VendorEntryForm from './VendorEntryForm';
import AddProduct from './AddProduct';
import CustomerList from './CustomerList';
import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import InvoiceList from './InvoiceList';
import Estimate from './Estimate';
import EstimateList from './EstimateList';
import PurchaseInvoice from './PurchaseInvoice';
import GSTQuotation from './GSTQuotation';
import PurchaseInvoiceList from './PurchaseInvoiceList';
import registerServiceWorker from './registerServiceWorker';
import Expense from './Expense';
import WithoutGSTQuotation from './WithoutGSTQuotation';
import QuotationList from './QuotationList';
import AddStaff from './AddStaff';
import StaffList from './StaffList';
import Salary from './Salary';
import SalaryReport from './SalaryReport';
import GST3B from './GST3B';
import AdminAddUser from './AdminAddUser';
import Attendance from './Attendance';
import EmailPage from './EmailPage';
import GSTR1 from './GSTR1';
import ReportMenuPage from './ReportMenuPage';
import MessageCenterEmailPage from './MessageCenterEmailPage';
import MessageCenterMessagePage from './MessageCenterMessagePage';
import LoginPage from './LoginPage';
import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import PeriodAttendanceReport from './PeriodAttendanceReport';
import Permission from './Permission';
import Dashboardoverall from './Dashboardoverall';

class Gstdashboard1 extends Component {
    constructor() {
        super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
        date: today1,
        companyId:companyId,
        companyName:companyName,
      };



}
    componentDidMount() {
        window.scrollTo(0, 0);      
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('open');
                $('#sidebar').toggleClass('active');
            /*  $(this).toggleClass('active');
             */ $('#sidebar').show();
            });


            $('#contentRender').on('click', function () {
                $('#sidebar').hide();
               $('#sidebarCollapse').removeClass('active');
               //$('#sidebar').css("background-color", "yellow");
               

});
    

        });
       {/* $(document).ready(function () {

            $('#sidebarCollapse').on('click', function (e) {
                $('#sidebar').toggleClass('active');
                if( $(e.target).is('a') ) {
                   // $(this).collapse('hide');
                //    $(this).collapse({toggle: false}).collapse('hide');
                    $(".collapse list-unstyled").collapse({toggle: false}).collapse('hide');

                }
              
                $("#MasterSubmenu").collapse({toggle: false}).collapse('hide');
            });
            $(document).on('click','.dropdown-toggle',function(e) {
            if( $(e.target).is('a:not(".dropdown-toggle")') ) {
                $(this).collapse('hide');
            }});
        });
*/} 

        this.DashBoardDisplay();
    }

    CustomerEntryForm() {


        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
        var i = permission.length;

		$.each(permission, function (i, item) {

			if (item.permission == "master") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

	        ReactDOM.render(
                <Router>
                    <div>
    
                        <Route path="/" component={Website} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}



    }
    VendorEntryForm() {

        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "master") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
    
                        <Route path="/" component={VendorEntryForm} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

    
    }
    AddProduct() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "master") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
    
            ReactDOM.render(
                <Router>
                    <div>
    
                        <Route path="/" component={AddProduct} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}


    }
    ProductList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "master") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={ProductList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

    
     
    }
    VendorList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "master") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={VendorList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

    
      
    }
    CustomerList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "master") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={CustomerList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

    
     
    }
    SaleOrder() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "saleorder") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={SaleOrder} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

    

    }
    InvoiceList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "saleorder") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={InvoiceList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
      

    }
    Estimate() {  
          var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

        if (item.permission == "saleorder") {
            flag = 0;//true
        }
    });

    if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={Estimate} />
                </div>
            </Router>,
            document.getElementById('contentRender'));


    }
    else {
        var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
        w.document.write('You are not Allowed to Access this Page')
        w.focus()
        setTimeout(function() {w.close();}, 2000)
    }
       
    }
    EstimateList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "saleorder") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={EstimateList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     

    }
    PurchaseInvoice() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "purchaseorder") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={PurchaseInvoice} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     

    }

    PurchaseInvoiceList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "purchaseorder") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={PurchaseInvoiceList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     
        

    }
    Expense() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "expense") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={Expense} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     



    }
    GSTQuotation() {

        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "quotation") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={GSTQuotation} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     
     
    }
    WithoutGSTQuotation() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "quotation") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={WithoutGSTQuotation} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     
       
    }
    QuotationList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "quotation") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={QuotationList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
       
    }
    AddStaff() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "employee") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={AddStaff} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
       
       
    }
    StaffList() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "employee") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={StaffList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
       
      
    }

    Salary() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "employee") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
          
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={Salary} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
       

    }
    SalaryReport() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "employee") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={SalaryReport} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
       
      
    }

    AdminAddUser() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "admin") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

		
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={AdminAddUser} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

       
    }
    Attendance() {

        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

		
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={Attendance} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}


    }
    MonthlyAttendanceReport(){
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

		
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={MonthlyAttendanceReport} />
                      </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

       
    
    }
    PeriodAttendanceReport(){
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={PeriodAttendanceReport} />
                      </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

      
    
    }

    MessageFunc() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "setting") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={MessageCenterMessagePage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}


       
    }

    EmailFunc() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "setting") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={MessageCenterEmailPage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

     
    }
    
    GST3B() {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "gst") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={GST3B} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}

        
    }
    GSTR1() {

        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "gst") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={GSTR1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}
     
    }
    ReportFunc() {

        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={ReportMenuPage} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		}


    }


   
    LogoutFunc() {
        localStorage.clear();
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={LoginPage} />

                </div>
            </Router>, document.getElementById('root'));
    }
    TaskMappingFunc()
    {
        var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "taskMapping") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

            
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={Permission} />
                      </div>
                </Router>,
                document.getElementById('contentRender'));

		}
		else {
            var w = window.open('','','resizable=yes,top=250,left=500,width=500,height=100')
            w.document.write('You are not Allowed to Access this Page')
            w.focus()
            setTimeout(function() {w.close();}, 2000)
		
		}

       

    }
    DashBoardDisplay(){
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={Dashboardoverall} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));

    }
    
    render() {
        return (


            <div class="" style={{
                paddingTop: "1px !important",
                paddingBottom: "1px !important",
                marginBottom: "25px !important"
            }}>


                <nav class="navbar navbar-inverse" style={{ marginBottom: "0px",padding:"5px", backgroundColor: "#26425c" }}>
                    <div style={{paddingTop:"0px"}} class="container-fluid justify-content-center">
                        <div class="navbar-header">
                            <a class="navbar-brand btn btn-info navbar-btn glyphicon glyphicon-align-justify" style={{ backgroundColor: "#26425c" }} id="headerIcon" href="#" to="/" id="sidebarCollapse" >
                            </a>


                            <span class="navbar-text "
                                id="headerName"
                                style={{
                                    float: "none",
                                    position: "absolute",
                                    color: "white",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    wordWrap: "break-word",
                                }} >
                               {this.state.companyName}
                            </span>

                            <div class=" navbar-right"
                                style={{
                                    float: "none",
                                    position: "absolute",
                                    top: "35%",
                                    left: "91%",                                 
                                    wordWrap: "break-word",
                                    color: "red",
                                    paddingRight:"10px"

                                }}>
                                <a href="#" class="btn btn-info btn-sm" onClick={() => this.LogoutFunc()}>
                                    <span  class="glyphicon glyphicon-log-out"></span> 
        </a>
              

                            </div>

                        </div>


                    </div>
                </nav>



                <div class="wrapper">

                    <nav id="sidebar" >
                        <div class="sidebar-header" style={{paddingLeft:"15px",paddingTop:"0px",paddingBottom:"0px"}}>
                            <h3>ThroughApps ERP</h3>

                        </div>


                        <ul class="list-unstyled components" style={{paddingTop:"0px"}} >
                            <span><a href="#" onClick={() => this.DashBoardDisplay()}><i class="fa fa-pie-chart" style={{border:"none",display:"inline-block",paddingLeft:"15px",fontSize:"15px",lineHeight:"25pt"}} aria-hidden="true"></i><span> DASHBOARD</span></a></span>
                            <li >
                                <a href="#MasterSubmenu" data-toggle="collapse"   aria-expanded="false"  class="dropdown-toggle"
                                ><i class="fa fa-universal-access" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> ERP Master</span></a>
                         
                                <ul class="collapse list-unstyled"  id="MasterSubmenu">
                                    <li><a onClick={() => this.CustomerEntryForm()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Add Customer</span></a></li>
                                    <li><a onClick={() => this.CustomerList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> List of Customer</span></a></li>
                                    <li><a onClick={() => this.VendorEntryForm()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Add Vendor</span></a></li>
                                    <li><a onClick={() => this.VendorList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> List of Vendor</span></a></li>
                                    <li><a onClick={() => this.AddProduct()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Add Product</span></a></li>
                                    <li><a onClick={() => this.ProductList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> List of Product</span></a></li>

                                </ul>


                                
                            </li>
                            
                          
                            <li>
                                <a href="#SaleSubmenu" data-toggle="collapse"  aria-expanded="false"
                                    class="dropdown-toggle" ><i class="fa fa-share-square-o" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Sale</span></a>
                                <ul class="collapse list-unstyled" id="SaleSubmenu">
                                    <li><a onClick={() => this.SaleOrder()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Sale Order</span></a></li>
                                    <li><a onClick={() => this.InvoiceList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Sale Invoice</span></a></li>
                                    <li><a onClick={() => this.Estimate()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Estimate</span></a></li>
                                    <li><a onClick={() => this.EstimateList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Estimate Invoice</span></a></li>

                                </ul>
                            </li>
                            <li>
                                <a href="#InvoiceSubmenu" data-toggle="collapse" aria-expanded="false"
                                    class="dropdown-toggle"><i class="fa fa-shopping-basket" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Purchase</span></a>
                                <ul class="collapse list-unstyled" id="InvoiceSubmenu">
                                    <li><a onClick={() => this.PurchaseInvoice()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Purchase Order</span></a></li>
                                    <li><a onClick={() => this.PurchaseInvoiceList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Purchase Invoice</span></a></li>

                                </ul>
                            </li>
                            <li>
                                <a href="#ExpenseSubmenu" 
                                    class="dropdown-toggle" onClick={() => this.Expense()}><i class="fa fa-money" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Expense</span></a>
                                
                            </li>
                            <li >
                                <a href="#QuotationSubmenu" data-toggle="collapse" aria-expanded="false"
                                    class="dropdown-toggle"><i class="fa fa-print"  style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Quotation</span></a>
                                <ul class="collapse list-unstyled" id="QuotationSubmenu">
                                    <li><a onClick={() => this.GSTQuotation()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> GST Quotation</span></a></li>
                                    <li><a onClick={() => this.WithoutGSTQuotation()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Without GST Quotation</span></a></li>
                                    <li><a onClick={() => this.QuotationList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> List of Quotation</span></a></li>
                                </ul>
                            </li>
                            <li class="active">
                                <a href="#StaffSubmenu" data-toggle="collapse" aria-expanded="false"
                                    class="dropdown-toggle"><i class="fa fa-users" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Employee</span></a>
                                <ul class="collapse list-unstyled" id="StaffSubmenu">
                                    <li><a onClick={() => this.AddStaff()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Add Employee</span></a></li>
                                    <li><a onClick={() => this.StaffList()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> List of Employee</span></a></li>
                                    <li><a onClick={() => this.Salary()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Salary</span></a></li>
                                    <li><a onClick={() => this.SalaryReport()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Salary Report</span></a></li>
                                </ul>
                            </li>
                            <li class="active">
                                <a href="#GSTSubmenu" data-toggle="collapse" aria-expanded="false"
                                    class="dropdown-toggle"  ><i class="fa fa-shield" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> File GST</span></a>
                                <ul class="collapse list-unstyled" id="GSTSubmenu">
                                    <li><a onClick={() => this.GST3B()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> GST 3B</span></a></li>
                                    <li><a onClick={() => this.GSTR1()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> GSTR 1</span></a></li>
                                    <li><a href="https://www.gst.gov.in/download/returns"><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> GSTR Offline Tool</span></a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#attendanceSubmenu" data-toggle="collapse"   aria-expanded="false"
                                    class="dropdown-toggle"><i class="fa fa-address-card-o" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Attendance</span></a>
                                <ul class="collapse list-unstyled" id="attendanceSubmenu">
                                    <li><a onClick={() => this.Attendance()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Attendance</span></a></li>
                                    <li><a onClick={() => this.MonthlyAttendanceReport()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Monthly</span></a></li>
                                    <li><a onClick={() => this.PeriodAttendanceReport()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Period</span></a></li>

                                </ul>
                            </li>
                            <li>
                                <a onClick={() => this.AdminAddUser()}><i class="fa fa-user-secret" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Admin</span></a>
                            </li>
                            <li>
                                <a onClick={() => this.ReportFunc()}><i class="fa fa-clipboard" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Reports</span></a>
                            </li>

                            <li>

                                <a href="#SettingsSubmenu" data-toggle="collapse" aria-expanded="false"
                                    class="dropdown-toggle"><i class="fa fa-cogs" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Configuration</span></a>
                                <ul class="collapse list-unstyled" id="SettingsSubmenu">
                                <li><a href="#" onClick={() => this.MessageFunc()} ><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Offer Messages </span></a></li>
                                    <li><a onClick={() => this.EmailFunc()}><i class="fa fa-angle-right" style={{border:"none",display:"inline-block",fontSize:"15px"}} aria-hidden="true"></i><span> Emails</span></a></li>

                                </ul>
                            </li>
                            <li>
                                <a onClick={()=>this.TaskMappingFunc()}><i class="fa fa-superpowers" style={{border:"none",display:"inline-block"}} aria-hidden="true"></i><span> Task Mapping</span></a>
                            </li>
                        </ul>


                    </nav>




                    <div id="contentRender">
                    </div>
          
                </div>


            </div>

        );
    }
}

export default Gstdashboard1;

