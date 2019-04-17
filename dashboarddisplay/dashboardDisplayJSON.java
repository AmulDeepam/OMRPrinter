package dashboarddisplay;

import java.util.ArrayList;

import saleOrder.SaleOrderJSON;



public class dashboardDisplayJSON {
	/*private String vendorName;
	private ArrayList<dashboardDisplayJSON> selectvendornamelist ;
	*/
	
	//for dashboard 
	private String date;
	private String companyId;
	private String current_Month;
	private String current_Year;
	
	private String monthly_SalesInvoice="0";
	private String monthly_PurchaseInvoice="0";
	private String monthly_ExpenseInvoice="0";
	
	private String Total_No_of_Vendors="0";
	private String Total_No_of_ProductList="0";
	private String Total_No_of_SaleInvoice="0";
	private String Total_No_of_WithGST_Quotation="0";

	private String Total_No_of_SaleInvoice_Qty;
	private String Total_No_of_SaleInvoice_Qty_Estimate;
	private String Total_No_of_Salary_paid;
	
	
	private String Total_Sales_Amount_Individual_Monthwise="0";
	private String Total_Purchase_Amount_Individual_Monthwise="0";
	
	private ArrayList<dashboardDisplayJSON> dashboard_LineChart_List;
	private ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_purchase;
	private ArrayList<dashboardDisplayJSON> dailyInvoiceList;
	
	
	private String Total_Sales_Amount_Annually="0";
	private String Total_Purchase_Amount_Annually="0";	
	
	
	private String invoiceNo;
	private String userName;
	private String contact;
	private String status;
	private String subTotal;
	
 
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getTotal_No_of_Salary_paid() {
		return Total_No_of_Salary_paid;
	}
	public void setTotal_No_of_Salary_paid(String total_No_of_Salary_paid) {
		Total_No_of_Salary_paid = total_No_of_Salary_paid;
	}
	public String getTotal_Sales_Amount_Individual_Monthwise() {
		return Total_Sales_Amount_Individual_Monthwise;
	}
	public void setTotal_Sales_Amount_Individual_Monthwise(String total_Sales_Amount_Individual_Monthwise) {
		Total_Sales_Amount_Individual_Monthwise = total_Sales_Amount_Individual_Monthwise;
	}
	public String getTotal_Purchase_Amount_Individual_Monthwise() {
		return Total_Purchase_Amount_Individual_Monthwise;
	}
	public void setTotal_Purchase_Amount_Individual_Monthwise(String total_Purchase_Amount_Individual_Monthwise) {
		Total_Purchase_Amount_Individual_Monthwise = total_Purchase_Amount_Individual_Monthwise;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMonthly_SalesInvoice() {
		return monthly_SalesInvoice;
	}
	public void setMonthly_SalesInvoice(String monthly_SalesInvoice) {
		this.monthly_SalesInvoice = monthly_SalesInvoice;
	}
	public String getCurrent_Month() {
		return current_Month;
	}
	public void setCurrent_Month(String current_Month) {
		this.current_Month = current_Month;
	}
	public String getCurrent_Year() {
		return current_Year;
	}
	public void setCurrent_Year(String current_Year) {
		this.current_Year = current_Year;
	}
	public String getMonthly_PurchaseInvoice() {
		return monthly_PurchaseInvoice;
	}
	public void setMonthly_PurchaseInvoice(String monthly_PurchaseInvoice) {
		this.monthly_PurchaseInvoice = monthly_PurchaseInvoice;
	}
	public String getMonthly_ExpenseInvoice() {
		return monthly_ExpenseInvoice;
	}
	public void setMonthly_ExpenseInvoice(String monthly_ExpenseInvoice) {
		this.monthly_ExpenseInvoice = monthly_ExpenseInvoice;
	}
	public String getTotal_No_of_Vendors() {
		return Total_No_of_Vendors;
	}
	public void setTotal_No_of_Vendors(String total_No_of_Vendors) {
		Total_No_of_Vendors = total_No_of_Vendors;
	}
	public String getTotal_No_of_ProductList() {
		return Total_No_of_ProductList;
	}
	public void setTotal_No_of_ProductList(String total_No_of_ProductList) {
		Total_No_of_ProductList = total_No_of_ProductList;
	}
	public String getTotal_No_of_SaleInvoice() {
		return Total_No_of_SaleInvoice;
	}
	public void setTotal_No_of_SaleInvoice(String total_No_of_SaleInvoice) {
		Total_No_of_SaleInvoice = total_No_of_SaleInvoice;
	}
	public String getTotal_No_of_WithGST_Quotation() {
		return Total_No_of_WithGST_Quotation;
	}
	public void setTotal_No_of_WithGST_Quotation(String total_No_of_WithGST_Quotation) {
		Total_No_of_WithGST_Quotation = total_No_of_WithGST_Quotation;
	}
	public String getTotal_No_of_SaleInvoice_Qty() {
		return Total_No_of_SaleInvoice_Qty;
	}
	public void setTotal_No_of_SaleInvoice_Qty(String total_No_of_SaleInvoice_Qty) {
		Total_No_of_SaleInvoice_Qty = total_No_of_SaleInvoice_Qty;
	}
	public String getTotal_No_of_SaleInvoice_Qty_Estimate() {
		return Total_No_of_SaleInvoice_Qty_Estimate;
	}
	public void setTotal_No_of_SaleInvoice_Qty_Estimate(String total_No_of_SaleInvoice_Qty_Estimate) {
		Total_No_of_SaleInvoice_Qty_Estimate = total_No_of_SaleInvoice_Qty_Estimate;
	}
	public ArrayList<dashboardDisplayJSON> getDashboard_LineChart_List() {
		return dashboard_LineChart_List;
	}
	public void setDashboard_LineChart_List(ArrayList<dashboardDisplayJSON> dashboard_LineChart_List) {
		this.dashboard_LineChart_List = dashboard_LineChart_List;
	}
	public ArrayList<dashboardDisplayJSON> getDashboard_LineChart_List_purchase() {
		return dashboard_LineChart_List_purchase;
	}
	public void setDashboard_LineChart_List_purchase(ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_purchase) {
		this.dashboard_LineChart_List_purchase = dashboard_LineChart_List_purchase;
	}
	public String getTotal_Sales_Amount_Annually() {
		return Total_Sales_Amount_Annually;
	}
	public void setTotal_Sales_Amount_Annually(String total_Sales_Amount_Annually) {
		Total_Sales_Amount_Annually = total_Sales_Amount_Annually;
	}
	public String getTotal_Purchase_Amount_Annually() {
		return Total_Purchase_Amount_Annually;
	}
	public void setTotal_Purchase_Amount_Annually(String total_Purchase_Amount_Annually) {
		Total_Purchase_Amount_Annually = total_Purchase_Amount_Annually;
	}
	public ArrayList<dashboardDisplayJSON> getDailyInvoiceList() {
		return dailyInvoiceList;
	}
	public void setDailyInvoiceList(ArrayList<dashboardDisplayJSON> dailyInvoiceList) {
		this.dailyInvoiceList = dailyInvoiceList;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}



}
