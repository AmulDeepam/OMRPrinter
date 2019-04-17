import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import Website from './Website';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import './gstdashboard.css';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Dashboardoverall from './Dashboardoverall';
var array = [];
var checkBoxarray = [];
class Attendance extends Component {
    constructor() {
        super();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
        this.state = {
            staffName: '',
            checkInTime: '',
            date: date,
            checkOutTime: '',
            status: '',
            companyId:companyId,
        };
        this.setState({
            date: date,
        })
    }
    componentDidMount() {

        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                $(".checkBoxClass").prop('checked', $(this).prop('checked'));
              
            });
        });
       /* if($(columns[0]).find('input').is(':checked')){
            $(".checkBoxClass").css("backgroundColor","yellow");


        }
    */
   $("input[type=checkbox]").on('change',function(){
    if($(this).prop('checked')) 
    {
        $(this).parent().parent().css('background-color', '#a52a2a');
    }
});

        var self = this;
        window.scrollTo(0, 0);

   this.AttendanceList();
       
   $(document).ready(function () {
    $( ".SelectOption" ).change(function() { 
        var currentRow = $(this).closest("tr");
        $(this).closest("tr").find("td:eq(5)").text("Changed");
        
    });
    // code to read selected table row cell data (values).
   /*  $("#tableHeadings").on('change', '.SelectOption', function () {
        // get the current row
        var currentRow = $(this).closest("tr");
        $(this).closest("tr").find("td:eq(5)").text("Changed");
        
    }); */
});    

    }

    AttendanceList(){
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.state.date,
                companyId:this.state.companyId,

            }),
            url: "http://52.66.243.218:8080/ERPDetails/attendance/StaffAttendance",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th><input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /></th><th>Id</th><th>StaffName</th><th>ContactNo</th><th>Status</th></tr></thead>';
                $.each(data.staffRetrievelist, function (i, item) {

                    console.log(data.staffRetrievelist);
                    tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td><input class="checkBoxClass" name="checkbox" id="myCheckBox" type="checkbox"  /></td><td>' + item.staffId + '</td><td>' + item.staffName + '</td><td>' + item.contactNo + '</td><td width="50%"><select id="Staff'+item.staffId+'"class=SelectOption><option value="Present">Present</option> <option value="Absent">Absent</option> <option value="Leave">Leave</option> <option value="Holiday">Holiday</option></select></td><td id="changed" class="ChangedStatus">Not Changed</td></tr></tbody>';
                   
                    $("#Staff1").val(item.status).change();
                });
               
                $("#tableHeadings").append(tab);
               $(".ChangedStatus").hide();
                $.each(data.staffRetrievelist, function (i, item) {

                   
                    $("#Staff"+item.staffId).val(item.status).change();
                });
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
    completed() {
        var rows = $('#tableHeadings tbody >tr');
        var columns;
        var attendArray=[];
        for (var i = 0; i < rows.length; i++) {
            columns = $(rows[i]).find('td');

            console.log("checked",$(columns[0]).find('input').is(':checked'));
            if($(columns[0]).find('input').is(':checked')){
                console.log("checked true");
                console.log("5th",$(columns[5]).html())
            //    $(rows[i]).css("backgroundColor","yellow");
                if($(columns[5]).html()!="Not Changed"){
                    console.log("Status Changed from Holiday  to ",$(columns[4]).find(".SelectOption").val());
                    var staffId=$(columns[1]).html();
                    var staffName=$(columns[2]).html();
                    var status=$(columns[4]).find(".SelectOption").val();
                    attendArray.push(staffId);
                    attendArray.push(staffName);
                    attendArray.push(status);
                   

                }else{
                    console.log("No change it is Holiday");
                }

            }else{
                console.log("Not Checked");
            }
               
        }
        console.log("Final array value ",attendArray);
        var self=this;
        if(attendArray.length!=0){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                attendArray:attendArray.toString(),
                date:this.state.date,
                companyId:this.state.companyId,
            }),

            url: "http://52.66.243.218:8080/ERPDetails/attendance/addattendance",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Attendance Updated Successfully.',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });

                attendArray=[];
                $("#ckbCheckAll").removeAttr("checked");
                $("#tableHeadings").empty();
                self.AttendanceList();
            },


            error: function (data) {

                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });

            }


        });
        array = [];
    }else{
        
        confirmAlert({
            title: 'No Data',                        // Title dialog
            message: 'Please Add Staff Details',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
    $(document).ready(function () {
        $(".CheckBoxClass").click(function () {
            $(".checkBoxClass").prop('checked', $(this).prop('checked'));
        });
    }); 
    $(document).ready(function () {
        $( ".SelectOption" ).change(function() { 
            var currentRow = $(this).closest("tr");
            $(this).closest("tr").find("td:eq(5)").text("Changed");
            
        });
    });  
    }

    cancelFunc() {
        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                $(".checkBoxClass").prop('checked', $(this).prop('checked'));
            });
        });

     this.state.attendArray=[];
        $("#ckbCheckAll").removeAttr("checked");
        $("#tableHeadings").empty();
        
        ReactDOM.render(<Attendance />, document.getElementById("contentRender"));
        this.AttendanceList();
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
                        <h4 style={{ fontWeight: "300",fontSize:"30px" }}>Attendance</h4>
                    </div>
                    <div>
                        <div class="card-body">

                            <div id="tableOverflow">
                                <table class="table" id="tableHeadings" style={{ marginBottom: "2%" }}>
                                </table>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button type="button" style={{fontWeight:"bold"}} onClick={() => this.completed()}  class="btn btn-primary">Submit</button> <span></span>
                                        <button type="button" style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div></div>


        );
    }

}
export default Attendance;