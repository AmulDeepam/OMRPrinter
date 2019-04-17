
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
import MonthlyAttendanceReportDisplay from './MonthlyAttendanceReportDisplay';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Dashboardoverall from './Dashboardoverall';

var i;

class MonthlyAttendanceReport extends Component {


    constructor(props) {
        super(props)
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
        this.state = {
            date: '',
            companyId:companyId,

        }

    }

componentDidMount(){
    window.scrollTo(0, 0);      
   
}
    MonthlyFunc(value) {
        var today = new Date();
        this.state.date = today.getFullYear() + '-' + value + '-' + '01';
var self=this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date:this.state.date,
                companyId:this.state.companyId,
            }),
            url: "http://52.66.243.218:8080/ERPDetails/attendance/StaffMonthlyAttendance",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={() => <MonthlyAttendanceReportDisplay data={data}  month={self.state.month} />} />


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


    }
    dropdownFunc() {
        $('#1').hide(); $('#2').hide(); $('#3').hide();
        $('#4').hide(); $('#5').hide(); $('#6').hide();
        $('#7').hide(); $('#8').hide(); $('#9').hide();
        $('#10').hide(); $('#11').hide(); $('#12').hide();
        var today = new Date();
        this.state.month = today.getMonth() + 1;
        var displaydate = today.getDate();
        this.setState({
            month: this.state.month,
        });
        for (i = 1; i <= this.state.month; i++) {
            $('#dropdown').show();
            $('#' + i).show();
        }
        this.state.i = i - 1;
        this.setState({
            i: this.state.i,
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
                <div>
                    <div style={{ backgroundColor: "" }}>
                        <h4 style={{ fontWeight: "300",fontSize:"30px" }}>Monthly Attendance</h4>
                    </div>
                    <div>

        <div class="btn-group">
      
                        <button type="button" onClick={() => this.dropdownFunc()} class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Select your Month</button>

                        <ul class="dropdown-menu" id="dropdown" style={{ paddingLeft: "37px", MarginBottom: "40%" }} role="menu">
                            <li><a href="#" id="1" onClick={(e) => this.MonthlyFunc("01")}>January</a></li>
                            <li><a href="#" id="2" onClick={(e) => this.MonthlyFunc("02")}>Feburuary</a></li>
                            <li><a href="#" id="3" onClick={(e) => this.MonthlyFunc("03")}>March </a></li>
                            <li><a href="#" id="4" onClick={(e) => this.MonthlyFunc("04")}>April </a></li>
                            <li><a href="#" id="5" onClick={(e) => this.MonthlyFunc("05")}>May</a></li>
                            <li><a href="#" id="6" onClick={(e) => this.MonthlyFunc("06")}>June</a></li>
                            <li><a href="#" id="7" onClick={(e) => this.MonthlyFunc("07")}>July</a></li>
                            <li><a href="#" id="8" onClick={(e) => this.MonthlyFunc("08")}>August</a></li>
                            <li><a href="#" id="9" onClick={(e) => this.MonthlyFunc("09")}>September</a></li>
                            <li><a href="#" id="10" onClick={(e) => this.MonthlyFunc("10")}>october</a></li>
                            <li><a href="#" id="11" onClick={(e) => this.MonthlyFunc("11")}>November</a></li>
                            <li><a href="#" id="12" onClick={(e) => this.MonthlyFunc("12")}>December</a></li>

                        </ul>
                    </div>


                </div>

            </div>
            </div >









        );
    }

}
export default MonthlyAttendanceReport;


{/* <div className                     = "container-fluid" id = "rowid" style     = {{backgroundColor:            'white'}}>
  
 
 <div className                    = "row"  id            = "menupageid"style = {{backgroundColor:            'white'}}>
 
        <div className             = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {(e)             => this.MonthlyFunc("01")}  id = "jancolstyle" className = "" >January</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("02")} id  = "febcolstyle" className = "" >Feburuary</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("03")} id  = "marcolstyle" className = "" >March</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("04")} id  = "aprcolstyle" className = "" >Aprill</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("05")} id  = "maycolstyle" className = "" >May</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("06")} id  = "juncolstyle" className = "" >June</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("07")} id  = "julcolstyle" className = "" >July</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("08")} id  = "augcolstyle" className = "" >August</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("09")} id  = "sepcolstyle" className = "" >September</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("10")} id  = "octcolstyle" className = "" >october</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("11")} id  = "novcolstyle" className = "" >November</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("12")} id  = "deccolstyle" className = "" >December</a>
                    </div>
                
                
                
                        
                        </div>
            </div>
 */}
