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
import Gstdashboard1 from './Gstdashboard1';

class LicenseEntryForm extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
     
        var proprietor;
        this.state = {
            otp: '',
            date: date,
            licenseKey:'',
            companyId:companyId,
        };
        this.setState({
            roleName:proprietor,
            companyId:companyId,
            date: date,
        });
    }


    handleChangeotp(value) {
        this.setState({
            licenseKey: value
        });

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    BackbtnFunc() {
        ReactDOM.render(<LoginPage />, document.getElementById("root"));
    }

    LicenseKeyverify() {
        var self = this;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
      
        var LicenseKey = CryptoJS.AES.decrypt(localStorage.getItem('LicenseKey'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
   


        if (this.state.licenseKey == LicenseKey) {   
         



            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId:this.state.companyId,
                }),
                url: "http://52.66.243.218:8080/ERPDetails/Login/UpdateStatus",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                   ReactDOM.render(<Gstdashboard1 />, document.getElementById("root"));
                   // localStorage.clear();

                

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
                title: "LicenseKey Error",                        // Title dialog
                message: "LicenseKey You Have Entered Is Wrong Kindly Re-Enter The Correct LicenseKey",               // Message dialog
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
                        <label htmlFor="licenseKey">License Key:</label>
                        <input type="text" id="licenseKey" value={this.state.licenseKey} onChange={(e) => this.handleChangeotp(e.target.value)} className="form-control" placeholder="Enter licenseKey" />
                    </div>
                    <br />
                    <button type="button" onClick={() => this.LicenseKeyverify()} class="btn btn-primary">Submit</button>

                </div>
            </div>
        );
    }

}
export default LicenseEntryForm;