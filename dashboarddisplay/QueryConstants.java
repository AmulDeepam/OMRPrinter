package dashboarddisplay;

public interface QueryConstants {
	String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";

	String DB_LOOKUP_NAME = "MySqlERPDS";

	String Select_Monthly_SaleInvoice = "Select sum(finalAmount) as SaleInvoice_Total_Amt from SaleInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	// String Select_Monthly_SaleInvoice="Select sum(subTotal1) as
	// SaleInvoice_Total_Amt from SaleInvoiceTable where Month(date) =
	// MONTH(now()) and Year(date) = YEAR(now()); ";

	String Select_Monthly_PurchaseInvoice = "Select sum(finalAmount) as PurchaseInvoice_Total_Amt from PurchaseInvoiceTable where  month(Date) = ? AND year(Date) = ?  and companyId= ? ";

	String Select_Monthly_ExpenseInvoice = "Select sum(amount) as ExpenseInvoice_Total_Amt from ExpenseTable where  month(Date) = ? AND year(Date) = ? AND status='0' and companyId= ? ";

	// dashboard total no(vendor,product,saleInvoice,withGst Quotation)

	String Select_Total_No_of_Vendors = "Select count(vendorName) as Total_No_of_Vendors from VendorTable where status='0' and companyId= ?  ";

	String Select_Total_No_of_ProductList = "Select count(productName) as Total_No_of_ProductList from ProductTable where status='0' and companyId= ? ";

	String Select_Total_No_of_SaleInvoice = "Select count(invoiceNo) as Total_No_of_SaleInvoice from SaleInvoiceTable where companyId= ? ";

	String Select_Total_No_of_WithGST_Quotation = "Select count(invoiceNo) as Total_No_of_WithGST_Quotation from GSTQuotationTable  where companyId= ? ";

	// Doughnut chart
	String Select_Total_No_of_SaleInvoice_Qty = "Select sum(quantity) as Total_No_of_SaleInvoice_Qty from SaleInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	String Select_Total_No_of_SaleInvoice_Qty_Estimate = "Select sum(quantity) as Total_No_of_SaleInvoice_Qty_Estimate from EstimateInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	// already we calculating expense value Select_Monthly_ExpenseInvoice

	String Select_Total_No_of_Salary_paid = "Select sum(empTotalWorkingHrsSalary) as Total_No_of_Salary_paid from SalaryTable where month(Date) = ? AND year(Date) = ? and status='0' and companyId= ?  ";

	// Line chart data

	String Select_Total_Sales_Amount_Individual_Monthwise = "select year(curdate()) as current_Year , month(date) as month_index , sum(finalAmount) as month_subtotal from SaleInvoiceTable where companyId= ? group by year(date), month(date) ";

	String Select_Total_Purchase_Amount_Individual_Monthwise = "select year(curdate()) as current_Year, month(date) as month_index , sum(finalAmount)  as month_subtotal  from PurchaseInvoiceTable where companyId= ? group by year(date), month(date)";

	String Select_Total_CustomerPaid_Earnings_Amount_Individual_Monthwise = "SELECT  year(curdate()), month(date),  SUM(amount)FROM ExpenseTable where  status='0' GROUP BY month(date)";
//annual amt
	String Select_Total_No_of_SaleInvoice_Amount_Annually = "select sum(finalAmount)  as Annual_Sale_Amount  from SaleInvoiceTable where  year(curdate()) and companyId= ?   ";

	String Select_Total_No_of_PurchaseInvoice_Amount_Annually = "select sum(finalAmount)  as Annual_Purchase_Amount  from PurchaseInvoiceTable where  year(curdate()) and companyId= ?  ";
//daily_report_limitby 8
	String SELECT_DAILY_SALES_INV = "SELECT distinct invoiceNo ,Date,customerName,contactNo,Payment_status,subtotal1 FROM (SELECT  invoiceNo,Date,customerName,contactNo,Payment_status,subtotal1 FROM SaleInvoiceTable where companyId= ? order by invoiceno desc limit 6)c";
	
	String SELECT_DAILY_SALES_INV_trial = "SELECT  DISTINCT(invoiceNo) FROM SaleInvoiceTable WHERE date(Date) = ?  ";
	
	String DAILY_SALES_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,total FROM SaleInvoiceTable WHERE date(Date) = ? and  invoiceNo = ? and companyId= ? order by invoiceno desc limit 8";

	
	
	/// ----------------
	String Select_Vendor_Name = "SELECT vendorName,orderNumber,vendorId,contactNo from VendorTable where Status = '0' ";

	String Select_Product_Name_Rate = "SELECT productName,description,individualRate,dealerRate,cgst,sgst,igst,unit from ProductTable  where productCategory='purchase' AND Status = '0' ";

	String PurchaseOrder_Insert = "insert into PurchaseInvoiceTable(vendorName,invoiceNo,orderNumber,invoiceDate,dueDate,saleType,productName,description,height,width,size,rate,amount,quantity,total,cgsta,sgsta,igsta,finalAmount,date,contactNo,totalcgst,totalsgst,totaligst,totalitemqty,subtotal1,totalgst,advance,discount,balance_amount,shipping,payment_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	String SaleOrder_Insert_SELECT = "SELECT MAX(invoiceNo) as invoiceNo FROM PurchaseInvoiceTable";

	String Customer_OrderNumber = "UPDATE VendorTable SET orderNumber = ? where vendorId = ? ";

	String PurchaseInvoice_Report = "SELECT purchaseId,invoiceNo,date,vendorName,contactNo,balance_amount,subtotal1,payment_status from PurchaseInvoiceTable";

}
