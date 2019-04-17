import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './gstdashboard.css';
import CryptoJS from 'crypto-js';
import Dashboardoverall from './Dashboardoverall';
var testarray = [];
var inputarray = [];
var smsArrary = [];
var mobileArrary = [];
class MessageCenterMessagePage extends Component {


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
            companyId:companyId,
            staffId:staffId,
          //  companyId: '',
            superiorId: '',
            employeeId: [],
            message: '',
            answer: '',
            copy: '',

            authPassword:'',
            msgCount: 1,
        };
    }

    componentDidMount() {

        testarray = [];
        smsArrary=[];

        var self = this;
        
        var text_max = 320;

        $('#count_Characters').html('0 / ' + text_max);
        $('#message').keyup(function () {
            var text_length = $('#message').val().length;
            var text_remaining = text_max - text_length;

            $('#count_Characters').html(text_length + ' / ' + text_max);

            if (text_length <= "160") {
                $('#count_message').html(' msg count 1')
                self.state.msgCount = 1;
                self.setState({
                    msgCount: 1,
                })
            } else {
                $('#count_message').html(' msg count 2')
                self.state.msgCount = 1;
                self.setState({
                    msgCount: 2,
                })
            }
        });

        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                $(".checkBoxClass").prop('checked', $(this).prop('checked'));
            });
        });

        this.GetData();


    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }


    Submit() {
     
        
        var self=this;

 
        

        $.each($("input[name='message']:checked"), function(){            
            smsArrary.push($(this).val());
        });

               this.state.contactNo = smsArrary.toString();
                this.setState({
                    contactNo: this.state.contactNo,
                    message:this.state.message
                });

                        
                console.log("MSG ARRAY DATA"+JSON.stringify({
                    contactNo:this.state.contactNo,
                    message:this.state.message}));

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        sendTo:this.state.contactNo,
                        message:this.state.message,
                        msgCount:this.state.msgCount,
                        staffId:this.state.staffId,
                        companyId:this.state.companyId,
                    }),
                    url: "http://52.66.243.218:8080/ERPDetails/MessageCenter/SendMessage",
                    // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/MessageCenter/SendSms",
                    contentType: "application/json",
                    dataType: 'json',
                    async: false,

                    success: function (data, textStatus, jqXHR) {
                         smsArrary = [];
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
            url:"http://52.66.243.218:8080/ERPDetails/MessageCenter/GetMessageCustomerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {


if (data.length != 0) {
    
             //   $("#MasterSelectBox").empty();
               
                var tab;
                var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th><input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /></th><th>CustomerName</th><th>CompanyName</th><th>ContactNo</th></tr></thead>';
              
                $.each(data, function (i, item) {
                   
                        console.log('DATA' +item.customerName);
                     //   tab += '<option value= "' + item.contactNo + '">' + item.customerName + "  " + item.companyName + "  " + item.contactNo +'</option>';
                    
                 
                     tab += '<tr class="success" ><td><input type="checkbox" class="checkBoxClass" id="messagecheckBox" name="message" value ="'+item.contactNo +'" /></td><td>' + item.customerName +'</td><td>'+ item.companyName +'</td><td>'+ item.contactNo +'</td><tr>';
                 
                    });
                }
            //    $("#MasterSelectBox").append(tab);
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
         

                <h3 className="centerAlign" style={{ textAlign: "center" }}>SMS Message</h3>


<div class="row" >
    <div class="col-sm-5">

<table id="customerListTable" style={{ height: "100px" , width: "200%"}}>
</table>

</div>
</div>


<br />
<br />

                    <br />


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
 <span class="pull-right label label-default" id="count_Characters"></span>
            <br />
            <h6 class="pull-right" id="count_message"></h6>
                    <br />
                    <br />
                
<button onClick={() => this.Submit()}> 
            Submit
            </button>
            
          
      
               

            </div>





        );
    }

}
export default MessageCenterMessagePage;