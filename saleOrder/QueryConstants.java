package saleOrder;

public interface QueryConstants {
	   String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";
		
	   String DB_LOOKUP_NAME = "MySqlERPDS";
	   
	   String Select_Customer_Name ="SELECT customerName,orderNumber,customerId,contactNo,eorderNumber,address,gstNo,email,companyName from CustomerTable where status='0' and companyId= ? ";
	   
	   String Select_Product_Name_Rate="SELECT productName,description,individualRate,dealerRate,cgst,sgst,igst,unit from ProductTable  where productCategory='sale' and status='0'  and companyId= ?  ";
		
	   String SaleOrder_Insert="insert into SaleInvoiceTable(customerName,invoiceNo,orderNumber,invoiceDate,dueDate,saleType,productName,description,height,width,size,rate,amount,quantity,total,cgsta,sgsta,igsta,finalAmount,date,contactNo,totalcgst,totalsgst,totaligst,totalitemqty,subtotal1,totalgst,advance,discount,balance_amount,payment_status,unit,address,gstNo,email,customerId,companyId,companyName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	   	
	//   String SaleOrder_Insert_SELECT="SELECT MAX(invoiceNo) as invoiceNo FROM SaleInvoiceTable where companyId = ? ";
	   
	  // String SaleOrder_Insert_SELECT="SELECT MAX(invoiceNo) as invoiceNo, MAX(CAST(SUBSTRING(invoiceNo, 5, length(invoiceNo)-4) AS UNSIGNED)) as data FROM SaleInvoiceTable where companyId=? ";
	   
	   
	   String SaleOrder_Insert_SELECT="   SELECT CONCAT('INV-',MAX(CAST(SUBSTRING(invoiceNo, 5, length(invoiceNo)-4) AS UNSIGNED))) as invoiceNo FROM SaleInvoiceTable where companyId=? ";
	   String Customer_OrderNumber="UPDATE CustomerTable SET orderNumber = ? where customerId = ? and companyId= ? ";
		
	 //  String EstimateOrder_Insert_SELECT="SELECT MAX(invoiceNo) as invoiceNo FROM EstimateInvoiceTable  where companyId = ? ";
	   
	   String EstimateOrder_Insert_SELECT="  SELECT CONCAT('EST-',MAX(CAST(SUBSTRING(invoiceNo, 5, length(invoiceNo)-4) AS UNSIGNED))) as invoiceNo FROM EstimateInvoiceTable where companyId=? ";
	   
	   String Customer_EOrderNumber="UPDATE CustomerTable SET eorderNumber = ? where customerId = ? and companyId= ? ";	   

	   String EstimateOrder_Insert="insert into EstimateInvoiceTable(customerName,invoiceNo,orderNumber,invoiceDate,dueDate,saleType,productName,description,height,width,size,rate,amount,quantity,total,date,contactNo,totalitemqty,subtotal1,advance,discount,balance_amount,payment_status,unit,customerId,companyId,companyName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	  
	   String SaleInvoice_Report ="SELECT saleInvoiceId,invoiceNo,date,customerName,contactNo,balance_amount,subtotal1,payment_status,advance,companyName from SaleInvoiceTable  WHERE companyId= ? and invoiceNo = ? limit 1  ";
		
	   String EstimateInvoice_Report ="SELECT estimateId,invoiceNo,date,customerName,contactNo,balance_amount,subtotal1,payment_status,advance,companyName from EstimateInvoiceTable  WHERE  companyId= ? and  invoiceNo = ? limit 1 ";

	   String SELECT_GST_INV = "SELECT  DISTINCT(invoiceNo) FROM $tableName WHERE Status = '0' and companyId= ? ";
	   
	   String GET_EMAIL_ID = "SELECT Email FROM CustomerTable WHERE contactNo = ?  and companyId= ? and status='0'";
	   
	   String Cus_Statement_Insert="insert into CustomerStatement(invoiceNo,pay,discount,dueAmount,date,userName,balanceAmt,address,gstNo,email,customerId,companyId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"; 
		
	   String Est_Statement_Insert="insert into EstimateStatement(invoiceNo,pay,discount,dueAmount,date,userName,balanceAmt,address,gstNo,email,customerId,companyId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"; 
		
}
