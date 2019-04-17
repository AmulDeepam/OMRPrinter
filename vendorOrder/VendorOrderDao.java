package vendorOrder;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import DBUtil.DatabaseUtil;






public class VendorOrderDao {

	public VendorOrderJSON selectvendor(VendorOrderJSON json) {
		System.out.println("inside dao.......");
		ArrayList<VendorOrderJSON> selectvendornamelist = new ArrayList<VendorOrderJSON>();	
		VendorOrderJSON res=new VendorOrderJSON();
	
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();	
			
			
			String querySelect=QueryConstants.Select_Vendor_Name;
			System.out.println("vendor name name...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			//preparedStmt.setString(1,json.getProductCategory());	
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	VendorOrderJSON selectvendorNameobj = new VendorOrderJSON();
	        	selectvendorNameobj.setVendorName(rs.getString("vendorName"));	
	        	selectvendorNameobj.setOrderNumber(rs.getInt("orderNumber"));
	        	selectvendorNameobj.setVendorId(rs.getInt("vendorId"));
	        	selectvendorNameobj.setContactNo(rs.getString("contactNo"));
	        	selectvendorNameobj.setCompanyName(rs.getString("companyName"));
	        	selectvendornamelist.add(selectvendorNameobj);
	        }
			
	        System.out.println("list length...."+selectvendornamelist.size());     
	        res.setSelectvendornamelist(selectvendornamelist);
	        
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

	public VendorOrderJSON selectindividualsaleproduct(VendorOrderJSON json) {
		System.out.println("inside dao.......");
		ArrayList<VendorOrderJSON> selectindividualsaleproductlist = new ArrayList<VendorOrderJSON>();	
		VendorOrderJSON res=new VendorOrderJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.Select_Product_Name_Rate;
			System.out.println("product name...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
		  preparedStmt.setString(1,json.getCompanyId());	
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	VendorOrderJSON selectindividualsaleproductobj = new VendorOrderJSON();
	        	selectindividualsaleproductobj.setProductName(rs.getString("productName"));
	        	selectindividualsaleproductobj.setDescription(rs.getString("description"));
	        	selectindividualsaleproductobj.setIndividualRate(rs.getString("individualRate"));
	        	selectindividualsaleproductobj.setDealerRate(rs.getString("dealerRate"));
	        	selectindividualsaleproductobj.setCgst(rs.getString("cgst"));
	        	selectindividualsaleproductobj.setSgst(rs.getString("sgst"));
	        	selectindividualsaleproductobj.setIgst(rs.getString("igst"));
	        	selectindividualsaleproductobj.setUnit(rs.getString("unit"));
	        	selectindividualsaleproductlist.add(selectindividualsaleproductobj);
	        }
	        System.out.println("list length...."+selectindividualsaleproductlist.size());     
	        res.setSelectindividualsaleproductlist(selectindividualsaleproductlist);
	        
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


	
	public VendorOrderJSON addpurchaseorder(VendorOrderJSON json) {
		ArrayList<VendorOrderJSON> productdatalist = new ArrayList<VendorOrderJSON>();	
		ArrayList<VendorOrderJSON> arrdatalist = new ArrayList<VendorOrderJSON>();	
		 
		Connection connection=null;
		String invoiceData=null;
		String productName=null;
		String size=null;
		String rate=null;
		String amount=null;
		String quantity=null;
		String total=null;
		String cgst=null;
		String sgst=null;
		String igst=null;
		String finalAmount=null;
		String unit=null;
		String  height="0";
		String width="0";
		String description="-";
		String pay="0";
		String invoiceNumber="";
		int subtotalwithshippingadjustment=0;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect1=QueryConstants.Customer_OrderNumber;
					PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
					preparedStmt1.setInt(1,json.getOrderNumber());	
					preparedStmt1.setInt(2,json.getVendorId());	
					preparedStmt1.setString(3,json.getCompanyId());	
					preparedStmt1.executeUpdate();
					System.out.println("going to insert data into vendor statement table.......");
					int subtotal = Integer.parseInt(json.getSubtotal1());	
					int shipping = Integer.parseInt(json.getShipping());	
					int adjustment = Integer.parseInt(json.getAdjustment());	
					subtotalwithshippingadjustment=subtotal+shipping+adjustment;
					String querySelect2=QueryConstants.ven_Statement_Insert;
					PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
					preparedStmt2.setString(1,json.getInvoiceNo());
					preparedStmt2.setString(2,pay);
					preparedStmt2.setString(3,json.getDiscount());
					preparedStmt2.setInt(4,subtotalwithshippingadjustment);				
					preparedStmt2.setString(5,json.getDate());
					preparedStmt2.setString(6,json.getVendorName());
					preparedStmt2.setString(7,json.getFinalAmountTotal());				
					preparedStmt2.setInt(8,json.getVendorId());
					preparedStmt2.setString(9,json.getCompanyId());	
					preparedStmt2.executeUpdate();
					invoiceData=json.getInvoiceData();
					System.out.println("going to retrive array data.......");
					  String querySelect3=QueryConstants.SaleOrder_Insert_SELECT;
						PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
						
						preparedStmt3.setString(1,json.getCompanyId());
						ResultSet rs=preparedStmt3.executeQuery();
						while(rs.next()) {
						if(rs.getString("invoiceNo")!=null) {
							System.out.println("inside if");
						   invoiceNumber = rs.getString("invoiceNo");
						   
						}else {
							invoiceNumber="PO-0";
							System.out.println("Inside Else"+invoiceNumber);
						}
						}
						String[] data = invoiceNumber.split("-");
						System.out.println("number = "+data[1]);
						
						System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
						int result = Integer.parseInt(data[1]);	
						int invoiceNumber1= result + 1;
						String invoiceNo = String.format("PO-%s", invoiceNumber1);
					//	VendorOrderJSON selectInvoiceNoObj = new VendorOrderJSON();
						json.setInvoiceNo(invoiceNo);
						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceData.split(","));
							for(int i=0;i<aList.size();i=i+14)
							{
							System.out.println("data for the invoice in list is............"+aList.get(i));
											
							productName=aList.get(i);
							size=aList.get(i+1);
							unit=aList.get(i+2);
							rate=aList.get(i+3);
							amount=aList.get(i+4);
							quantity=aList.get(i+5);
							total=aList.get(i+6);
							cgst=aList.get(i+7);
							sgst=aList.get(i+8);
							igst=aList.get(i+9);
							finalAmount=aList.get(i+10);
							height=aList.get(i+11);
							width=aList.get(i+12);
							description=aList.get(i+13);
							System.out.println("going to insert data into table.......");
							String querySelect=QueryConstants.PurchaseOrder_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getVendorName());
							preparedStmt.setString(2,invoiceNo);
							preparedStmt.setInt(3,json.getOrderNumber());
							preparedStmt.setString(4,json.getInvoiceDate());
							preparedStmt.setString(5,json.getDueDate());
							preparedStmt.setString(6,json.getSaleType());
							preparedStmt.setString(7,productName);
							preparedStmt.setString(8,description);
							preparedStmt.setString(9,height);
							preparedStmt.setString(10,width);
							preparedStmt.setString(11,size);
							preparedStmt.setString(12,rate);
							preparedStmt.setString(13,amount);
							preparedStmt.setString(14,quantity);
							preparedStmt.setString(15,total);
							preparedStmt.setString(16,cgst);
							preparedStmt.setString(17,sgst);
							preparedStmt.setString(18,igst);
							preparedStmt.setString(19,finalAmount);
							preparedStmt.setString(20,json.getDate());
							preparedStmt.setString(21,json.getContactNo());
							preparedStmt.setString(22,json.getTotalcgst());
							preparedStmt.setString(23,json.getTotalsgst());
							preparedStmt.setString(24,json.getTotaligst());
							preparedStmt.setString(25,json.getTotalitemqty());
							preparedStmt.setString(26,json.getSubtotal1());
							preparedStmt.setString(27,json.getTotalgst());					
							preparedStmt.setString(28,json.getAdjustment());
							preparedStmt.setString(29,json.getDiscount());
							preparedStmt.setString(30,json.getFinalAmountTotal());
							preparedStmt.setString(31,json.getShipping());
							preparedStmt.setString(32, json.getPayment_status());
							preparedStmt.setString(33, unit);
							preparedStmt.setInt(34, json.getVendorId());
							preparedStmt.setString(35, json.getCompanyId());
							preparedStmt.setString(36, json.getCompanyName());
							preparedStmt.executeUpdate();
							System.out.println("completed adding purchase invoice returing to webservice............");	
							
							}
							
						}
					
					
					connection.close();     
					
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

	public VendorOrderJSON selectinvoiceNo(VendorOrderJSON json) {
		   
				String invoiceNumber="";
				
				System.out.println("inside dao.......");
				ArrayList<VendorOrderJSON> selectInvoiceNoList = new ArrayList<VendorOrderJSON>();
				VendorOrderJSON res=new VendorOrderJSON();
				Connection connection=null;
				try {
					
					connection =DatabaseUtil.getDBConnection();	
		            String querySelect1=QueryConstants.SaleOrder_Insert_SELECT;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					
					preparedStmt1.setString(1,json.getCompanyId());
					ResultSet rs=preparedStmt1.executeQuery();
					while(rs.next()) {
					if(rs.getString("invoiceNo")!=null) {
						System.out.println("inside if");
					   invoiceNumber = rs.getString("invoiceNo");
					   
					}else {
						invoiceNumber="PO-0";
						System.out.println("Inside Else"+invoiceNumber);
					}
					}
					String[] data = invoiceNumber.split("-");
					System.out.println("number = "+data[1]);
					
					System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
					int result = Integer.parseInt(data[1]);	
					int invoiceNumber1= result + 1;
					String invoiceNo = String.format("PO-%s", invoiceNumber1);
					VendorOrderJSON selectInvoiceNoObj = new VendorOrderJSON();
					selectInvoiceNoObj.setInvoiceNo(invoiceNo);
					selectInvoiceNoList.add(selectInvoiceNoObj);
					 res.setSelectInvoiceNoList(selectInvoiceNoList);
			        
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
	public VendorOrderJSON purchaseinvoicereport(VendorOrderJSON json) {
		ArrayList<VendorOrderJSON> purchaseinvoicereportlist = new ArrayList<VendorOrderJSON>();	
		VendorOrderJSON res=new VendorOrderJSON();
		List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			String querySelect1=QueryConstants.SELECT_GST_INV.replace("$tableName","PurchaseInvoiceTable");
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}
			
			
			for(int i=0;i<invList.size();i++) {
			String querySelect=QueryConstants.PurchaseInvoice_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.setString(2,invList.get(i));			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	VendorOrderJSON purchaseinvoicereportobj = new VendorOrderJSON();
	        	purchaseinvoicereportobj.setPurchaseId(rs.getString("purchaseId"));
	        	purchaseinvoicereportobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	purchaseinvoicereportobj.setDate(rs.getString("date"));
	        	purchaseinvoicereportobj.setVendorName(rs.getString("vendorName"));
	        	purchaseinvoicereportobj.setContactNo(rs.getString("contactNo"));	 
	        	purchaseinvoicereportobj.setFinalAmountTotal(rs.getString("finalAmountTotal"));
	        	purchaseinvoicereportobj.setSubtotal1(rs.getString("subtotal1"));
	        	purchaseinvoicereportobj.setPayment_status(rs.getString("payment_status"));
	        	purchaseinvoicereportobj.setShipping(rs.getString("shipping"));
	        	purchaseinvoicereportobj.setVendorId(rs.getInt("vendorId"));
	        	purchaseinvoicereportobj.setCompanyName(rs.getString("companyName"));
	        	purchaseinvoicereportlist.add(purchaseinvoicereportobj);
	        }
			}
	        System.out.println("list length...."+purchaseinvoicereportlist.size());	       
	        
	        res.setPurchaseinvoicereportlist(purchaseinvoicereportlist);
	        
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
	
	public static String GetEmailId(String contactNo) {
		VendorOrderJSON res=new VendorOrderJSON();
		Connection connection=null;
		String emailId = null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
	       
			String querySelect=QueryConstants.GET_EMAIL_ID;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,contactNo);	
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	emailId=rs.getString("Email");
	        }
	        System.out.println("inside getemailid func...."+emailId);	   
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return emailId;
		
	}

}
