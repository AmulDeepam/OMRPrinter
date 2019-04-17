import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LoginPage from './LoginPage';
import CryptoJS from 'crypto-js';
import SiteRegister from './SiteRegister';
import moment from 'moment';

class OTPSignUp extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
        var fromdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        var proprietor;
        this.state = {
            otp: '',
            fromdate: fromdate,

            companyName: '',
            emailId: '',
            contactNo: '',
            password: '',
            roleName: proprietor,
        };
        this.setState({
            roleName: proprietor,

            fromdate: fromdate,
        });
    }


    handleChangeotp(value) {
        this.setState({
            otp: value
        });

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    BackbtnFunc() {
        ReactDOM.render(<SiteRegister />, document.getElementById("root"));
    }

    OTPverify() {
        var self = this;
        var today = new Date();
        var fromdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        var OTP = CryptoJS.AES.decrypt(localStorage.getItem('OTP'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        if (this.state.otp == OTP) {

            var companyName = CryptoJS.AES.decrypt(localStorage.getItem('companyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            //    var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var emailId = CryptoJS.AES.decrypt(localStorage.getItem('EmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var contactNo = CryptoJS.AES.decrypt(localStorage.getItem('contactNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            //   var address = CryptoJS.AES.decrypt(localStorage.getItem('Address'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var planName = CryptoJS.AES.decrypt(localStorage.getItem('planName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var permission = CryptoJS.AES.decrypt(localStorage.getItem('permission'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            var proprietorName = CryptoJS.AES.decrypt(localStorage.getItem('ProprietorName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var doorNo = CryptoJS.AES.decrypt(localStorage.getItem('DoorNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var floor = CryptoJS.AES.decrypt(localStorage.getItem('Floor'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var street = CryptoJS.AES.decrypt(localStorage.getItem('Street'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var city = CryptoJS.AES.decrypt(localStorage.getItem('City'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var pincode = CryptoJS.AES.decrypt(localStorage.getItem('Pincode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            var landlineNo = CryptoJS.AES.decrypt(localStorage.getItem('LandlineNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var feedbackNo = CryptoJS.AES.decrypt(localStorage.getItem('FeedbackNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)





            this.state.companyName = companyName;
            //     this.state.password = password;
            this.state.emailId = emailId;
            this.state.contactNo = contactNo;
            this.state.planName = planName;
            this.state.permission = permission;

            this.state.proprietorName = proprietorName;
            //     this.state.password = password;
            this.state.doorNo = doorNo;
            this.state.floor = floor;
            this.state.city = city;
            this.state.street = street;
            this.state.pincode = pincode;
            this.state.landlineNo = landlineNo;
            this.state.feedbackNo = feedbackNo;


            this.setState({
                companyName: this.state.companyName,
                //   password: this.state.password,
                emailId: this.state.emailId,
                contactNo: this.state.contactNo,
                address: this.state.address,
                planName: this.state.planName,
                permission: this.state.permission,
                doorNo:this.state.doorNo,
                floor:this.state.floor,
                city:this.state.city,
                street:this.state.street,
                pincode:this.state.pincode,
                proprietorName:this.state.proprietorName,
                landlineNo:this.state.landlineNo,
                feedbackNo:this.state.feedbackNo,

            })
            if (planName == "Basic") {
                var dateAdd = moment().add(7, 'd').toDate();
                var todate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();

                self.state.todate = todate;

                self.setState({
                    todate: self.state.todate,
                })

            }
            else if (planName == "Premium") {
                var dateAdd = moment().add(7, 'd').add(1, 'y').toDate();
                var todate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
                self.state.todate = todate;

                self.setState({
                    todate: self.state.todate,
                })


            }
            else {

                var dateAdd = moment().add(7, 'd').add(1, 'y').toDate();
                var todate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
                self.state.todate = todate;

                self.setState({
                    todate: self.state.todate,
                })

            }
           
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyName: this.state.companyName,
                    //  password: this.state.password,
                    emailId: this.state.emailId,
                    contactNo: this.state.contactNo,
                    address: this.state.address,
                    planName: this.state.planName,
                    permission: this.state.permission,
                    roleName: this.state.roleName,
                    todate: this.state.todate,
                    fromdate: this.state.fromdate,
                    doorNo:this.state.doorNo,
                    floor:this.state.floor,
                    city:this.state.city,
                    street:this.state.street,
                    pincode:this.state.pincode,
                    proprietorName:this.state.proprietorName,
                    landlineNo:this.state.landlineNo,
                    feedbackNo:this.state.feedbackNo,
                }),
                url: "http://52.66.243.218:8080/ERPDetails/SiteRegistration/InsertSite",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    confirmAlert({
                        title: 'Registration Successful',                        // Title dialog
                        message: 'Registered Your Organization Successfully',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });
                    localStorage.clear();

                    ReactDOM.render(<LoginPage />, document.getElementById("root"));

                },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                },
            });


        } else {

            confirmAlert({
                title: "OTP Error",                        // Title dialog
                message: "OTP You Have Entered Is Wrong Kindly Re-Enter The Correct OTP",               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm


            });
        }

    }

    render() {

        return (

            <div className="container">
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
                <div className="jumbotron ">
                    <div className="form-group">
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" id="OTP" value={this.state.otp} onChange={(e) => this.handleChangeotp(e.target.value)} className="form-control" placeholder="Enter OTP" />
                    </div>
                    <br />
                    <button type="button" onClick={() => this.OTPverify()} class="btn btn-primary">Submit</button>

                </div>
            </div>
        );
    }

}
export default OTPSignUp;