import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
import EmailPage from './EmailPage';
import EmployeeMenuPage from './EmployeeMenuPage';
import PayRollConfigPage from './PayRollConfigPage';
import SalaryCalcConfig from './SalaryCalcConfig';
import ViewPayroll from './ViewPayroll';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import SelectSearch from 'react-select';
import './GeneratePaySlip.css';
import AdvanceReport from './AdvanceReport';


var currentRow;
var id;
var additionList=[];
var reductionList=[];
var allowenceColumnNo=0;
var reductionColumnNo=0;
var empDetails=[];
var additionCategoryName=[];
var reductionCategoryName=[];
var oldworkingdays;
var oldpresentdays;
var oldabsentdays;
var empUpdateDetails=[];
var oldallowenceAmount;
var oldreductionAmount;
var olddebitAmount;
var oldpresentagainstholidaySalary;

class GenerateMonthlyPaySlip extends Component {

 constructor() {
 super()
 
 this.state = {
 salarySelection:'',
 workingDays:'',
 days:'',
 month:'',
 };
}

componentDidMount() {

 console.log("SALARY SELECTION OPTION : " ,"DAYS PER MONTH ");

 this.GetAdditionalDetails();
 this.DaysCalculation();
 this.GetEmpDetails()
 
 var self=this;
 
 $("#salaryTable").on('click', '.advance', function () {
 
 
 currentRow = $(this).closest("tr");
 
 id = $(this).closest('td').parent()[0].sectionRowIndex;
 
 var empDetails=currentRow.find("input[name=employeeid]").val();
 empDetails=empDetails.split(" ");
 self.state.employeeId=empDetails[0];
 self.state.name=empDetails[1];
 self.state.role=empDetails[2];
 self.state.department=empDetails[3];
 self.state.grantedAdvance=currentRow.find("input[name=grantedAdvance]").val(); 
 self.state.advance=currentRow.find("input[name=advance]").val(); 


 /* self.state.employeeId=currentRow.find("input[name=employeeid]").val();
 self.state.name=currentRow.find("input[name=name]").val(); // get current row 1st TD value
 self.state.role=currentRow.find("input[name=role]").val(); 
 self.state.department=currentRow.find("input[name=department]").val(); 
 self.state.grantedAdvance=currentRow.find("input[name=grantedAdvance]").val(); 
 self.state.advance=currentRow.find("input[name=advance]").val(); 
 */
 
 self.setState({
 employeeId:self.state.employeeId,
 name:self.state.name,
 role:self.state.role,
 department:self.state.department,
 grantedAdvance:self.state.grantedAdvance,
 advance:self.state.advance
 
 })
 
 });
 
 
 $("#salaryTable").on('click', '.update', function () {
 
 $(this).closest("tr").find("input[name=status]").empty()
 $(this).closest("tr").find("input[name=status]").val("changed");
 
 
 $(this).closest("tr").find("#present").attr("readonly",false);
 $(this).closest("tr").find("#absent").attr("readonly",false);
 $(this).closest("tr").find("#basicsalary").attr("readonly",false);
 $(this).closest("tr").find(".allowences").attr("readonly",false);
 $(this).closest("tr").find(".reduction").attr("readonly",false);
 $(this).closest("tr").find("#presentagainstholidaySalary").attr("readonly",false);
 

 
 
 });
 
 
 /*
 **********THIS FUNCTION IMPLEMENTS CHANGING OF BASIC SALARY
 */
 $("input[name=basicsalary]").change(function(){
 
 alert("TEXT BOX VALUE "+this.value);
 
 var basicpay=this.value;
 var workingdays;
 var advancedebit;

 workingdays=$(this).closest("tr").find("input[name=workingdays]").val();
 advancedebit=$(this).closest("tr").find("input[name=advancedebit]").val();

 var presentdays=$(this).closest("tr").find("input[name=present]").val();
 var holidaydays=$(this).closest("tr").find("input[name=holidaydays]").val();
 
 var netsalarydata;
 var allowencesAmt = 0;
 var reductionAmt=0;

 $(this).closest("tr").find("input[name=allowences]").each(function () { 

 alert("SINGLE ENTRY :"+this.value);
 
 allowencesAmt = Number(allowencesAmt)+Number(this.value);

 })
alert("ALLOWEWNCES AMOUNT " +allowencesAmt);


$(this).closest("tr").find("input[name=reduction]").each(function () { 

 alert("SINGLE ENTRY :"+this.value);
 
 reductionAmt = Number(reductionAmt)+Number(this.value);

 })
alert("REDUCTION AMOUNT " +reductionAmt);

var presentagainstholidaysalary=$(this).closest("tr").find("input[name=presentagainstholidaySalary]").val();
 
 netsalarydata=( Number(basicpay) / Number(workingdays) ) * ( Number(presentdays) + Number(holidaydays) );
 
 netsalarydata = Number(netsalarydata) + Number(allowencesAmt) - Number(reductionAmt) - Number(advancedebit) + Number(presentagainstholidaysalary);

 $(this).closest("tr").find("input[name=netsalary]").empty();
 $(this).closest("tr").find("input[name=netsalary]").val(netsalarydata.toFixed(2));
 
 
 
 })
 
 /*
 ****************FUNCTION FOR GETTING OLD VALUE OF THE ALLOWENCES TEXT BOX
 */
 $("#salaryTable").on('click', '#allowences', function () {
 alert("TEXT BOX VALUE "+this.value);
 
 oldallowenceAmount=this.value;
 
 
 })
 
 
 /*
 **********THIS FUNCTION IMPLEMENTS THE WAY TO GET
 **********ROW INDEX ON CLICKING THE INPUT BOX OF ALLOWENCES LIST
 */
 
 $("#salaryTable").on('change', '#allowences', function () {
 alert("TEXT BOX VALUE "+this.value);
 
 //currentRow = $(this).closest("tr");
 //var id = $(this).closest('td').parent()[0].sectionRowIndex;
 var columnId=$(this).closest("td").index();
 var allowences=this.value;

 var diffAmount=Number(oldallowenceAmount) - Number(allowences) ;
 
 alert("old amount" +oldallowenceAmount);
 alert(" amount" +allowences);
 alert(" diff amount" +diffAmount);
 //$(this).closest("tr").find("input[name=basicsalary]").val();
 
 var basicpay = $(this).closest("tr").find("input[name=basicsalary]").val();
 var netpay = $(this).closest("tr").find("input[name=netsalary]").val();
 
 if(basicpay!=0){
 var netsalarydata=Number(netpay)-parseInt(diffAmount);

 /* if(netpay==0){
 var netsalarydata=Number(netpay)+Number(basicpay)-Number(diffAmount);
 }else{
 var netsalarydata=Number(netpay)-Number(allowences);
 }
 */
 $(this).closest("tr").find("input[name=netsalary]").empty();
 $(this).closest("tr").find("input[name=netsalary]").val(netsalarydata.toFixed(2));
 
 }else{
 $(this).closest("tr").find("input[name=allowences]").val("0");
 confirmAlert({
 title: 'Error', // Title dialog
 message: 'Basic Pay Not Mentioned', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 });
 
 
 }
 console.log("basic pay : "+basicpay +" "+
 " net pay : "+netpay +" " +
 " net salary : "+netsalarydata);
 
 
 })
 
 /*
 ****************FUNCTION FOR GETTING OLD VALUE OF THE REDUCTION TEXT BOX
 */
 $("#salaryTable").on('click', '#reduction', function () {
 alert("TEXT BOX VALUE "+this.value);
 
 oldreductionAmount=this.value;
 
 })
 
 
 /*
 **********THIS FUNCTION IMPLEMENTS THE WAY TO GET
 **********ROW INDEX ON CLICKING THE INPUT BOX OF REDUCTION LIST
 */
 $("#salaryTable").on('change', '#reduction', function () {
 alert("TEXT BOX VALUE "+this.value);
 
 var columnId=$(this).closest("td").index();
 alert("COLUMN ID :"+columnId);
 
 alert("TEXT BOX VALUE "+this.value);
 
 //currentRow = $(this).closest("tr");
 //var id = $(this).closest('td').parent()[0].sectionRowIndex;
 var reduction=this.value;
 var diffAmount=Number(oldreductionAmount) - Number(reduction) ;

 var basicpay = $(this).closest("tr").find("input[name=basicsalary]").val();
 var netpay = $(this).closest("tr").find("input[name=netsalary]").val();
 
 if(basicpay!=0){
 
 var netsalarydata=Number(netpay)+parseInt(diffAmount);
 /* if(netpay==0){
 var netsalarydata=Number(netpay)+Number(basicpay)+Number(diffAmount);
 }else{
 var netsalarydata=Number(netpay)+Number(diffAmount);
 }
 */
 $(this).closest("tr").find("input[name=netsalary]").empty();
 $(this).closest("tr").find("input[name=netsalary]").val(netsalarydata.toFixed(2));
 
 }else{
 $(this).closest("tr").find("input[name=reduction]").val("0");
 confirmAlert({
 title: 'Error', // Title dialog
 message: 'Basic Pay Not Mentioned', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 });
 }
 
 console.log("basic pay : "+basicpay +" "+
 " net pay : "+netpay +" " +
 " net salary : "+netsalarydata);
 
 
 })
 
 
 var self=this;
 
 /*
****************FUNCTION FOR GETTING OLD VALUE OF THE ADVANCE DEBIT TEXT BOX
*/
$("#salaryTable").on('click', '#advancedebit', function () {
 alert("TEXT BOX VALUE "+this.value);

olddebitAmount=this.value;


})


/*
**********THIS FUNCTION IMPLEMENTS THE WAY TO GET
**********ROW INDEX ON CLICKING THE INPUT BOX OF ADVANCE DEBIT LIST
*/
 $("#salaryTable").on('change', '#advancedebit', function () {
 alert("TEXT BOX VALUE "+this.value);

 var columnId=$(this).closest("td").index();
 alert("COLUMN ID :"+columnId);

 alert("TEXT BOX VALUE "+this.value);
 
 //currentRow = $(this).closest("tr");
 //var id = $(this).closest('td').parent()[0].sectionRowIndex;
 var debit=this.value;
 var diffAmount=Number(olddebitAmount) - parseInt(debit) ;
 var basicpay = $(this).closest("tr").find("#basicsalary").val();
 var netpay = $(this).closest("tr").find("#netsalary").val();
var grantedadvance = $(this).closest("tr").find("#grantedAdvance").val();

 if(basicpay!=0){

 var netsalarydata=Number(netpay)+parseInt(diffAmount);
 
 var chagedgrantedAdvanceamt=Number(grantedadvance) + parseInt(diffAmount);
 /* if(netpay==0){
 var netsalarydata=Number(netpay)+Number(basicpay)+Number(diffAmount);
 }else{
 var netsalarydata=Number(netpay)+Number(diffAmount);
 }
*/
 $(this).closest("tr").find("input[name=netsalary]").empty();
 $(this).closest("tr").find("input[name=netsalary]").val(netsalarydata);
 $(this).closest("tr").find("#grantedAdvance").empty();
 $(this).closest("tr").find("#grantedAdvance").val(chagedgrantedAdvanceamt);

 }else{
 $(this).closest("tr").find("input[name=advancedebit]").val("0");
 confirmAlert({
 title: 'Error', // Title dialog
 message: 'Basic Pay Not Mentioned', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 });
 }

 console.log("basic pay : "+basicpay +" "+
 " net pay : "+netpay +" " +
 " net salary : "+netsalarydata);
 

 })

 /*
 *FUNCTION FOR GETTING OLD P/H SALARY
 */
 $("#salaryTable").on('click', '#presentagainstholidaySalary', function () {
 alert("TEXT BOX VALUE "+this.value);

oldpresentagainstholidaySalary=this.value;

})

/*
**********THIS FUNCTION IMPLEMENTS THE WAY TO GET
**********ROW INDEX ON CLICKING THE INPUT BOX OF P/H SALARY
*/

/*presentagainstholidaySalary
 presentagainstholiday
*/

$("#salaryTable").on('change', '#presentagainstholidaySalary', function () {
alert("TEXT BOX VALUE "+this.value);

var columnId=$(this).closest("td").index();
alert("COLUMN ID :"+columnId);

alert("TEXT BOX VALUE "+this.value);

//currentRow = $(this).closest("tr");
//var id = $(this).closest('td').parent()[0].sectionRowIndex;
var presentagainstholidaySalary=this.value;
var diffAmount=Number(oldpresentagainstholidaySalary) - Number(presentagainstholidaySalary) ;
var basicpay = $(this).closest("tr").find("#basicsalary").val();
var netpay = $(this).closest("tr").find("#netsalary").val();
var days=$(this).closest("tr").find("#presentagainstholiday").val();

if(days!=0){
if(basicpay!=0){

var netsalarydata=Number(netpay)-parseInt(diffAmount);

/* if(netpay==0){
var netsalarydata=Number(netpay)+Number(basicpay)+Number(diffAmount);
}else{
var netsalarydata=Number(netpay)+Number(diffAmount);
}
*/
$(this).closest("tr").find("input[name=netsalary]").empty();
$(this).closest("tr").find("input[name=netsalary]").val(netsalarydata);

}else{
$(this).closest("tr").find("input[name=presentagainstholidaySalary]").val("0");
confirmAlert({
 title: 'Error', // Title dialog
 message: 'Basic Pay Not Mentioned', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
});
}
//days if loop closing
}else{
$(this).closest("tr").find("input[name=presentagainstholidaySalary]").val("0");
confirmAlert({
 title: 'Error', // Title dialog
 message: 'Salary Cannot Be Added. Since P/H Days are Empty', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
});
}

console.log("basic pay : "+basicpay +" "+
" net pay : "+netpay +" " +
" net salary : "+netsalarydata);


})



 }
 
 
 GetAdditionalDetails(){
 

 additionList=[];
 additionCategoryName=[];
 reductionList=[];
 reductionCategoryName=[];

 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
 this.state.companyId = companyId;
 this.setState({
 companyId: companyId,
 });
 var self = this;
 $.ajax({
 type: 'POST',
 data: JSON.stringify({
 
 schoolId: this.state.companyId,
 
 }),
 //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeList",
 url: "http://localhost:8080/EmployeeAttendenceAPI/payroll/AdditionalDetails",
 //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/payroll/AdditionalDetails",
 
 
 contentType: "application/json",
 dataType: 'json',
 async: false,
 crossDomain: true,
 
 success: function (data, textStatus, jqXHR) {
 
 console.log(
 "ADDITION LIST"+ data.additionAllowencesList[0].catagoryName+
 "REDUCTION LIST"+data.reductionAllowencesList[0].catagoryName+
 "SALARY OPTION"+data.salarySelection);
 // var tab =<tr id="allowences" ></tr>
 self.state.salarySelection=data.salarySelection;
 
 var tab="";
 $.each(data.additionAllowencesList, function (i, item) {
 
 tab+='<th class=" verticalTableHeader " style="color:green" >'+item.catagoryName+'</th>';
 additionList.push(item);
 additionCategoryName.push(item.catagoryName);
 Number(allowenceColumnNo)+Number(i);
 });
 
 $("#tablerowdata").append(tab);
 
 var tab="";
 $.each(data.reductionAllowencesList, function (i, item) {
 
 tab+='<th class="verticalTableHeader" style="color:red" >'+item.catagoryName+'</th>';
 reductionList.push(item);
 reductionCategoryName.push(item.catagoryName);
 Number(reductionColumnNo)+Number(i);
 });
 $("#tablerowdata").append(tab);
 
 /*
 var tab="";
 tab='<th class="verticalTableHeader" >Net_Salary</th>'
 
 $("#tablerowdata").append(tab);
 */
 
 },
 error: function () {
 confirmAlert({
 title: 'No Internet', // Title dialog
 message: 'Network Connection Problem', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 });
 
 
 },
 });
 
 }
 
 
 DaysCalculation(){
 
 var today = new Date();
 var mnth=today.getMonth();
 var year= today.getFullYear();
 
 if(mnth==0){
 mnth=12;
 year=today.getFullYear() - 1;
 }
 
 alert("MONTH"+mnth);
 this.state.month=mnth;
 
 this.setState({
 month:this.state.month
 })
 if (mnth == ("01") || mnth == ("03") || mnth == ("05") || mnth == ("07") || mnth == ("08") || mnth == ("10") || mnth == ("12")) {
 
 this.state.fromDate = year+ '-' + mnth + '-' + '01';
 this.state.toDate = year + '-' + mnth + '-' + '31';
 alert("date is"+"FROM DATE "+ this.state.fromDate+ "TODATE "+ this.state.toDate);
 
 }
 else if (mnth == ("04") || mnth == ("06") || mnth == ("09") || mnth == ("11")) {
 
 this.state.fromDate =year + '-' + mnth + '-' + '01';
 this.state.toDate = year + '-' + mnth + '-' + '30';
 
 
 } else if (mnth == ("02")) {
 if (year % 100 == 0 && year % 400 == 0 && year % 4 == 0) {
 
 this.state.fromDate = year + '-' + mnth + '-' + '01';
 this.state.toDate = year + '-' + mnth + '-' + '29';
 
 }
 else {
 this.state.fromDate = year + '-' + mnth + '-' + '01';
 this.state.toDate = year + '-' + mnth + '-' + '28';
 
 }
 
 }
 this.setState({
 fromDate: this.state.fromDate,
 toDate: this.state.toDate,
 });
 
 // if (this.state.salarySelection == "daysperMonth") {
 //alert("daysperMonth option");
 
 var date1 = new Date(this.state.fromDate);
 var date2 = new Date(this.state.toDate);
 var timeDiff = Math.abs(date2.getTime() - date1.getTime());
 var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
 diffDays= Number(diffDays)+1;
 this.state.days = diffDays;
 
 this.setState({
 days: this.state.days
 })
 
 
 // }
 
 }
 
 
 GetEmpDetails() {
 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
 this.state.companyId = companyId;
 this.setState({
 companyId: companyId,
 });
 var self = this;
 
 console.log("GET EMP DETAILS AJAX CALL DATA" +JSON.stringify({
 schoolId: this.state.companyId,
 fromDate:this.state.fromDate,
 toDate:this.state.toDate
 
 }));
 var self=this;
 $.ajax({
 type: 'POST',
 data: JSON.stringify({
 schoolId: this.state.companyId,
 fromDate:this.state.fromDate,
 toDate:this.state.toDate,
 salarySelection:this.state.salarySelection
 }),
 //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeList",
 url: "http://localhost:8080/EmployeeAttendenceAPI/payroll/EmployeeDetails",
 // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/SelectAllEmployee",
 
 
 contentType: "application/json",
 dataType: 'json',
 async: false,
 crossDomain: true,
 
 success: function (data, textStatus, jqXHR) {
 
 var tab;
 
 $.each(data, function (i, item) {
 
 var Absent_Days=Number(self.state.days) -(Number(item.present)+Number(item.holidayDays));
 
 var basicpay=item.basicPay;
 var netsalary=item.netSalary;
 var advancedebit=item.advanceDebit;
 var presentagainstholiday=item.presentAgainstHoliday;
 var presentagainstholidaySalary=item.presentagainstholidaySalary;
 var salary;
 if(basicpay==null){
 basicpay=0;
 }else{
 var basicpay=item.basicPay;
 var present=item.present;
 var holiday=item.holidayDays;
 
 salary= ( Number(basicpay) / Number(self.state.days) ) * (Number(present) + Number(holiday));
 
 }
 if(netsalary==null){
 netsalary=0;
 }else{
 netsalary=salary;
 }
 if(advancedebit==null){
 advancedebit=0;
 }
 
 if(item.salaryMonth!=self.state.month){
 
 var empBasicData=item.employeeId +" "+(item.name).replace(/\s/g,'')+" "+(item.role).replace(/\s/g,'')+" "+(item.department).replace(/\s/g,'') ;



 tab +='<tr class="trdata" style={{ marginTop: "200px", textAlign: "center" }} ><td><input type="text" name="employeeid" id="employeeid" class="employeeid" '
 +'value="'+empBasicData+'" style=" width:auto; line-height: 1em;height: 3em;overflow: hidden; " readonly></input></td>'
 
 /* +'<td><input type="text" name="salarymonth" id="salarymonth" class="salarymonth" '
 +'value="'+item.salaryMonth+'" ></input></td>'
 
 +'<td><input type="text" name="status" id="status" class="status" '
 +'value="nochange" readonly></input></td>'
 
 +'<td><input type="text" name="name" id="name" class="name" '
 +'value="'+item.name+'" readonly></input></td>'
 
 +'<td><input type="text" name="role" id="role" class="role" '
 +'value="'+item.role+'" readonly></input></td>'
 
 +'<td><input type="text" name="department" id="department" class="department" '
 +'value="'+item.department+'" readonly></input></td>'
 */
 +'<td><input type="text" name="grantedAdvance" id="grantedAdvance" class="grantedAdvance" '
 +'value="'+item.grantedAdvance+'" readonly></input></td>'
 
 +'<td><input type="text" name="advance" id="advance" class="advance" data-toggle="modal" '
 +'data-target="#myModalview" value="'+0+'" ></input></td>'
 
 
 +'<td><input type="text" name="workingdays" id="workingdays" class="workingdays" '
 +'value="'+self.state.days+'" readonly></input></td>'
 
 +'<td><input type="text" name="present" id="present" class="present" '
 +'value="'+item.present+'" readonly></input></td>'
 
 +'<td><input type="text" name="presentagainstholiday" id="presentagainstholiday" class="presentagainstholiday" '
 +'value="'+presentagainstholiday+'" readonly></input></td>'
 
 +'<td><input type="text" name="absent" id="absent" class="absent" '
 +'value="'+Absent_Days+'" readonly></input></td>'
 
 +'<td><input type="text" name="holidaydays" id="holidaydays" class="holidaydays" '
 +'value="'+item.holidayDays+'" readonly ></input></td>'
 
 +'<td><input type="text" name="basicsalary" id="basicsalary" class="basicsalary" '
 +'value="'+basicpay+'" ></input></td>'
 
 
 +'<td><input type="text" name="netsalary" id="netsalary" class="netsalary" '
 +'value="'+netsalary+'" readonly></input></td>' 
 
 +'<td><input type="text" name="advancedebit" id="advancedebit" class="advancedebir" '
 +'value="'+advancedebit+'" ></input></td>' 
 
 +'<td><input type="text" name="presentagainstholidaySalary" id="presentagainstholidaySalary" class="presentagainstholidaySalary" '
 +'value="'+0+'" ></input></td>' 

 +'<td><select id="paymentmode" name="paymentmode" class ="paymentmode" style="width:auto;">'
 +'<option value="" disabled selected hidden>Sal Mode</option>'
 +'<option>Cash</option>'
 +'<option>Cheque</option></select></td>'

 if(item.additionAmount!=null){
 var additionAmount1=(item.additionAmount).split(",");
 
 $.each(additionList, function (i, item) {
 
 var netsalary= $(this).closest("tr").find("input[name=netsalary]").val();
 
 if(additionAmount1[i]<=additionList.length){
 
 tab +='<td><input type="text" name="allowences" id="allowences" class="allowences" '
 +'value="'+additionAmount1[i]+'" readonly></input></td>'
 
 var netsaldata=Number(netsalary) + Number(additionAmount1[i]);
 $(this).closest("tr").find("input[name=netsalary]").empty();
 $(this).closest("tr").find("input[name=netsalary]").val(netsaldata);
 
 }else{
 tab +='<td><input type="text" name="allowences" id="allowences" class="allowences" '
 +'value="'+0+'" readonly></input></td>'
 } 
 
 });
 }else{
 var additionAmount=0;
 $.each(additionList, function (i, item) {
 
 console.log("ADDIITON LIST"+item.catagoryName);
 
 tab +='<td><input type="text" name="allowences" id="allowences" class="allowences" '
 +'value="'+additionAmount+'" ></input></td>'
 
 
 });
 }
 
 
 
 if(item.reductionAmount!=null){
 alert("reduction not null");
 var reductionAmount=(item.reductionAmount).split(",");
 
 $.each(reductionList, function (i, item) {
 
 var netsalary= $(this).closest("tr").find("input[name=netsalary]").val();
 
 if(reductionAmount[i]<=reductionList.length){
 
 tab +='<td><input type="text" name="reduction" id="reduction" class="reduction" '
 +'value="'+reductionAmount[i]+'" readonly></input></td>'

 var netsaldata=Number(netsalary) - Number(reductionAmount[i]);
 $(this).closest("tr").find("input[name=netsalary]").empty();
 $(this).closest("tr").find("input[name=netsalary]").val(netsaldata);
 

 }else{
 tab +='<td><input type="text" name="reduction" id="reduction" class="reduction" '
 +'value="'+0+'" readonly></input></td>'
 }
 
 });
 }else{
 var reductionAmount=0;
 $.each(reductionList, function (i, item) {
 
 console.log("REDUCTION LIST"+item.catagoryName);
 tab +='<td><input type="text" name="reduction" id="reduction" class="reduction" '
 +'value="'+reductionAmount+'" ></input></td>'
 
 
 });
 }
 
 
 alert("salary month"+item.salaryMonth);
 tab +='<td><input type="text" name="salarymonth" id="salarymonth" class="salarymonth" '
 +'value="'+item.salaryMonth+'" ></input></td>'
 
 tab +='<td><input type="text" name="status" id="status" class="status" '
 +'value="nochange" readonly></input></td>'
 
 }else{
 
 
 var empBasicData=item.employeeId +" "+(item.name).replace(/\s/g,'')+" "+(item.role).replace(/\s/g,'')+" "+(item.department).replace(/\s/g,'') ;



 tab +='<tr class="trdata" style={{ marginTop: "200px", textAlign: "center" }} ><td><input type="text" name="employeeid" id="employeeid" class="employeeid" '
 +'value="'+empBasicData+'" style=" width:auto; line-height: 1em;height: 3em;overflow: hidden; " readonly></input></td>'
 
 /* +'<td><input type="text" name="salarymonth" id="salarymonth" class="salarymonth" '
 +'value="'+item.salaryMonth+'" ></input></td>'
 
 +'<td><input type="text" name="status" id="status" class="status" '
 +'value="nochange" readonly></input></td>'
 
 +'<td><input type="text" name="name" id="name" class="name" '
 +'value="'+item.name+'" readonly></input></td>'
 
 +'<td><input type="text" name="role" id="role" class="role" '
 +'value="'+item.role+'" readonly></input></td>'
 
 +'<td><input type="text" name="department" id="department" class="department" '
 +'value="'+item.department+'" readonly></input></td>'
 */
 +'<td><input type="text" name="grantedAdvance" id="grantedAdvance" class="grantedAdvance" '
 +'value="'+item.grantedAdvance+'" readonly></input></td>'
 
 +'<td><input type="text" name="advance" id="advance" class="advance" data-toggle="modal" '
 +'data-target="#myModalview" value="'+0+'" ></input></td>'
 
 
 +'<td><input type="text" name="workingdays" id="workingdays" class="workingdays" '
 +'value="'+self.state.days+'" readonly></input></td>'
 
 +'<td><input type="text" name="present" id="present" class="present" '
 +'value="'+item.present+'" readonly></input></td>'
 
 +'<td><input type="text" name="presentagainstholiday" id="presentagainstholiday" class="presentagainstholiday" '
 +'value="'+presentagainstholiday+'" readonly></input></td>'
 
 +'<td><input type="text" name="absent" id="absent" class="absent" '
 +'value="'+Absent_Days+'" readonly></input></td>'
 
 +'<td><input type="text" name="holidaydays" id="holidaydays" class="holidaydays" '
 +'value="'+item.holidayDays+'" readonly ></input></td>'
 
 +'<td><input type="text" name="basicsalary" id="basicsalary" class="basicsalary" '
 +'value="'+basicpay+'" readonly></input></td>'
 
 
 +'<td><input type="text" name="netsalary" id="netsalary" class="netsalary" '
 +'value="'+netsalary+'" readonly></input></td>' 
 
 +'<td><input type="text" name="advancedebit" id="advancedebit" class="advancedebir" '
 +'value="'+advancedebit+'" readonly></input></td>' 
 
 +'<td><input type="text" name="presentagainstholidaySalary" id="presentagainstholidaySalary" class="presentagainstholidaySalary" '
 +'value="'+0+'" ></input></td>' 

 +'<td><select id="paymentmode" name="paymentmode" class ="paymentmode" style="width:auto;">'
 +'<option value="" disabled selected hidden>Sal Mode</option>'
 +'<option>Cash</option>'
 +'<option>Cheque</option></select></td>'

 if(item.additionAmount!=null){
 var additionAmount1=(item.additionAmount).split(",");
 
 $.each(additionList, function (i, item) {
 
 console.log("ADDIITON LIST IN NOT NULL"+item.catagoryName);
 tab +='<td><input type="text" name="allowences" id="allowences" class="allowences" '
 +'value="'+additionAmount1[i]+'" readonly></input></td>'
 
 });
 }else{
 var additionAmount=0;
 $.each(additionList, function (i, item) {
 
 if(additionAmount1[i]<=additionList.length){
 
 tab +='<td><input type="text" name="allowences" id="allowences" class="allowences" '
 +'value="'+additionAmount1[i]+'" readonly></input></td>'
 
 
 }else{
 tab +='<td><input type="text" name="allowences" id="allowences" class="allowences" '
 +'value="'+0+'" readonly></input></td>'
 } 
 
 });
 }
 
 
 
 if(item.reductionAmount!=null){
 alert("reduction not null");
 var reductionAmount=(item.reductionAmount).split(",");
 
 $.each(reductionList, function (i, item) {

 
 if(reductionAmount[i]<=reductionList.length){
 
 tab +='<td><input type="text" name="reduction" id="reduction" class="reduction" '
 +'value="'+reductionAmount[i]+'" readonly></input></td>'

 
 }else{
 tab +='<td><input type="text" name="reduction" id="reduction" class="reduction" '
 +'value="'+0+'" readonly></input></td>'
 } 
 
 });
 }else{
 var reductionAmount=0;
 $.each(reductionList, function (i, item) {
 
 console.log("REDUCTION LIST"+item.catagoryName);
 tab +='<td><input type="text" name="reduction" id="reduction" class="reduction" '
 +'value="'+reductionAmount+'" readonly></input></td>'
 
 
 });
 }
 
 
 alert("salary month"+item.salaryMonth);
 tab +='<td><input type="text" name="salarymonth" id="salarymonth" class="salarymonth" '
 +'value="'+item.salaryMonth+'" readonly></input></td>'
 
 tab +='<td><input type="text" name="status" id="status" class="status" '
 +'value="nochange" readonly></input></td>'
 
 tab +='<td><button id="update" class="update" data-toggle="modal" data-target="#myModalUpdate">Update</button>'
 +'</td>'
 
 
 }
 });
 
 
 
 
 +'</tr>' 
 $("#salaryTable").append(tab);
 $(".salarymonth").hide();
 $(".status").hide();
 }
 });
 }
 
 GrantAdvance(){
 
 var today = new Date();
 var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
 this.state.date=date;
 
 this.setState({
 date:this.state.date
 })
 
 console.log("DATA"+ JSON.stringify({
 schoolId: this.state.companyId,
 employeeId:this.state.employeeId,
 name:this.state.name,
 role:this.state.role,
 department:this.state.department,
 grantedAdvance:this.state.grantedAdvance,
 advance:this.state.advance,
 date:this.state.date
 }));
 
 
 var self=this;
 
 $.ajax({
 type: 'POST',
 data: JSON.stringify({
 schoolId:this.state.companyId,
 employeeId:this.state.employeeId,
 name:this.state.name,
 role:this.state.role,
 department:this.state.department,
 grantedAdvance:this.state.grantedAdvance,
 advance:this.state.advance,
 date:this.state.date
 
 }),
 //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeList",
 url: "http://localhost:8080/EmployeeAttendenceAPI/payroll/GrantAdvance",
 // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/SelectAllEmployee",
 
 
 contentType: "application/json",
 dataType: 'json',
 async: false,
 crossDomain: true,
 
 success: function (data, textStatus, jqXHR) {
 
 currentRow.find("input[name=advance]").val(self.state.advance);
 // $("#salaryTable.rows.item(i).cells[5] ").find('input').val("DONE")
 var grantedadvance=Number(self.state.grantedAdvance)+Number(self.state.advance);
 currentRow.find("input[name=grantedAdvance]").empty();
 currentRow.find("input[name=grantedAdvance]").val(grantedadvance);
 
 }
 
 });
 
 
 
 }
 
 handleUserInput = (e) => {
 const name = e.target.name;
 const value = e.target.value;
 this.setState({
 [name]: value,
 
 });
 } 
 
 Submit(){
 
 empDetails=[];
 empUpdateDetails=[];
 
 var self=this;
 var today = new Date();
 var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
 this.state.date=date;
 this.setState({
 date:this.state.date
 })
 var arrayLength=15+Number(additionList.length)+Number(reductionList.length)
 alert("total data" +arrayLength);
 
 var count=1;
 var updatecount=1;
 var tableData;
 $('.trdata').find("input").each(function () { 
 
 
 var salarymonthData= $(this).closest("tr").find("input[name=salarymonth]").val();
 var paymentmode=$(this).closest("tr").find("select[name=paymentmode]").val();

alert("CURRENT MONTH " +self.state.month);

 if(salarymonthData!=self.state.month){

 alert("SALARY MONTH NOT MATCHED");
 var cid = $(this).attr('id');
 var netsalaryData= $(this).closest("tr").find("input[name=netsalary]").val();
 var basicpayData= $(this).closest("tr").find("input[name=basicsalary]").val();
//alert("NET SALARY DATA" +netsalaryData);

if(basicpayData !=0){

 if(paymentmode==null){
 empDetails=[];
 empUpdateDetails=[];
 }else{
 if(empDetails.length==0){
 alert("COUNT " +count);
 alert("DATA " +this.value);
 // tableData=(this.value).replace(/\s/g,'');
 var data=(this.value).split(" ");
 console.log("DATA LENGTH" ,data.length);
 for(var i=0;i<data.length;i++){
 tableData=data[i];
 if(i==0){
 if(tableData==""){
 tableData=0;
 }
 empDetails.push(tableData);
 empDetails.push(paymentmode);
 }else{
 empDetails.push(tableData);
 }
 }
 // empDetails.push(tableData);
 //empDetails.push(paymentmode);
 count++;
 // alert("count value if array is empty : "+count);
 }else{
 
 
 if(count<=arrayLength){
 alert("COUNT " +count);
 alert("DATA " +this.value);
 tableData=(this.value).replace(/\s/g,'');
 if(tableData==""){
 tableData=0;
 }
 if(cid!="salarymonth" && cid!=="status"){
 empDetails.push(tableData);
 }
 count++;

 }else{
 count=1;
 alert("COUNT " +count);
 alert("DATA " +this.value);
 // tableData="Z"+(this.value).replace(/\s/g,'');
 var data=(this.value).split(" ");
console.log("DATA LENGTH" ,data.length);

 for(var i=0;i<data.length;i++){
 if(i==0){
 tableData="Z"+data[i];
 empDetails.push(tableData);
 empDetails.push(paymentmode);
 }else{
 tableData=data[i];
 empDetails.push(tableData);
 }
 }
 
 /* if(cid!="salarymonth" && cid!=="status"){
 empDetails.push(tableData);
 // empDetails.push(paymentmode);
 }
 */
 
 count++;
 }


 }
 } //else loop for payment mode ends
 }

 }

 var updateData= $(this).closest("tr").find("input[name=status]").val();

 if(updateData=="changed" ){

 var cid = $(this).attr('id');

 if(paymentmode==null){
 empDetails=[];
 empUpdateDetails=[];
 }else{

 if(empUpdateDetails.length==0){
 alert(this.value);
 // tableData=(this.value).replace(/\s/g,'');
 var data=(this.value).split(" ");
 for(var i=0;i<data.length;i++){
 tableData=data[i];
 if(i==0){
 if(tableData==""){
 tableData=0;
 }
 empUpdateDetails.push(tableData);
 empUpdateDetails.push(paymentmode);
 }else{
 empUpdateDetails.push(tableData);
 }
 }
 updatecount++;
 alert("count value if array is empty : "+updatecount);
 
 }else{
 
 if(updatecount<=arrayLength){
 
 
 tableData=this.value.replace(/\s/g,'');
 if(tableData==""){
 tableData=0;
 }
 if(cid!="salarymonth" && cid!=="status"){
 alert("COLUMN NAME "+cid);
 empUpdateDetails.push(tableData);
 }
 
 updatecount++;
 
 }else{
 updatecount=1;

 // tableData="Z"+(this.value).replace(/\s/g,'');
 // empUpdateDetails.push(tableData);
 var data=(this.value).split(" ");
 for(var i=0;i<data.length;i++){
 if(i==0){
 tableData="Z"+data[i];
 empUpdateDetails.push(tableData);
 empUpdateDetails.push(paymentmode);
 }else{
 tableData=data[i];
 empUpdateDetails.push(tableData);
 }
 }

 if(cid!="salarymonth" && cid!=="status"){
 empUpdateDetails.push(tableData);
 }
 updatecount++;
 
 
 }
 
 }

 } //else loop for payment mode ends
 }
 
 
 
 })
 
 console.log("EMP SALARY CALC ARRAY DATA :"+empDetails);
 
 this.state.salaryDetails=empDetails.toString();
 this.state.salaryUpdateDetails=empUpdateDetails.toString();
 this.state.additionCategoryName=additionCategoryName.toString();
 this.state.reductionCategoryName=reductionCategoryName.toString();
 
 this.setState({
 
 salaryDetails:this.state.salaryDetails,
 salaryUpdateDetails:this.state.salaryUpdateDetails,
 additionCategoryName:this.state.additionCategoryName,
 reductionCategoryName:this.state.reductionCategoryName
 
 })
 
 
 console.log("AJAX CALL SALARY DATA :"+JSON.stringify({
 
 schoolId:this.state.companyId,
 salaryDetails:this.state.salaryDetails.toString(),
 salaryUpdateDetails:this.state.salaryUpdateDetails.toString(),
 additionCategoryName:this.state.additionCategoryName.toString(),
 reductionCategoryName:this.state.reductionCategoryName.toString(),
 salaryMonth:this.state.month
 }));
 
 
 
 if(empDetails.length!=0 || empUpdateDetails.length!=0){
 
 
 $.ajax({
 type: 'POST',
 data: JSON.stringify({
 schoolId:this.state.companyId,
 salaryDetails:this.state.salaryDetails.toString(),
 salaryUpdateDetails:this.state.salaryUpdateDetails.toString(),
 additionCategoryName:this.state.additionCategoryName.toString(),
 reductionCategoryName:this.state.reductionCategoryName.toString(),
 date:this.state.date,
 salaryMonth:this.state.month
 }),
 //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeList",
 url: "http://localhost:8080/EmployeeAttendenceAPI/payroll/AddSalary",
 // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/SelectAllEmployee",
 
 
 contentType: "application/json",
 dataType: 'json',
 async: false,
 crossDomain: true,
 
 success: function (data, textStatus, jqXHR) {
 
 confirmAlert({
 title: 'Success', // Title dialog
 message: 'Added Payment SuccessFully', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 });
 
 }
 
 });
 
 }else{
 
 confirmAlert({
 title: 'Salary Credition Failed', // Title dialog
 message: 'Salary Credition Failed Due To Submission Of Empty or Unfilled Fields', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 });
 
 }
 }
 
 BackbtnFunc() {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={EmployeeMenuHeader} />
 <Route path="/" component={EmployeeMenuPage} />
 <Route path="/" component={FooterText} />
 </div>
 </Router>,
 document.getElementById('root'));
 registerServiceWorker();
 }
 
 ViewPaySlip() {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={EmployeeMenuHeader} />
 <Route path="/" component={ViewPayroll} />
 <Route path="/" component={FooterText} />
 </div>
 </Router>,
 document.getElementById('root'));
 registerServiceWorker();
 }
 
 GeneratePaySlip() {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={EmployeeMenuHeader} />
 <Route path="/" component={GenerateMonthlyPaySlip} />
 <Route path="/" component={FooterText} />
 </div>
 </Router>,
 document.getElementById('root'));
 registerServiceWorker();
 }

 AdvanceReport(){

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={EmployeeMenuHeader} />
 <Route path="/" component={AdvanceReport} />
 <Route path="/" component={FooterText} />
 </div>
 </Router>,
 document.getElementById('root'));
 registerServiceWorker();

 }

 
 //tax,pf,esi,travelling
 render() {
 return (
 <div className="container" style={{ marginBottom: "2%" }}>
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
 
 <h3 className="centerAlign" style={{ marginTop: "-10px", textAlign: "center" }}>PayRoll Management</h3>
 
 <div id='horMenu'>
 <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
 <li><a className="active" onClick={() => this.GeneratePaySlip()}><span class="glyphicon glyphicon-plus">Generate PaySlip</span></a></li>
 <li><a onClick={() => this.ViewPaySlip()}><span class="glyphicon glyphicon-minus">View PaySlip</span> </a></li>
 <li><a onClick={() => this.AdvanceReport()}><span class="glyphicon glyphicon-minus">Advance Report</span> </a></li>
 
 </ul>
 </div>
 
 
 
 <div id="tableOverflow">
 <table class="table table-bordered" id="salaryTable" name="salaryTable" style={{ marginTop: "50px", textAlign: "center" }}>
 <tr id="tablerowdata" class="spaceUnder" >
 <th class="verticalTableHeader">
 <p>Employee</p>
 <p>Details</p></th>
 {/*} <th class="verticalTableHeader">Name</th>
 <th class="verticalTableHeader">Role</th>
 <th class="verticalTableHeader">Dept</th> */}
 <th class="verticalTableHeader">
 <p>Adv_grnd</p>
 </th>
 <th class="verticalTableHeader">
 <p>Advance </p>
 <p>Credit</p>
 </th>
 <th class="verticalTableHeader">
 <p>Working </p>
 <p>Days</p></th>
 <th class="verticalTableHeader">Present</th>
 <th class="verticalTableHeader">P/H</th>
 <th class="verticalTableHeader">Absent</th>
 <th class="verticalTableHeader">Holiday</th>
 <th class="verticalTableHeader">
 <p>Basic</p>
 <p>Pay</p></th>
 <th class="verticalTableHeader">
 <p>Net</p>
 <p>Salary</p>
 </th>
 <th class="verticalTableHeader">
 <p>Advance</p>
 <p>Debit</p>
 </th>
 <th class="verticalTableHeader">
 <p>P/H</p>
 <p>Salary</p>
 </th>
 <th class="verticalTableHeader">
 <p>Salary</p>
 <p>Mode</p>
 </th>

</tr>
 
 </table>
 
 <div>
 <button id="submit" onClick={() => this.Submit()}>Submit</button>
 </div>
 
 </div>
 
 
 
 
 
 
 <div class="modal fade" id="myModalview">
 <div class="modal-dialog">
 <div class="modal-content">
 <div class="modal-header">
 <h4 class="modal-title">Advance</h4>
 <button type="button" class="close" data-dismiss="modal">&times;</button>
 </div>
 
 <div class="modal-body" style={{display: "grid"}}>
 
 
 <label for="employeeid">Employee Id</label> 
 
 <input type="text" 
 onChange={this.handleUserInput}
 value={this.state.employeeId}
 id="employeeid"
 name="employeeId" readOnly/>
 
 <label for="username">Employee Name</label> 
 
 <input type="text" 
 onChange={this.handleUserInput}
 value={this.state.name}
 id="name"
 name="name" readOnly/>
 
 
 
 <label for="role">Role</label> 
 
 <input type="text" 
 onChange={this.handleUserInput}
 value={this.state.role}
 id="role"
 name="role" readOnly/>
 
 
 <label for="department">Department</label> 
 
 <input type="text"
 onChange={this.handleUserInput}
 value={this.state.department}
 id="department"
 name="department" readOnly/>
 
 
 <label for="advance granted">Granted Advance</label> 
 
 <input type="text"
 onChange={this.handleUserInput}
 value={this.state.grantedAdvance}
 id="grantedadvance"
 name="grantedAdvance" readOnly/>
 
 <label for="advance">Advance</label> 
 
 <input type="text"
 onChange={this.handleUserInput}
 value={this.state.advance}
 id="advance"
 name="advance" />
 
 </div>
 
 
 <div class="modal-footer">
 <button type="button" class="btn btn-info" onClick={() => this.GrantAdvance()}
 data-dismiss="modal">Grant_Advance</button>
 
 <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button>
 </div>
 </div>
 </div>
 </div>
 
 
 
 
 </div>
 
 );
 }
 
 }
 
 
 export default GenerateMonthlyPaySlip;