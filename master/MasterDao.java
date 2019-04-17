package master;

import java.sql.Connection;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;



import DBUtil.DatabaseUtil;
import master.QueryConstants;
import report.expense.ExpenseReportJSON;


public class MasterDao {

	public MasterJSON addcustomer(MasterJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String mobileNo=null;
		String email=null;
		try {

		       connection = DatabaseUtil.getDBConnection();
		 
            String querySelect01=QueryConstants.CUS_VERIFY_MOBILENO;			
			PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
			preparedStmt01.setString(1,json.getContactNo());		
			preparedStmt01.setString(2,json.getCompanyId());	
			ResultSet rs01=preparedStmt01.executeQuery();			
			while(rs01.next()) {
				mobileNo = rs01.getString("contactNo");
				System.out.print("MobileNo Already exits "+mobileNo );
				
			}
			email=json.getEmail();
			
			if(email==null)
			{
				email=" ";
				
			}
			else {
				email=json.getEmail();
			}
			
			if(mobileNo==null) {
					String querySelect=QueryConstants.Customer_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getCustomerName());
					preparedStmt.setString(2,json.getCompanyName());
					preparedStmt.setString(3,json.getAddress());
					preparedStmt.setString(4,json.getCity());
					preparedStmt.setString(5,json.getContactNo());
					preparedStmt.setString(6,json.getAlternateContactNo());
					preparedStmt.setString(7,json.getGstNo());
					preparedStmt.setString(8,email);
					preparedStmt.setString(9,json.getCompanyId());
					preparedStmt.executeUpdate();
					System.out.println("completed adding customer returing to webservice............");			connection.close();     
			}else if(mobileNo!=null){
				json.setContactNo("Mobile");
				System.out.print("MobileNo Already exits");
				
			}
					}
					catch (SQLException e)
		        {
		        e.printStackTrace();
		        }
		         	
			   finally {
				   DatabaseUtil.closeConnection(connection);
			}
				return json;
		
	}

	public MasterJSON customerReport(MasterJSON json) {
	  	ArrayList<MasterJSON> customerRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		
		String companyName="-";
		String address="-";
		
		try {
			
			connection =DatabaseUtil.getDBConnection();
			System.out.println("inside Customer Report...."); 
		      System.out.println("companyID...."+json.getCompanyId()); 
			String querySelect=QueryConstants.Customer_Report;				
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());		
	        ResultSet rs=preparedStmt.executeQuery();
	     
	        while(rs.next())
	        {
	        	MasterJSON customerRetrieveobj = new MasterJSON();
	        	customerRetrieveobj.setCustomerId(rs.getString("customerId"));
	        	customerRetrieveobj.setCustomerName(rs.getString("customerName"));
	        	customerRetrieveobj.setCompanyName(rs.getString("companyName"));
	        	customerRetrieveobj.setAddress(rs.getString("address"));
	        	customerRetrieveobj.setContactNo(rs.getString("contactNo"));	        	
	         	customerRetrieveobj.setCity(rs.getString("city"));	        	
	         	customerRetrieveobj.setAlternateContactNo(rs.getString("alternatecontactNo"));	        	
	         	customerRetrieveobj.setGstNo(rs.getString("gstNo"));	        	
	        	customerRetrieveobj.setEmail(rs.getString("email"));	        	
		  	    
	        	
	        	customerRetrievelist.add(customerRetrieveobj);
	        }
	        System.out.println("list length...."+customerRetrievelist.size());	       
	        
	        res.setCustomerRetrievelist(customerRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
		
		
	}

	public MasterJSON addvendor(MasterJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String mobileNo=null;
		String email=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
				  
			       String querySelect01=QueryConstants.Ven_VERIFY_MOBILENO;			
					PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
					preparedStmt01.setString(1,json.getContactNo());	
					preparedStmt01.setString(2,json.getCompanyId());
					ResultSet rs01=preparedStmt01.executeQuery();			
					while(rs01.next()) {
						mobileNo = rs01.getString("contactNo");
						System.out.print("MobileNo Already exits "+mobileNo );
						
					}
					email=json.getEmail();
					
					if(email==null)
					{
						email=" ";
						
					}
					else {
						email=json.getEmail();
					}
					if(mobileNo==null) {
					String querySelect=QueryConstants.Vendor_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getVendorName());
					preparedStmt.setString(2,json.getCompanyName());
					preparedStmt.setString(3,json.getAddress());
					preparedStmt.setString(4,json.getCity());
					preparedStmt.setString(5,json.getContactNo());
					preparedStmt.setString(6,json.getAlternateContactNo());
					preparedStmt.setString(7,json.getGstNo());
					preparedStmt.setString(8,email);
					preparedStmt.setString(9,json.getCompanyId());
					preparedStmt.executeUpdate();
					System.out.println("completed adding vendor returing to webservice............");			connection.close();     
					}
					else if(mobileNo!=null){
						json.setContactNo("Mobile");
						System.out.print("MobileNo Already exits");
						
					}
					
						
					}
					catch (SQLException e)
		        {
		        e.printStackTrace();
		        }
		         	
			   finally {
				   DatabaseUtil.closeConnection(connection);
			}
				return json;
		
		
		
	}

	public MasterJSON vendorReport(MasterJSON json) {
		// TODO Auto-generated method stub	
		ArrayList<MasterJSON> vendorRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Vendor_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());				
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	MasterJSON vendorRetrieveobj = new MasterJSON();
	        	vendorRetrieveobj.setVendorId(rs.getString("vendorId"));
	        	vendorRetrieveobj.setVendorName(rs.getString("vendorName"));
	        	vendorRetrieveobj.setCompanyName(rs.getString("companyName"));
	        	vendorRetrieveobj.setAddress(rs.getString("address"));
	        	vendorRetrieveobj.setContactNo(rs.getString("contactNo"));	 
	        	
	        	vendorRetrieveobj.setCity(rs.getString("city"));	        	
	        	vendorRetrieveobj.setAlternateContactNo(rs.getString("alternatecontactNo"));	        	
	        	vendorRetrieveobj.setGstNo(rs.getString("gstNo"));	        	
	        	vendorRetrieveobj.setEmail(rs.getString("email"));
	        	vendorRetrievelist.add(vendorRetrieveobj);
	        }
	        System.out.println("list length...."+vendorRetrievelist.size());	       
	        
	        res.setVendorRetrievelist(vendorRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
		
	}

	public MasterJSON addproduct(MasterJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String ProductName=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
				   	String querySelect0=QueryConstants.VERIFY_ProductName;
								PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
								preparedStmt0.setString(1,json.getProductName());
								preparedStmt0.setString(2,json.getProductCategory());
								preparedStmt0.setString(3,json.getCompanyId());
								ResultSet rs0=preparedStmt0.executeQuery();
								
								while(rs0.next()) {
									ProductName=rs0.getString("productName");
									System.out.print("productName Already exits "+ProductName );
									
									
								}
								if(ProductName==null) {
					String querySelect=QueryConstants.Product_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getProductName());
					preparedStmt.setString(2,json.getUnit());
					preparedStmt.setString(3,json.getCgst());
					preparedStmt.setString(4,json.getSgst());
					preparedStmt.setString(5,json.getIgst());
					preparedStmt.setString(6,json.getHsnCode());
					preparedStmt.setString(7,json.getDescription());
					preparedStmt.setString(8,json.getProductCategory());
					preparedStmt.setString(9,json.getIndividualRate());
					preparedStmt.setString(10,json.getDealerRate());
					preparedStmt.setString(11,json.getCompanyId());
					preparedStmt.executeUpdate();
					System.out.println("completed adding product returing to webservice............");			connection.close();     
								}
								else if(ProductName!=null){
									json.setProductName("ProductName");
									System.out.print("ProductName Already exits");
									
								}
					}
					catch (SQLException e)
		        {
		        e.printStackTrace();
		        }
		         	
			   finally {
				   DatabaseUtil.closeConnection(connection);
			}
				return json;
		
		
		
		
	}

	public MasterJSON saleproductReport(MasterJSON json) {
		ArrayList<MasterJSON> saleProductRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Sale_Product_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());				
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	MasterJSON saleProductRetrieveobj = new MasterJSON();
	        	saleProductRetrieveobj.setProductId(rs.getString("productId"));
	        	saleProductRetrieveobj.setProductName(rs.getString("productName"));
	        	saleProductRetrieveobj.setUnit(rs.getString("unit"));
	        	saleProductRetrieveobj.setCgst(rs.getString("cgst"));
	        	saleProductRetrieveobj.setSgst(rs.getString("sgst"));
	        	saleProductRetrieveobj.setIgst(rs.getString("igst"));
	        	saleProductRetrieveobj.setHsnCode(rs.getString("hsnCode"));
	        	saleProductRetrieveobj.setIndividualRate(rs.getString("individualRate"));
	        	saleProductRetrieveobj.setDealerRate(rs.getString("dealerRate"));	
	        	saleProductRetrieveobj.setProductCategory(rs.getString("productCategory"));
	        	saleProductRetrieveobj.setDescription(rs.getString("description"));
	        	saleProductRetrievelist.add(saleProductRetrieveobj);
	        }
	        System.out.println("list length...."+saleProductRetrievelist.size());	       
	        
	        res.setSaleProductRetrievelist(saleProductRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
	}

	public MasterJSON purchaseproductReport(MasterJSON json) {
		ArrayList<MasterJSON> purchaseProductRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Purchase_Product_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			preparedStmt.setString(1,json.getCompanyId());		
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	MasterJSON purchaseProductRetrieveobj = new MasterJSON();
	        	purchaseProductRetrieveobj.setProductId(rs.getString("productId"));
	        	purchaseProductRetrieveobj.setProductName(rs.getString("productName"));
	        	purchaseProductRetrieveobj.setUnit(rs.getString("unit"));
	        	purchaseProductRetrieveobj.setCgst(rs.getString("cgst"));
	        	purchaseProductRetrieveobj.setSgst(rs.getString("sgst"));
	        	purchaseProductRetrieveobj.setIgst(rs.getString("igst"));
	        	purchaseProductRetrieveobj.setHsnCode(rs.getString("hsnCode"));
	        	purchaseProductRetrieveobj.setIndividualRate(rs.getString("individualRate"));
	        	purchaseProductRetrieveobj.setDealerRate(rs.getString("dealerRate"));
	        	purchaseProductRetrieveobj.setProductCategory(rs.getString("productCategory"));	
	        	purchaseProductRetrieveobj.setDescription(rs.getString("description"));
	        	purchaseProductRetrievelist.add(purchaseProductRetrieveobj);
	        }
	        System.out.println("list length...."+purchaseProductRetrievelist.size());     
	        
	        res.setPurchaseProductRetrievelist(purchaseProductRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
	}

	public MasterJSON deletecustomer(MasterJSON json) {
		Connection connection=null;

		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_CUSTOMER;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getContactNo());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	public MasterJSON deletevendor(MasterJSON json) {
	Connection connection=null;

		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_VENDOR;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getContactNo());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
		
	}

	public MasterJSON deletesaleproduct(MasterJSON json) {
       Connection connection=null;

	try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_SALE_PRODUCT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getProductName());
			preparedStmt.setString(2,json.getProductCategory());
			preparedStmt.setString(3,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;	
		
	
	}

	public MasterJSON deletepurchaseproduct(MasterJSON json) {
		  Connection connection=null;

			try {
					connection=DatabaseUtil.getDBConnection();
					
					String querySelect=QueryConstants.DELETE_PURCHASE_PRODUCT;
					PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getProductName());
					preparedStmt.setString(2,json.getProductCategory());
					preparedStmt.setString(3,json.getCompanyId());
					//preparedStmt.setString(2,json.getDate());
					preparedStmt.executeUpdate();
					connection.close(); 
				}
				catch (Exception e) {
						e.printStackTrace();
				} finally {
						
					
				}
				return json;
	}

public MasterJSON updatecustomer(MasterJSON json) {
		Connection connection=null;
		ArrayList <MasterJSON> CustomerList=new ArrayList <MasterJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
		//	expenseId = ? , CategoryName = ? ,Username = ? , " +"Amount = ? , Date = ?
			System.out.println("inside update customer....");  
			String querySelect=QueryConstants.CustomerList_UPDATE;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyName());
			preparedStmt.setString(2,json.getAddress());
			preparedStmt.setString(3,json.getCity());
			preparedStmt.setString(4,json.getContactNo());
			preparedStmt.setString(5,json.getAlternateContactNo());
			preparedStmt.setString(6,json.getGstNo());
			preparedStmt.setString(7,json.getEmail());			
			preparedStmt.setString(8,json.getCustomerId());		
			preparedStmt.setString(9,json.getOldContactNo());		
			preparedStmt.setString(10,json.getCompanyId());
			preparedStmt.executeUpdate();
			
			System.out.println("updated customer...."+json.getCompanyName()); 
			System.out.println("updated customer...."+json.getAddress()); 
			System.out.println("updated customer...."+json.getCity()); 
			System.out.println("updated customer...."+json.getContactNo()); 
			System.out.println("updated customer...."+json.getAlternateContactNo()); 
			System.out.println("updated customer...."+json.getGstNo()); 
			System.out.println("updated customer...."+json.getEmail()); 
			System.out.println("for where ....");
			
			System.out.println("updated customer...."+json.getCustomerId()); 
			System.out.println("updated customer...."+json.getOldCompanyName()); 
			System.out.println("updated customer...."+json.getOldAddress()); 
			System.out.println("updated customer...."+json.getOldCity()); 
			System.out.println("updated customer...."+json.getOldContactNo()); 
			System.out.println("updated customer...."+json.getOldGstNo()); 
			System.out.println("updated customer...."+json.getOldAlternateContactNo());
			System.out.println("updated customer...."+json.getOldEmail()); 
			System.out.println("updated customer...."+json.getCompanyId());
			
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

public MasterJSON updatevendor(MasterJSON json) {
	Connection connection=null;
	ArrayList <MasterJSON> CustomerList=new ArrayList <MasterJSON>();
	
	
	try {
		connection=DatabaseUtil.getDBConnection();
	//	expenseId = ? , CategoryName = ? ,Username = ? , " +"Amount = ? , Date = ?
		System.out.println("inside update vendor....");  
		String querySelect=QueryConstants.VendorList_UPDATE;
		PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
		preparedStmt.setString(1,json.getCompanyName());
		preparedStmt.setString(2,json.getAddress());
		preparedStmt.setString(3,json.getCity());
		preparedStmt.setString(4,json.getContactNo());
		preparedStmt.setString(5,json.getAlternateContactNo());
		preparedStmt.setString(6,json.getGstNo());
		preparedStmt.setString(7,json.getEmail());			
		preparedStmt.setString(8,json.getVendorId());		
		preparedStmt.setString(9,json.getOldContactNo());
		preparedStmt.setString(10,json.getCompanyId());
		preparedStmt.executeUpdate();
		
		System.out.println("updated vendor...."+json.getCompanyName()); 
		System.out.println("updated vendor...."+json.getAddress()); 
		System.out.println("updated vendor...."+json.getCity()); 
		System.out.println("updated vendor...."+json.getContactNo()); 
		System.out.println("updated vendor...."+json.getAlternateContactNo()); 
		System.out.println("updated vendor...."+json.getGstNo()); 
		System.out.println("updated vendor...."+json.getEmail()); 
		System.out.println("updated vendor...."+json.getVendorId()); 
		
		
		
		
		connection.close(); 
	}
	catch (Exception e) {
			e.printStackTrace();
	} finally {
			
		
	}
	return json;
}

public MasterJSON updateproduct(MasterJSON json) {
	Connection connection=null;
	ArrayList <MasterJSON> CustomerList=new ArrayList <MasterJSON>();
	
	
	try {
		connection=DatabaseUtil.getDBConnection();
	//	expenseId = ? , CategoryName = ? ,Username = ? , " +"Amount = ? , Date = ?
		System.out.println("inside update product....");  
		String querySelect=QueryConstants.ProductList_UPDATE;
		PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
		preparedStmt.setString(1,json.getUnit());
		preparedStmt.setString(2,json.getCgst());
		preparedStmt.setString(3,json.getSgst());
		preparedStmt.setString(4,json.getIgst());
		preparedStmt.setString(5,json.getHsnCode());
		preparedStmt.setString(6,json.getIndividualRate());
		preparedStmt.setString(7,json.getDealerRate());			
		preparedStmt.setString(8,json.getDescription());
		preparedStmt.setString(9,json.getProductCategory());
		preparedStmt.setString(10,json.getProductId());			
		preparedStmt.setString(11,json.getCompanyId());
		
		preparedStmt.executeUpdate();
		System.out.println("updated product...."+json.getProductId());
		System.out.println("updated product...."+json.getUnit()); 
		System.out.println("updated product...."+json.getCgst()); 
		System.out.println("updated product...."+json.getSgst()); 
		System.out.println("updated product...."+json.getIgst()); 
		System.out.println("updated product...."+json.getHsnCode()); 
		System.out.println("updated product...."+json.getIndividualRate()); 
		System.out.println("updated product...."+json.getDealerRate()); 
		System.out.println("updated product...."+json.getDescription()); 
		System.out.println("updated product...."+json.getProductCategory());
		
		System.out.println("updated product...."+json.getCompanyId());	
		connection.close(); 
	}
	catch (Exception e) {
			e.printStackTrace();
	} finally {
			
		
	}
	return json;
}



}
