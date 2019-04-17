import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Website from './Website';
import './gstdashboard.css';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import EstimateDateWiseReportDisplay from './EstimateDateWiseReportDisplay';
import ReportMenuPage from './ReportMenuPage';

var  currentRow;

class EstimateDateWiseReport extends Component {


    constructor() {
        super()

        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
        var year= today.getFullYear() ;
       
        this.state = {
            year: year,
            fromDate:'',
            toDate:'',
            companyId:companyId,
            companyName:companyName,
            
          };
    
    
    
    }

    componentDidMount(){

    var self = this;
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

      Submit(){

        
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
            companyId:this.state.companyId,
        }),
       url: "http://52.66.243.218:8080/ERPDetails/EstimateReport/DateWiseEstimateReport",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {
     
            ReactDOM.render(
                <Router>
                  <div>
                   {/* <Route path="/" component={EmployeeMenuHeader} /> */}
      
                    <Route path="/" component={() => <EstimateDateWiseReportDisplay data={data} />} />
      
      
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

                    <div style={{ display: "grid" }}>
                    <h2 style={{fontWeight:"300",fontSize:"30px",textAlign:"center"}}> {this.state.companyName}</h2>
           
                <h5 style={{fontWeight:"300",fontSize:"30px",textAlign:"center"}}>ESTIMATE DATEWISE REPORT</h5>
                <hr></hr>
</div>

<div class="jumbotron" id="containerbodyjumbo" >

<form style={{ paddingBottom: '50px', position: 'inline-block' }}>
            <label htmlFor="fromDate" style={{ paddingRight: '50px' }}> From:</label>
            <input
              style={{ width: '42%' }}
              type="text"
              value={this.state.fromDate}
              id="fromDate" name="fromDate"
              onChange={this.handleUserInput} />

          </form>

          <form style={{ paddingRight: '50px' }}   >
            <label
              htmlFor="toDate"
              style={{ marginRight: '70px' }}> To:</label>

            <input
              style={{ width: '50%' }}
              type="text"
              value={this.state.toDate}
              id="toDate" name="toDate"
              onChange={this.handleUserInput} />

          </form>


</div>

        <button
          type="button"
          onClick={() => this.Submit()}
          className="btn btn-primary"
          style={{
            marginLeft: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "60px",

            display: "block"
          }}>Submit</button>





    </div>

);
}
}

export default EstimateDateWiseReport;