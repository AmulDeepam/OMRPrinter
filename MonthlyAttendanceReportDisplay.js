import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import './gstdashboard.css';
class MonthlyAttendanceReportDisplay extends Component {


  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      date: today,
      month: data.month,

    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);      
   
    if(this.state.month=='01'){
      this.state.month="January";
    }else if(this.state.month=='02'){
      this.state.month="February";
    }else if(this.state.month=='03'){
      this.state.month="March";
    }else if(this.state.month=='04'){
      this.state.month="April";
    }else if(this.state.month=='05'){
      this.state.month="May";
    }else if(this.state.month=='06'){
      this.state.month="June";
    }else if(this.state.month=='07'){
      this.state.month="July";
    }else if(this.state.month=='08'){
      this.state.month="August";
    }else if(this.state.month=='09'){
      this.state.month="September";
    }else if(this.state.month=='10'){
      this.state.month="October";
    }else if(this.state.month=='11'){
      this.state.month="November";
    }else if(this.state.month=='12'){
      this.state.month="December";
    }
    console.log("data", this.props.data);

    var Presentcount = 0;
    var Leavecount = 0;
    var Absentcount = 0;
    var staffId = null;
    var staffName;
    var totalWorkHour = "00:00:00";
    var status;
    var color;

    var tab = '<thead><tr class="headcolor"><th>Date</th><th>Id</th><th>Name</th><th>Desgination</th><th>Status</th></tr></thead>';

    if (this.props.data.staffRetrievelist.length != 0) {

      var summaryIn = '<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>#Present</th><th>#Absent</th><th>#Leave</th></tr></thead>';
      $("#summary").append(summaryIn);

      $.each(this.props.data.staffRetrievelist, function (i, item) {


        if (staffId == null) {
          staffId = item.staffId;

        }
        if (staffId == item.staffId) {
          //count block

          staffName = item.staffName;

          if (item.status == "Present") {
            Presentcount++;
            color = "#5cb85cad";
          } else if (item.status == "Absent") {
            Absentcount++;
            status = "Absent";
            color = "#ff000087";
          } else if (item.status == "Leave") {
            Leavecount++;
            color = "#e8e92ab3";

          } else {
            status = "Holiday";
            color = "#428bcab3";
          }
          tab += '<tbody id= "myTable" ><tr "background-color:' + color + ';" ><td>' + item.date + '</td><td>' + item.staffId + '</td><td>' + item.staffName + '</td><td>' + item.roleName + '</td><td>' + item.status + '</td></tr></tbody>';
        } else {

          var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + staffId + '</td><td>' + staffName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + Leavecount + '</td></tr></tbody>';

          $("#summary").append(summary);
          staffId = item.staffId;
          staffName = item.staffName;
          //initalize count to 0
          Presentcount = 0;
          Leavecount = 0;
          Absentcount = 0;

          if (item.status == "Present") {
            Presentcount++;
            color = "#5cb85cad";

          } else if (item.status == "Absent") {
            Absentcount++;
            color = "#ff000087";
          } else if (item.status == "Leave") {
            Leavecount++;
            color = "#e8e92ab3";

          } else {
            color = "#428bcab3";
          }
          tab += '<tbody id= "myTable" background-color:"red";  ><tr "background-color:' + color + ';" ><td>' + item.date + '</td><td>' + item.staffId + '</td><td>' + item.staffName + '</td><td>' + item.roleName + '</td><td>' + item.status + '</td></tr></tbody>';

        }
      });
      $("#tableHeadings").append(tab);
      var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + staffId + '</td><td>' + staffName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + Leavecount + '</td></tr></tbody>';

      $("#summary").append(summary);
    } else {
      $("#tableHeadings").append('<h3 align="center">No Data</h3>');
      $("#sum").hide();
    }
    //search button func

    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={MonthlyAttendanceReport} />

        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  render() {

    return (

      <div className="container" id="containerbody">
        <ul class="previous disabled" id="backbutton"
          style={{
            backgroundColor: "#f1b6bf",
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>

        <h3 className="centerAlign" style={{ textAlign: "center" }}>Monthly Attendance Report</h3>
        <h3 className="centerAlign" style={{ textAlign: "center" }}>{this.state.month} </h3>  
         <input style={{
          color: "black", width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
          type="text" id="myInput" placeholder="Search.." title="Type in a name" />

        <div id="tableOverflow">
          <h3 className="centerAlign" id="sum" style={{ textAlign: "center" }}>Summary</h3>


          <table class="table" id="summary" style={{ marginBottom: "2%" }}>

          </table>
        </div>

        <div id="tableOverflow">
          <h3 className="centerAlign" style={{ textAlign: "center" }}>Detailed Report List</h3>
          <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
          </table>


        </div>

      </div>

    );
  }

}

export default MonthlyAttendanceReportDisplay;
