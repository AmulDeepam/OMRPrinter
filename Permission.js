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

class Permission extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
    this.state = {
      permission: [],
      roleName: '',
      companyId:companyId,
      valid: false,   
   
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: [value],
      valid: true,
    });
  
    this.state.roleName = value;
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        roleName: this.state.roleName.toString(),
        companyId:this.state.companyId,
      }),
      url: "http://52.66.243.218:8080/ERPDetails/taskmapping/retrievePermission",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        self.state.permission = [];
        $("#master").prop('checked', false);
        $("#attendance").prop('checked', false);
        $("#saleorder").prop('checked', false);
        $("#purchaseorder").prop('checked', false);
        $("#expense").prop('checked', false);
        $("#quotation").prop('checked', false);
        $("#employee").prop('checked', false);
        $("#gst").prop('checked', false);
        $("#admin").prop('checked', false);
        $("#report").prop('checked', false);
        $("#setting").prop('checked', false);
       
        $("#taskMapping").prop('checked', false);
     
       

        if (data.employeePermisionlist.length != 0) {
          if (data.employeePermisionlist[0].permission != "") {
            $.each(data.employeePermisionlist, function (i, item) {
              $("#" + item.permission).prop('checked', true);

              self.state.permission.push(item.permission);

            });
          }
        }
        ReactDOM.render(
          <Router >
            <div>
           
              <Route path="/" component={Permission} />
       

            </div>
          </Router>, document.getElementById('contentRender'));


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

  handleCheckBox = (e) => {
    const name = e.target.name;
    if ($('#' + name).is(':checked')) {

      $(name).attr('value', 'true');

      this.state.permission.push(name);

    } else {
      var i = this.state.permission.length;
    
      while (i--) {
        if (name == this.state.permission[i]) {

          this.state.permission.splice(i, 1);
        }

      }
    } this.setState({ permission: this.state.permission },
    );
  }




  componentDidMount() {

    window.scrollTo(0, 0);


    window.scrollTo(0, 0);      
    var self=this;
    var roleName;
 $.ajax({
     type: 'POST',
     data: JSON.stringify({
      companyId:this.state.companyId,
      
    }),
    url: "http://52.66.243.218:8080/ERPDetails/admin/rolereport",
     contentType: "application/json",
     dataType: 'json',
     async: false,

     success: function (data, textStatus, jqXHR) {
       console.log("data",data)

 roleName += '<option disabled selected hidden >Select a role</option>';
 
 $.each(data.roleRetrievelist, function (i, item) {
  roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'
 });
 $("#roleName").append(roleName);

 },
 error: function (data) {
   console.log("err");
   confirmAlert({
     title: 'No Internet',                        // Title dialog
     message: 'Network Connection Problem',               // Message dialog
     confirmLabel: 'Ok',                           // Text button confirm
   });

 }
});


  }


  Submit() {
  
    this.state.permission = this.state.permission.toString();
    this.state.roleName = this.state.roleName.toString();
    this.setState({
      permission: this.state.permission.toString(),
      roleName: this.state.roleName.toString(), 
     
    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        permission: this.state.permission.toString(),
        roleName: this.state.roleName.toString(),
        companyId:this.state.companyId,
      }),
      url: "http://52.66.243.218:8080/ERPDetails/taskmapping/employeePermission",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        
          confirmAlert({
            title: 'Permission',                        // Title dialog
            message: 'Updated Permission for ' + self.state.roleName,               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

     
        ReactDOM.render(
          <Router >
            <div>  
              <Route path="/" component={Permission} />
                     </div>
          </Router>, document.getElementById('contentRender'));

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

      <div class="container" style={{ marginBottom: '10%' }} >
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
                <div class="card-header">          
                        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Task Mapping</h4>   </div> 
       
        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <label>
              Role*
      <select
                id="roleName"
                className="form-control"
                onChange={this.handleUserInput}
                name="roleName"
              >
              </select>
            </label>

          </div>
        </form>
        <div style={{marginLeft:"30px"}} class="btn-group">
        <div class="checkBoxClass">
            <label><input type="checkbox" 
              value={this.state.master}
              name="master"
              
              onChange={this.handleCheckBox}
              id="master" /><span> Master</span></label>
          </div>
          <div class="checkBoxClass">
            <label><input type="checkbox"
              value={this.state.attendance}
              name="attendance"
              onChange={this.handleCheckBox}
              id="attendance" /><span> Attendance</span></label>
          </div>
          <div class="checkBoxClass">
            <label><input type="checkbox"
              value={this.state.saleorder}
              name="saleorder"
              onChange={this.handleCheckBox}
              id="saleorder" /><span> Sale Order</span></label>
          </div>
          <div class="checkBoxClass ">
            <label><input type="checkbox"
              value={this.state.purchaseorder}
              name="purchaseorder"
              onChange={this.handleCheckBox}
              id="purchaseorder" /><span> Purchase Order</span></label>
          </div>
          <div class="checkBoxClass">
            <label><input type="checkbox"
              value={this.state.expense}
              name="expense"
              onChange={this.handleCheckBox}
              id="expense" /><span> Expense</span></label>
          </div>
          <div class="checkBoxClass">
            <label><input type="checkbox"
              value={this.state.quotation}
              name="quotation"
              onChange={this.handleCheckBox}
              id="quotation" /><span> Quotation</span></label>
          </div>
          <div class="checkBoxClass">
            <label><input type="checkbox"
              value={this.state.employee}
              name="employee"
              onChange={this.handleCheckBox}
              id="employee" /><span> Employee</span></label>
          </div>
          <div class="checkBoxClass ">
            <label><input type="checkbox"
              value={this.state.gst}
              name="gst"
              onChange={this.handleCheckBox}
              id="gst" /><span> GST</span></label>
          </div>
          <div class="checkBoxClass ">
            <label><input type="checkbox"
              value={this.state.admin}
              name="admin"
              onChange={this.handleCheckBox}
              id="admin" /><span> Admin</span></label>
          </div>
          <div class="checkBoxClass ">
            <label><input type="checkbox"
              value={this.state.report}
              name="report"
              onChange={this.handleCheckBox}
              id="report" /><span> Reports</span></label>
          </div>
          <div class="checkBoxClass">
            <label><input type="checkbox"
              value={this.state.setting}
              name="setting"
              onChange={this.handleCheckBox}
              id="setting" /><span> Settings</span></label>
          </div>
       
       
          <div class="checkBoxClass ">
            <label><input type="checkbox"
              value={this.state.taskMapping}
              name="taskMapping"
              onChange={this.handleCheckBox}
              id="taskMapping" /><span> Task Mapping</span></label>
          </div>      
          <button
            type="button"
            onClick={() => this.Submit()}
            disabled={!this.state.valid}

            style={{
              marginLeft: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              marginBottom: "10px",
            }}

            class="btn btn-default">Give Permission</button>


        </div>
      </div></div>

    );
  }

}

export default Permission;