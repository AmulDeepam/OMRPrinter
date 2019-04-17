package saleOrder;

import java.util.ArrayList;

import saleOrder.SaleOrderJSON;

public class SaleOrderJSON {

	private String customerName;
	private ArrayList<SaleOrderJSON> selectcustomernamelist ;
	private ArrayList<SaleOrderJSON> selectindividualsaleproductlist;
	private ArrayList<SaleOrderJSON> selectInvoiceNoList;
	private ArrayList<SaleOrderJSON> selectEstimateInvoiceNoList;
	private ArrayList<SaleOrderJSON>  saleinvoicereportlist;
	private ArrayList<SaleOrderJSON>  productdatalist;
	private ArrayList<SaleOrderJSON>  arrdatalist;
	private ArrayList<SaleOrderJSON> estimateinvoicereportlist;
	private String arrdata;
	private String payment_status;
	private String invoiceNo;
	private int orderNumber;
	private String invoiceDate;
	private String dueDate;
	private String productName;
	private String description;
	private String height;
	private String width;
	private String size;
	private String rate;
	private String amount;
	private String quantity;
	private String total;
	private String cgst;
	private String sgst;
	private String subtotal1;
	private String advance;
	private String discount;
	private String balance_amount;
	private String saleType;
	private String individualRate;
	private String dealerRate;	
	private String cgsta;
	private String sgsta;
	private String igsta;
	private String finalAmount;
	private String date;
	private String unit;
	private String igst;
	private int customerId;
	private String contactNo;
	private int eorderNumber;
	private String totalcgst;
	private String totalsgst;
	private String totaligst;
    private String totalgst;
    private String totalitemqty;
    private String invoiceData;
    private String saleInvoiceId;
    private String estimateId;
   
	private String companyName;
	private String emailId;
	private String message;
	private String address;
	private String gstNo;
	private String email;
	private String companyId;


	

	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPayment_status() {
		return payment_status;
	}
	public void setPayment_status(String payment_status) {
		this.payment_status = payment_status;
	}
	public String getEstimateId() {
		return estimateId;
	}
	public void setEstimateId(String estimateId) {
		this.estimateId = estimateId;
	}
	public ArrayList<SaleOrderJSON> getEstimateinvoicereportlist() {
		return estimateinvoicereportlist;
	}
	public void setEstimateinvoicereportlist(ArrayList<SaleOrderJSON> estimateinvoicereportlist) {
		this.estimateinvoicereportlist = estimateinvoicereportlist;
	}
	public String getSaleInvoiceId() {
		return saleInvoiceId;
	}
	public void setSaleInvoiceId(String saleInvoiceId) {
		this.saleInvoiceId = saleInvoiceId;
	}
	public ArrayList<SaleOrderJSON> getSaleinvoicereportlist() {
		return saleinvoicereportlist;
	}
	public void setSaleinvoicereportlist(ArrayList<SaleOrderJSON> saleinvoicereportlist) {
		this.saleinvoicereportlist = saleinvoicereportlist;
	}
	public String getInvoiceData() {
		return invoiceData;
	}
	public void setInvoiceData(String invoiceData) {
		this.invoiceData = invoiceData;
	}
	public ArrayList<SaleOrderJSON> getArrdatalist() {
		return arrdatalist;
	}
	public void setArrdatalist(ArrayList<SaleOrderJSON> arrdatalist) {
		this.arrdatalist = arrdatalist;
	}
	public ArrayList<SaleOrderJSON> getProductdatalist() {
		return productdatalist;
	}
	public void setProductdatalist(ArrayList<SaleOrderJSON> productdatalist) {
		this.productdatalist = productdatalist;
	}
	public String getArrdata() {
		return arrdata;
	}
	public void setArrdata(String arrdata) {
		this.arrdata = arrdata;
	}
	public String getTotalitemqty() {
		return totalitemqty;
	}
	public void setTotalitemqty(String totalitemqty) {
		this.totalitemqty = totalitemqty;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public ArrayList<SaleOrderJSON> getSelectcustomernamelist() {
		return selectcustomernamelist;
	}
	public void setSelectcustomernamelist(ArrayList<SaleOrderJSON> selectcustomernamelist) {
		this.selectcustomernamelist = selectcustomernamelist;
	}

	public ArrayList<SaleOrderJSON> getSelectEstimateInvoiceNoList() {
		return selectEstimateInvoiceNoList;
	}
	public void setSelectEstimateInvoiceNoList(ArrayList<SaleOrderJSON> selectEstimateInvoiceNoList) {
		this.selectEstimateInvoiceNoList = selectEstimateInvoiceNoList;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public int getOrderNumber() {
		return orderNumber;
	}
	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getCgst() {
		return cgst;
	}
	public void setCgst(String cgst) {
		this.cgst = cgst;
	}
	public String getSgst() {
		return sgst;
	}
	public void setSgst(String sgst) {
		this.sgst = sgst;
	}

	public String getSubtotal1() {
		return subtotal1;
	}
	public void setSubtotal1(String subtotal1) {
		this.subtotal1 = subtotal1;
	}
	public String getAdvance() {
		return advance;
	}
	public void setAdvance(String advance) {
		this.advance = advance;
	}
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getSaleType() {
		return saleType;
	}
	public void setSaleType(String saleType) {
		this.saleType = saleType;
	}
	public String getIndividualRate() {
		return individualRate;
	}
	public void setIndividualRate(String individualRate) {
		this.individualRate = individualRate;
	}
	public String getDealerRate() {
		return dealerRate;
	}
	public void setDealerRate(String dealerRate) {
		this.dealerRate = dealerRate;
	}
	public ArrayList<SaleOrderJSON> getSelectindividualsaleproductlist() {
		return selectindividualsaleproductlist;
	}
	public void setSelectindividualsaleproductlist(ArrayList<SaleOrderJSON> selectindividualsaleproductlist) {
		this.selectindividualsaleproductlist = selectindividualsaleproductlist;
	}
	public String getCgsta() {
		return cgsta;
	}
	public void setCgsta(String cgsta) {
		this.cgsta = cgsta;
	}
	public String getSgsta() {
		return sgsta;
	}
	public void setSgsta(String sgsta) {
		this.sgsta = sgsta;
	}
	public String getIgsta() {
		return igsta;
	}
	public void setIgsta(String igsta) {
		this.igsta = igsta;
	}
	public String getFinalAmount() {
		return finalAmount;
	}
	public void setFinalAmount(String finalAmount) {
		this.finalAmount = finalAmount;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getIgst() {
		return igst;
	}
	public void setIgst(String igst) {
		this.igst = igst;
	}
	public ArrayList<SaleOrderJSON> getSelectInvoiceNoList() {
		return selectInvoiceNoList;
	}
	public void setSelectInvoiceNoList(ArrayList<SaleOrderJSON> selectInvoiceNoList) {
		this.selectInvoiceNoList = selectInvoiceNoList;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public int getEorderNumber() {
		return eorderNumber;
	}
	public void setEorderNumber(int eorderNumber) {
		this.eorderNumber = eorderNumber;
	}
	public String getBalance_amount() {
		return balance_amount;
	}
	public void setBalance_amount(String balance_amount) {
		this.balance_amount = balance_amount;
	}
	
	public String getTotalcgst() {
		return totalcgst;
	}
	public void setTotalcgst(String totalcgst) {
		this.totalcgst = totalcgst;
	}
	public String getTotalsgst() {
		return totalsgst;
	}
	public void setTotalsgst(String totalsgst) {
		this.totalsgst = totalsgst;
	}
	public String getTotaligst() {
		return totaligst;
	}
	public void setTotaligst(String totaligst) {
		this.totaligst = totaligst;
	}
	public String getTotalgst() {
		return totalgst;
	}
	public void setTotalgst(String totalgst) {
		this.totalgst = totalgst;
	}
	

	
	
	
}
