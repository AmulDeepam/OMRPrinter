package quotation;

public interface QueryConstants {
	
	  String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";
		
	   String DB_LOOKUP_NAME = "MySqlERPDS";
	   
	   String Select_Customer_Name ="SELECT customerName,orderNumber,customerId,contactNo,eorderNumber,address,companyName from CustomerTable where status='0' and companyId= ?";
	   
	   String Select_Product_Name_Rate="SELECT productName,description,individualRate,dealerRate,cgst,sgst,igst,unit from ProductTable  where productCategory='sale' and status='0' and companyId= ? ";
		
	   String GSTQuotation_Insert="insert into GSTQuotationTable(customerName,invoiceNo,invoiceDate,dueDate,saleType,productName,description,height,width,size,rate,amount,quantity,total,cgsta,sgsta,igsta,finalAmount,date,contactNo,address,totalcgst,totalsgst,totaligst,totalitemqty,subtotal1,totalgst,adjustment,discount,finalAmountTotal,payment_status,unit,shipping,companyId,companyName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	   	
	   String GSTQuotation_Insert_SELECT="SELECT MAX(invoiceNo) as invoiceNo FROM GSTQuotationTable where companyId= ?";	  
		
	   String WithoutGSTQuotation_Insert_SELECT="SELECT MAX(invoiceNo) as invoiceNo FROM WithoutGSTQuotationTable where companyId= ?";
	
	   String WithoutGSTQuotation_Insert="insert into WithoutGSTQuotationTable(customerName,invoiceNo,invoiceDate,dueDate,saleType,productName,description,height,width,size,rate,amount,quantity,total,date,contactNo,address,totalitemqty,subtotal1,adjustment,discount,finalAmountTotal,payment_status,unit,shipping,companyId,companyName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	  
	   String GSTQuotation_Report="SELECT gstQuotationId,invoiceNo,date,customerName,contactNo,address,totalgst,subtotal1,payment_status,finalAmountTotal,shipping,companyName FROM GSTQuotationTable WHERE companyId= ? and  invoiceNo = ? limit 1";

	   String WithoutGSTQuotation_Report="SELECT withoutGstQuotationId,invoiceNo,date,customerName,contactNo,address,subtotal1,payment_status,finalAmountTotal,shipping,companyName FROM WithoutGSTQuotationTable WHERE companyId= ? and  invoiceNo = ? limit 1";
     
	   String SELECT_GST_INV = "SELECT  DISTINCT(invoiceNo) FROM $tableName WHERE Status = '0' and companyId= ? ";
	   
	   String GET_EMAIL_ID = "SELECT Email FROM CustomerTable WHERE contactNo = ? and status='0' ";
}
