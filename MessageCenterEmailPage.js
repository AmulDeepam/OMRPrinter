import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import Dashboardoverall from './Dashboardoverall';

var testarray = [];
var inputarray = [];
var emailArrary = [];

class MessageCenterEmailPage extends Component {


    constructor() {

        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId=CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
  
        this.state = {
            department: '',
            TotalNoShift: '',
            shift: '',
            count: '',
            role: '',
            valid: false,
          //  companyId: '',
            companyId:companyId,
            staffId:staffId,
            superiorId: '',
            employeeId: [],
            message: '',
            answer: '',
            copy: '',

            authPassword:'',

        };
    }

    componentDidMount() {
        emailArrary = [];
        var self = this;
        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                $(".checkBoxClass").prop('checked', $(this).prop('checked'));
            });
        });


        this.GetData();


        $('#btnAdd').click(function (e) {
            var selectedOpts = $('#MasterSelectBox option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len=  $('#MasterSelectBox').children('option').length;
                if(len==0){
                     confirmAlert({
                         title: ' Error',                        // Title dialog
                         message: 'No Recipients to Add',               // Message dialog
                         confirmLabel: 'Ok',                           // Text button confirm
                     });
                }else{
                
                 confirmAlert({
                     title: ' Error',                        // Title dialog
                     message: 'Please Select Recipients to Add',               // Message dialog
                     confirmLabel: 'Ok',                           // Text button confirm
                 });
                }
            }

            $('#PairedSelectBox').append($(selectedOpts).clone())

            var selectedData = "";
            $('#MasterSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                emailArrary.push(selectedData);
     
            });

            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnRemove').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len=  $('#PairedSelectBox').children('option').length;
                if(len==0){
                     confirmAlert({
                         title: ' Error',                        // Title dialog
                         message: 'No Recipients to Remove',               // Message dialog
                         confirmLabel: 'Ok',                           // Text button confirm
                     });
                }else{
                 confirmAlert({
                     title: ' Error',                        // Title dialog
                     message: 'Please Select Recipients to Remove',               // Message dialog
                     confirmLabel: 'Ok',                           // Text button confirm
                 });
             }
            }

            $('#MasterSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
            $('#PairedSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();


                for (var i = emailArrary.length - 1; i >= 0; i--) {
                    if (emailArrary[i] === selectedData) {
                        emailArrary.splice(i, 1);
                         console.log("emailArray" + emailArrary);
                    }  
                }
                
            });

            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnAddAll').click(function (e) {

            var selectedOpts = $('#MasterSelectBox option');


            if (selectedOpts.length == 0) {
                e.preventDefault();
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'No Recipients to Add',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }

            $('#PairedSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
            $('#MasterSelectBox option').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                emailArrary.push(selectedData);
                
            });
            $("#seperateddata").append(selectedData);

            $(selectedOpts).remove();
            e.preventDefault();


        });


        $('#btnRemoveAll').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'No Recipients to Remove',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }
           
            $('#MasterSelectBox').append($(selectedOpts).clone());
            var selectedData = "";
            emailArrary.splice(0, emailArrary.length);
            console.log("emailArray" + emailArrary);
            $(selectedOpts).remove();
            e.preventDefault();
        });


    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }


    Submit() {
     
        var self=this;


        $.each($("input[name='email']:checked"), function(){            
            emailArrary.push($(this).val());
        });

              this.state.emailId = emailArrary.toString();
                this.setState({
                    emailId: this.state.emailId,
                    message:this.state.message
                });

                        
                console.log("EMAIL ARRAY DATA"+JSON.stringify({
                    emailId: this.state.emailId,
                    message:this.state.message}));

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        sendTo: this.state.emailId,
                        message:this.state.message,
                        companyId:this.state.companyId,
                        staffId:this.state.staffId,
                    }),
                    url: "http://52.66.243.218:8080/ERPDetails/MessageCenter/SendMail",
                    // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/MessageCenter/SendSms",
                    contentType: "application/json",
                    dataType: 'json',
                    async: false,

                    success: function (data, textStatus, jqXHR) {
                        $("#PairedSelectBox").empty();
                        emailArrary = [];
                        self.state.message = "";

                      confirmAlert({
                            title: 'Success', // Title dialog
                            message: 'Message Sent Succerssfully. ', // Message dialog
                            confirmLabel: 'Ok', // Text button confirm


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

    GetData(){

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId:this.state.companyId,
                
              }),
            url:"http://52.66.243.218:8080/ERPDetails/MessageCenter/GetMailCustomerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {


if (data.length != 0) {
 
             //   $("#MasterSelectBox").empty();
               
                var tab;

           
                var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th><input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /></th><th>CustomerName</th><th>CompanyName</th><th>EmailId</th></tr></thead>';
              
             
                $.each(data, function (i, item) {
               
                        console.log('DATA' +item.customerName);
                      //  tab += '<option value= "' + item.emailId + '">' + item.customerName + "  " + item.companyName + "  " + item.emailId +'</option>';
                      tab += '<tr><td><input type="checkbox" class="checkBoxClass" id="mailcheckBox" name="email" value = " '+item.emailId+' " /></td><td>' + item.customerName +'</td><td>'+ item.companyName +'</td><td>'+ item.emailId +'</td><tr>';
             
                    });
                }
              //  $("#MasterSelectBox").append(tab);
                $("#customerListTable").append(tab);
            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
            }


        })
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

            <div class="container" style={{ marginBottom: "30%" }}>
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
         

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Email Message</h3>

<div class="row" >
    <div class="col-sm-5">

<table id="customerListTable" style={{ height: "100px" , width: "200%"}}>
</table>

</div>
</div>



<br/>
<br/>
<br/>
<br/>


                    <label for="comment">Message Content:</label>
                    <textarea
                        onChange={this.handleUserInput}
                        name="message"
                        placeholder="Your message.."
                        value={this.state.message}
                        required style={{ height: '200px' }}
                        class="form-control"
                        rows="5" id="message"
                    ></textarea>

                    <br />
                    <br />
                
<button onClick={() => this.Submit()}> 
            Submit
            </button>
            
          
      
               

            </div>





        );
    }

}
export default MessageCenterEmailPage;