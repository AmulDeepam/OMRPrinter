import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import './gstdashboard.css';
import { FormErrors } from './FormErrors';
import Expense from './Expense';
import AddUser from './AddUser';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import SalesDailyReport from './SalesDailyReport';
import ExpDailyReport from './ExpDailyReport';
import ExpMonthlyReport from './ExpMonthlyReport';
import ExpYearlyReport from './ExpYearlyReport';
import ExpDateWiseReport from './ExpDateWiseReport';
import SalesYearlyReport from './SalesYearlyReport';
import SalesMonthlyReport from './SalesMonthlyReport';
import SalesDateWiseReport from './SalesDateWiseReport';
import PurchaseDailyReport from './PurchaseDailyReport';
import PurchaseMonthlyReport from './PurchaseMonthlyReport';
import PurchaseYearlyReport from './PurchaseYearlyReport';
import PurchaseDateWiseReport from './PurchaseDateWiseReport';
import EstimateDailyReport from './EstimateDailyReport';
import EstimateMonthlyReport from './EstimateMonthlyReport';
import EstimateYearlyReport from './EstimateYearlyReport';
import EstimateDateWiseReport from './EstimateDateWiseReport';
import WithoutGSTQuotationReport from './WithoutGSTQuotationReport';
import GSTQuotationReport from './GSTQuotationReport';
import SalesCustomerStatement from './SalesCustomerStatement';
import EstimateCustomerStatement from './EstimateCustomerStatement';
import VendorCustomerStatement from './VendorCustomerStatement';
import Dashboardoverall from './Dashboardoverall';
import MessageCenterReport from './MessageCenterReport';
class ReportMenuPage extends Component {
    constructor(){
        super()
        this.state={
            categoryName:'',
            categoryDate:'',
            categoryDateValid:false,
            formErrors: {
                categoryName:'',                   
            },
            categoryNameValid: false,
        }
      
    }
  
componentDidMount(){
    window.scrollTo(0, 0);      
   
}
SalesDaily(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={SalesDailyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
    
}
SalesMonthly(){

        
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={SalesMonthlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

SalesYearly(){

       
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={SalesYearlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

SalesDatewise(){

         
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={SalesDateWiseReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}


ExpDaily(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={ExpDailyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
    }

ExpMonthly(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={ExpMonthlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

ExpYearly(){

    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={ExpYearlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

ExpDatewise(){

     
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={ExpDateWiseReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

PurDaily(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={PurchaseDailyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

PurMonthly(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={PurchaseMonthlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

PurYearly(){

    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={PurchaseYearlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

PurDatewise(){

    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={PurchaseDateWiseReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}
EstimateDaily(){
    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={EstimateDailyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

EstimateMonthly(){
    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={EstimateMonthlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

EstimateYearly(){
    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={EstimateYearlyReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

EstimateDatewise(){
    
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={EstimateDateWiseReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}


GSTQuotation(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={GSTQuotationReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}

WithoutGSTQuotation(){

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={WithoutGSTQuotationReport} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}

SalesCustomerStmt(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={SalesCustomerStatement} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

} 
EstimateCustomerStmt(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={EstimateCustomerStatement} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
    
}
PurVendorStmt(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={VendorCustomerStatement} />
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

  MessageCenter(){
    ReactDOM.render(
        <Router>
          <div>
          
            <Route path="/" component={MessageCenterReport} />
          
    
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
  }
    render() {
        return(
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
     <div class="row">
         <div class="col-sm-4 col-md-4 col-lg-4" >
             <div class="card" style={{boxSizing:"borderBox",backgroundColor:"white"}}>
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
                    <h3>Sales Report</h3>
     <ul>
         <li><a href="#" onClick={() => this.SalesDaily()}>Daily</a></li>
         <li><a href="#"  onClick={() => this.SalesMonthly()}>Monthly</a></li>
         <li><a href="#"  onClick={() => this.SalesYearly()}>Yearly</a></li>
         <li><a href="#"  onClick={() => this.SalesDatewise()}>Date wise</a></li>
        <li><a href="#"  onClick={() => this.SalesCustomerStmt()}>Customer Statement</a></li> 
     </ul></div></div></div></div></div></div>
     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Expense Report</h3>
     <ul>
         <li><a href="#"  onClick={() => this.ExpDaily()}>Daily</a></li>
         <li><a href="#"  onClick={() => this.ExpMonthly()}>Monthly</a></li>
         <li><a href="#"  onClick={() => this.ExpYearly()}>Yearly</a></li>
         <li><a href="#"  onClick={() => this.ExpDatewise()}>Date wise</a></li>
     </ul></div></div></div></div></div></div>

     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
                  <h3>Purchase Report</h3>
                  <ul>
         <li><a href="#"  onClick={() => this.PurDaily()}>Daily</a></li>
         <li><a href="#"  onClick={() => this.PurMonthly()}>Monthly</a></li>
         <li><a href="#"  onClick={() => this.PurYearly()}>Yearly</a></li>
         <li><a href="#"  onClick={() => this.PurDatewise()}>Date wise</a></li>
      <li><a href="#"  onClick={() => this.PurVendorStmt()}>Vendor Statement</a></li> 

     </ul></div></div></div></div></div></div>

     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Estimate Report</h3>
      <ul>
         <li><a href="#"  onClick={() => this.EstimateDaily()}>Daily</a></li>
         <li><a href="#"  onClick={() => this.EstimateMonthly()}>Monthly</a></li>
         <li><a href="#"  onClick={() => this.EstimateYearly()}>Yearly</a></li>
         <li><a href="#"  onClick={() => this.EstimateDatewise()}>Date wise</a></li>
<li><a href="#"  onClick={() => this.EstimateCustomerStmt()}>Customer Statement</a></li> 
     </ul></div></div></div></div></div></div>

     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Quotation Report</h3>
      <ul>
         <li><a href="#"  onClick={() => this.GSTQuotation()}>GST Quotation</a></li>
         <li><a href="#"  onClick={() => this.WithoutGSTQuotation()}>Without GST Quotation</a></li>
       
     </ul></div></div></div></div></div></div>


     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Message Center</h3>
      <ul>
         <li><a href="#"  onClick={() => this.MessageCenter()}>Message Center Report</a></li>
       
     </ul></div></div></div></div></div></div>
             </div>
        
            
              </div> 
                    );
    }

}
export default ReportMenuPage;