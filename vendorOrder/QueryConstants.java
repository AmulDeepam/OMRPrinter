package vendorOrder;

public interface QueryConstants {
	   String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";
	
	   String DB_LOOKUP_NAME = "MySqlERPDS";
	   
	   String Select_Vendor_Name ="SELECT vendorName,orderNumber,vendorId,contactNo,companyName from VendorTable where status='0' and companyId= ? ";
	   
	   String Select_Product_Name_Rate="SELECT productName,description,individualRate,dealerRate,cgst,sgst,igst,unit from ProductTable  where productCategory='purchase' and status='0' and companyId= ?";
		
	   String PurchaseOrder_Insert="insert into PurchaseInvoiceTable(vendorName,invoiceNo,orderNumber,invoiceDate,dueDate,saleType,productName,description,height,width,size,rate,amount,quantity,total,cgsta,sgsta,igsta,finalAmount,date,contactNo,totalcgst,totalsgst,totaligst,totalitemqty,subtotal1,totalgst,adjustment,discount,finalAmountTotal,shipping,payment_status,unit,vendorId,companyId,companyName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	   	
	   String SaleOrder_Insert_SELECT="SELECT CONCAT('PO-',MAX(CAST(SUBSTRING(invoiceNo, 4, length(invoiceNo)-3) AS UNSIGNED))) as invoiceNo FROM PurchaseInvoiceTable where companyId = ? ";
	   
	   String Customer_OrderNumber="UPDATE VendorTable SET orderNumber = ? where vendorId = ? and companyId= ? ";
		
	   String PurchaseInvoice_Report="SELECT purchaseId,invoiceNo,date,vendorName,contactNo,finalAmountTotal,subtotal1,payment_status,shipping,vendorId,companyName from PurchaseInvoiceTable  WHERE companyId= ? and  Status = '0' and invoiceNo = ? limit 1";

	   String SELECT_GST_INV = "SELECT  DISTINCT(invoiceNo) FROM $tableName WHERE Status = '0' and companyId=? ";

	   String GET_EMAIL_ID = "SELECT Email FROM VendorTable WHERE contactNo = ? and status= '0' ";
	   
	   String ven_Statement_Insert="insert into VendorStatement(invoiceNo,pay,discount,dueAmount,date,vendorName,balanceAmt,vendorId,companyId) VALUES(?,?,?,?,?,?,?,?,?)"; 
		
	   
}
