package master;

public interface QueryConstants {
	
    String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";
	
	String DB_LOOKUP_NAME = "MySqlERPDS";
	
	String Customer_Insert ="insert into CustomerTable(customerName,companyName,address,city,contactNo,alternatecontactNo,gstNo,email,companyId) VALUES(?,?,?,?,?,?,?,?,?)";
	
	String Customer_Report ="SELECT customerId,customerName,companyName,address,contactNo,city,alternatecontactNo,gstNo,email from CustomerTable where companyId= ? and status= '0'  ";
	
	String Vendor_Insert ="insert into VendorTable(vendorName,companyName,address,city,contactNo,alternatecontactNo,gstNo,email,companyId) VALUES(?,?,?,?,?,?,?,?,?)";
	
	String Vendor_Report ="SELECT vendorId,vendorName,companyName,address,contactNo,city,alternatecontactNo,gstNo,email  from VendorTable  where companyId= ? and  status= '0' ";
	
	String Product_Insert ="insert into ProductTable(productName,unit,cgst,sgst,igst,hsnCode,description,productCategory,individualRate,dealerRate,companyId) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
	
	String Sale_Product_Report ="SELECT productId,productName,unit,cgst,sgst,igst,hsnCode,individualRate,dealerRate,productCategory,description from ProductTable where productCategory='sale' and companyId= ? and status= '0' ";
	
	String Purchase_Product_Report ="SELECT productId,productName,unit,cgst,sgst,igst,hsnCode,individualRate,dealerRate,productCategory,description from ProductTable where productCategory='purchase' and companyId= ? and status= '0' ";

    String CUS_VERIFY_MOBILENO="SELECT contactNo FROM CustomerTable where contactNo = ? and status='0' and companyId= ? ";
    
    String CUS_VERIFY_MAIL="SELECT email FROM CustomerTable where email = ? and status='0'";
    
    String Ven_VERIFY_MOBILENO="SELECT contactNo FROM VendorTable where contactNo = ? and status='0' and companyId= ? ";
    
    String Ven_VERIFY_MAIL="SELECT email FROM VendorTable where email = ? and status='0'";
    
    String VERIFY_ProductName="SELECT productName FROM ProductTable where productName = ? and productCategory=? and status='0' and companyId= ? ";

    String DELETE_CUSTOMER = "UPDATE CustomerTable SET Status ='1' WHERE contactNo = ? and companyId= ? ";
    
    String DELETE_VENDOR = "UPDATE VendorTable SET Status ='1' WHERE contactNo = ? and companyId= ? ";
    
    String DELETE_SALE_PRODUCT = "UPDATE ProductTable SET Status ='1' WHERE productName = ? and productCategory= ? and companyId= ?";
    
    String DELETE_PURCHASE_PRODUCT = "UPDATE ProductTable SET Status ='1' WHERE productName = ? and productCategory=? and companyId= ?";
  
    String CustomerList_UPDATE="UPDATE CustomerTable SET companyName = ?,address=?,city=?,contactNo=?,alternateContactNo=?,gstNo=?,email=? WHERE  customerId = ? AND contactNo = ?  AND companyId= ?";

    String VendorList_UPDATE="UPDATE VendorTable SET companyName = ?,address=?,city=?,contactNo=?,alternateContactNo=?,gstNo=?,email=? WHERE vendorId = ? AND contactNo = ? AND companyId= ? ";

    String ProductList_UPDATE="UPDATE ProductTable SET unit = ?,cgst=?,sgst=?,igst=?,hsnCode=?,individualRate=?,dealerRate=?,description=?,productCategory=? WHERE productId = ? and companyId= ?";

}

