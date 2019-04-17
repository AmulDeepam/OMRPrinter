import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './gstdashboard.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ProductList from './ProductList';
import Dashboardoverall from './Dashboardoverall';
import ProductListView from './ProductListView'; 
import ProductListEdit from './ProductListEdit'
var  currentRow;
class Purchase1 extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();  
    
    this.state = {
      date: today,
      productName:'',
      productCategory:'',
      

    };
  }
  componentDidMount() { 
  
    var self=this;
    window.scrollTo(0, 0);
    $("#nodata").hide();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
        companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
     
  }),
     url: "http://52.66.243.218:8080/ERPDetails/master/purchaseproductreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
var no;
if(data.purchaseProductRetrievelist.length!=0){
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Product Name</th><th>Unit</th><th>CGST(%)</th><th>SGST(%)</th><th>IGST(%)</th><th>HSN Code</th><th style="width: 5px; ">Individual Rate(Rs)</th><th style="width: 5px; ">Dealer Rate(Rs)</th><th   colspan="3" style="text-align: center; ">Actions</th></tr></thead>';
    $.each(data.purchaseProductRetrievelist, function (i, item) {
      no=parseInt(i)+1;
      tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.productName + '</td><td>' + item.unit + '</td><td>' + item.cgst + '</td><td>' + item.sgst + '</td><td>' + item.igst + '</td><td>' + item.hsnCode + '</td><td>' + item.individualRate + '</td><td>' + item.dealerRate + '</td><td class="productCategory">' + item.productCategory + '</td><td class="description">' + item.description + '</td><td class="productId">' + item.productId + '</td><td><button id="delete">Delete</button><td><button id="view">View</button></td><td><button id="edit">Edit</button></td></td></tr></tbody>';
      self.state.productCategory = item.productCategory;

      self.setState({
        productCategory: item.productCategory,
      })
   
    });
 
    $("#tableHeadings").append(tab);
    $(".productCategory").hide();
    $(".description").hide();
    $(".productId").hide();
  }else{
    $("#nodata").show();
    $("#test-table-xls-button").hide();
    $("#myInput").hide();
}
  },
  error: function (data) {
    confirmAlert({
      title: 'No Internet',                        // Title dialog
      message: 'Network Connection Problem',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

  }
});



    //search button func 
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    $("#tableHeadings").on('click', '#delete', function () {
      // get the current row

         var currentRow = $(this).closest("tr");
         console.log("cr",currentRow);
  var productName=currentRow.find("td:eq(1)").html();  

  self.state.productName = productName;  
  
    
      self.setState({
  
        productName:self.state.productName,
    
    
  
      })
      console.log("console productName",self.state.productName);
      confirmAlert({
        title: 'Delete Confirmation',                        // Title dialog
        message: 'Are You Sure Do You Want To Delete the PurchaseProduct Details ? ',               // Message dialog
        confirmLabel: 'Delete',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.DeleteFunc(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel
    
    })
       
  //self.DeleteFunc(currentRow);
  
    });
    $("#tableHeadings").on('click', '#view', function () {
      // get the current row

      currentRow = $(this).closest("tr");
      self.state.productName = currentRow.find("td:eq(1)").text();
      self.state.unit = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
      self.state.cgst = currentRow.find("td:eq(3)").text();
      self.state.sgst = currentRow.find("td:eq(4)").text();
      self.state.igst = currentRow.find("td:eq(5)").text();
      self.state.hsnCode = currentRow.find("td:eq(6)").text(); // get current row 1st TD value
      self.state.individualRate = currentRow.find("td:eq(7)").text();
      self.state.dealerRate = currentRow.find("td:eq(8)").text();
      self.state.productCategory = currentRow.find("td:eq(9)").text();
      self.state.description = currentRow.find("td:eq(10)").text();
      self.state.productId = currentRow.find("td:eq(11)").text();

      if( self.state.unit =="null" || self.state.unit =="-" )
      {
        self.state.unit=" ";
      } if(self.state.cgst =="null" || self.state.cgst =="-")
      {
        self.state.cgst=" ";
      } if(self.state.sgst =="null" || self.state.sgst =="-")
      {
        self.state.sgst=" ";
      } if(self.state.igst =="null" || self.state.igst =="-")
      {
        self.state.igst=" ";
      }if(self.state.hsnCode =="null" || self.state.hsnCode =="-")
      {
        self.state.hsnCode=" ";
      }if(self.state.individualRate =="null" || self.state.individualRate =="-")
      {
        self.state.individualRate=" ";
      }
      if(self.state.dealerRate =="null" || self.state.dealerRate =="-")
      {
        self.state.dealerRate=" ";
      }
      if(self.state.productCategory =="null" || self.state.productCategory =="-")
      {
        self.state.productCategory=" ";
      }
      if(self.state.description =="null" || self.state.description =="-")
      {
        self.state.description=" ";
      }

      self.setState({
        productName: self.state.productName,
        unit: self.state.unit,
        cgst: self.state.cgst,
        sgst: self.state.sgst,
        igst: self.state.igst,
        hsnCode: self.state.hsnCode,
        individualRate: self.state.individualRate,
        dealerRate: self.state.dealerRate,
        description:self.state.description,
        productCategory:self.state.productCategory,  
        productId:self.state.productId,     
  })
      ReactDOM.render(<ProductListView productName={self.state.productName}
        unit={self.state.unit} cgst={self.state.cgst} sgst={self.state.sgst} igst={self.state.igst} hsnCode={self.state.hsnCode} individualRate={self.state.individualRate} dealerRate={self.state.dealerRate} productCategory={self.state.productCategory} description={self.state.description} productId={self.state.productId}
    />, document.getElementById("contentRender"));



    });

    $("#tableHeadings").on('click', '#edit', function () {
      // get the current row
      currentRow = $(this).closest("tr");
      self.state.productName = currentRow.find("td:eq(1)").text();
      self.state.unit = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
      self.state.cgst = currentRow.find("td:eq(3)").text();
      self.state.sgst = currentRow.find("td:eq(4)").text();
      self.state.igst = currentRow.find("td:eq(5)").text();
      self.state.hsnCode = currentRow.find("td:eq(6)").text(); // get current row 1st TD value
      self.state.individualRate = currentRow.find("td:eq(7)").text();
      self.state.dealerRate = currentRow.find("td:eq(8)").text();
      self.state.productCategory = currentRow.find("td:eq(9)").text();
      self.state.description = currentRow.find("td:eq(10)").text();
      self.state.productId = currentRow.find("td:eq(11)").text(); 
 
 
      self.state.oldProductName = self.state.oldProductName;
      self.state.oldUnit = self.state.oldUnit;
      self.state.oldCgst = self.state.oldCgst;
      self.state.oldSgst = self.state.oldSgst;
      self.state.oldIgst = self.state.oldIgst;
      self.state.oldHsnCode = self.state.oldHsnCode;
      self.state.oldIndividualRate = self.state.oldIndividualRate;
      self.state.oldDealerRate = self.state.oldDealerRate;
      self.state.OldDescription = self.state.OldDescription;
      self.state.OldProductCategory = self.state.OldProductCategory;


      if( self.state.unit =="null" || self.state.unit =="-" )
      {
        self.state.unit=" ";
      } if(self.state.cgst =="null" || self.state.cgst =="-")
      {
        self.state.cgst=" ";
      } if(self.state.sgst =="null" || self.state.sgst =="-")
      {
        self.state.sgst=" ";
      } if(self.state.igst =="null" || self.state.igst =="-")
      {
        self.state.igst=" ";
      }if(self.state.hsnCode =="null" || self.state.hsnCode =="-")
      {
        self.state.hsnCode=" ";
      }if(self.state.individualRate =="null" || self.state.individualRate =="-")
      {
        self.state.individualRate=" ";
      }
      if(self.state.dealerRate =="null" || self.state.dealerRate =="-")
      {
        self.state.dealerRate=" ";
      }
      if(self.state.productCategory =="null" || self.state.productCategory =="-")
      {
        self.state.productCategory=" ";
      }
      if(self.state.description =="null" || self.state.description =="-")
      {
        self.state.description=" ";
      }

      self.setState({
        productName: self.state.productName,
        unit: self.state.unit,
        cgst: self.state.cgst,
        sgst: self.state.sgst,
        igst: self.state.igst,
        hsnCode: self.state.hsnCode,
        individualRate: self.state.individualRate,
        dealerRate: self.state.dealerRate,
        description:self.state.description,
        productCategory:self.state.productCategory,    
        productId:self.state.productId,
        
        oldProductName: self.state.oldProductName,
        oldUnit: self.state.oldUnit,
        oldCgst: self.state.oldCgst,
        oldSgst: self.state.oldSgst,
        oldIgst: self.state.oldIgst,
        oldHsnCode: self.state.oldHsnCode,
        oldIndividualRate: self.state.oldIndividualRate,
        oldDealerRate: self.state.oldDealerRate,
        OldDescription:self.state.OldDescription,
        OldProductCategory:self.state.OldProductCategory,
  })
    
 ReactDOM.render(<ProductListEdit productName={self.state.productName}
  unit={self.state.unit} cgst={self.state.cgst} sgst={self.state.sgst} igst={self.state.igst} hsnCode={self.state.hsnCode} individualRate={self.state.individualRate} dealerRate={self.state.dealerRate} productCategory={self.state.productCategory} description={self.state.description} productId={self.state.productId}
        oldProductName={self.state.oldProductName} oldUnit={self.state.oldUnit} oldCgst={self.state.oldCgst} oldSgst={self.state.oldSgst} oldIgst={ self.state.oldIgst} oldHsnCode={ self.state.oldHsnCode} oldIndividualRate={ self.state.oldIndividualRate} oldDealerRate={ self.state.oldDealerRate} OldProductCategory={ self.state.OldProductCategory} OldDescription={ self.state.OldDescription}  />, document.getElementById("contentRender"));



    });

  }
  DeleteFunc(currentRow)
  {
      var self=this;
  
      $.ajax({
          type: 'POST',
          data: JSON.stringify({
            productName:self.state.productName,
            productCategory:self.state.productCategory,
            companyId:self.state.companyId,
            
          }),
         url: "http://52.66.243.218:8080/ERPDetails/master/deletepurchaseproduct",
          contentType: "application/json",
          dataType: 'json',
          async: false,
    
          success: function (data, textStatus, jqXHR) {
  
              currentRow.remove();
  
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
  NoAction() {
    ReactDOM.render(
      <Router>
          <div>
              <Route path="/" component={Purchase1} />
          </div>
      </Router>,
      document.getElementById('contentRender'));

}
  SaleProductList(){
    ReactDOM.render(
      <Router>
          <div>
              <Route path="/" component={ProductList} />
            </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  PurchaseProductList(){
    ReactDOM.render(
      <Router>
          <div>
              <Route path="/" component={Purchase1} />
            </div>
      </Router>,
      document.getElementById('contentRender'));
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
             <ul class="nav nav-tabs">
    <li><a  style={{color:"black",fontWeight:"bold"}}  className="active" onClick={() => this.SaleProductList()}><span style={{display:"inline-grid"}}>Sale Report</span></a></li>
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}  onClick={() => this.PurchaseProductList()}><span style={{display:"inline-grid"}}>Purchase Report</span></a></li>
                     
  </ul>   
                <div class="card">
      <div class="card-header" style={{backgroundColor:""}}>
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Product List</h4>
      </div>
      <div>
      <div class="card-body">

        <input style={{
          color: "black", width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
          type="text" id="myInput" placeholder="Search.." title="Type in a name" />
        <div    style={{ display: "grid" }}>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button pull-right"
                    table="tableHeadings"
                    filename="Purchase_Product_List"
                    sheet="tablexls"
                    style={{marginRight:"20%"}}
                    buttonText="Download Purchase Product"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
      
        </div>
        <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>
        </div>
        </div>
</div>
      </div>
    );
  }

}

export default Purchase1;