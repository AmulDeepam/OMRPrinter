// not used
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import Dashboardoverall from './Dashboardoverall';
class PeriodAttendanceReport extends Component {


  constructor(props) {
    super(props)
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
    this.state = {
      fromDate: '',
      toDate: '',
      companyId:companyId,
     
    }

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });

  }
  Submit() {
if(this.state.fromDate.trim().length>0 && this.state.toDate.trim().length>0){
  

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        fromDate:this.state.fromDate,
        toDate:this.state.toDate,
        companyId:this.state.companyId,
        
      }),
      url: "http://52.66.243.218:8080/ERPDetails/attendance/StaffPeriodAttendance",
             contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        ReactDOM.render(
          <Router>
            <div>

              <Route path="/" component={() => <PeriodAttendanceReportDisplay data={data} />} />
             
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
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Dates',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }

  }

  componentDidMount() {
    var self = this;
    window.scrollTo(0, 0);

    $('#toDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#fromDate").datepicker("option", "maxDate", dt);
        self.setState({
          toDate: date,
        });

      },
      dateFormat: 'yy/mm/dd',
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
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
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

      <div className="container" id="containerbody" >
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
     <div style={{ backgroundColor: "" }}>
                        <h4 style={{ fontWeight: "300",fontSize:"30px" }}>Period Report</h4>
                    </div>
        <div class="jumbotron" id="containerbodyjumbo" >
         
          <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
            <label htmlFor="fromDate" style={{ paddingRight: '50px' }}> From:</label>
            <input
              style={{
           
                color: "black!important"
              }}
              type="text"
              value={this.state.fromDate}
              id="fromDate" name="fromDate"
              onChange={this.handleUserInput} />

          </form>

          <form style={{ paddingRight: '50px', color: "black" }}   >
            <label
              htmlFor="toDate"
              style={{ marginRight: '70px'}}> To:</label>

            <input
              style={{
            
                color: "black!important"
              }}
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

        <table id="records_table" style={{ width: '80%' }}>

        </table>

      </div>
    );
  }

}
export default PeriodAttendanceReport;

/* <a to="/" onClick={()=>this.Submit()}>Submit</a>*/