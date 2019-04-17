package saleOrder;

import java.sql.Connection;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import DBUtil.DatabaseUtil;

import saleOrder.SaleOrderJSON;
import saleOrder.QueryConstants;

public class SaleOrderDao {

	public SaleOrderJSON selectCustomer(SaleOrderJSON json) {
		System.out.println("inside dao.......");
		ArrayList<SaleOrderJSON> selectcustomernamelist = new ArrayList<SaleOrderJSON>();	
	  	SaleOrderJSON res=new SaleOrderJSON();
		Connection connection=null;
		String gstNo="-";
		try {
			
			connection =DatabaseUtil.getDBConnection();	
			
			
			String querySelect=QueryConstants.Select_Customer_Name;
			System.out.println("customer name...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			//preparedStmt.setString(1,json.getProductCategory());	
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	SaleOrderJSON selectCustomerNameobj = new SaleOrderJSON();
	        	selectCustomerNameobj.setCustomerName(rs.getString("customerName"));	
	        	selectCustomerNameobj.setOrderNumber(rs.getInt("orderNumber"));
	        	selectCustomerNameobj.setCustomerId(rs.getInt("customerId"));
	        	selectCustomerNameobj.setContactNo(rs.getString("contactNo"));
	        	selectCustomerNameobj.setEorderNumber(rs.getInt("eorderNumber"));
	        	selectCustomerNameobj.setAddress(rs.getString("address"));        	
	        	gstNo=rs.getString("gstNo");
	        	selectCustomerNameobj.setGstNo(gstNo);	        	
	        	selectCustomerNameobj.setEmail(rs.getString("email"));
	        	selectCustomerNameobj.setCompanyName(rs.getString("companyName"));
	        	selectcustomernamelist.add(selectCustomerNameobj);
	        }
	        System.out.println("list length...."+selectcustomernamelist.size());     
	        res.setSelectcustomernamelist(selectcustomernamelist);
	        
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

	public SaleOrderJSON selectindividualsaleproduct(SaleOrderJSON json) {
		System.out.println("inside dao.......");
		ArrayList<SaleOrderJSON> selectindividualsaleproductlist = new ArrayList<SaleOrderJSON>();	
	  	SaleOrderJSON res=new SaleOrderJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.Select_Product_Name_Rate;
			System.out.println("product name...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			//preparedStmt.setString(1,json.getProductCategory());	
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	SaleOrderJSON selectindividualsaleproductobj = new SaleOrderJSON();
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

	public SaleOrderJSON addsaleorder(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> productdatalist = new ArrayList<SaleOrderJSON>();	
		ArrayList<SaleOrderJSON> arrdatalist = new ArrayList<SaleOrderJSON>();	
		ArrayList<SaleOrderJSON> selectInvoiceNoList = new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res=new SaleOrderJSON();
		
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
	
		String invoiceNumber="";
	
		
		
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect1=QueryConstants.Customer_OrderNumber;
					PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
					preparedStmt1.setInt(1,json.getOrderNumber());	
					preparedStmt1.setInt(2,json.getCustomerId());	
					preparedStmt1.setString(3,json.getCompanyId());
					preparedStmt1.executeUpdate();
					System.out.println("customer order number updated.......");
					invoiceData=json.getInvoiceData();
					System.out.println("going to insert data into customer statement table.......");
					String querySelect2=QueryConstants.Cus_Statement_Insert;
					PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
					preparedStmt2.setString(1,json.getInvoiceNo());
					preparedStmt2.setString(2,json.getAdvance());
					preparedStmt2.setString(3,json.getDiscount());
					preparedStmt2.setString(4,json.getSubtotal1());				
					preparedStmt2.setString(5,json.getDate());
					preparedStmt2.setString(6,json.getCustomerName());
					preparedStmt2.setString(7,json.getBalance_amount());
					preparedStmt2.setString(8,json.getAddress());
					preparedStmt2.setString(9,json.getGstNo());
					preparedStmt2.setString(10,json.getEmail());
					preparedStmt2.setInt(11,json.getCustomerId());
					preparedStmt2.setString(12,json.getCompanyId());
					
					preparedStmt2.executeUpdate();
					   String querySelect3=QueryConstants.SaleOrder_Insert_SELECT;
						PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
						preparedStmt3.setString(1,json.getCompanyId());
						ResultSet rs=preparedStmt3.executeQuery();
						while(rs.next()) {
						if(rs.getString("invoiceNo")!=null) {
							System.out.println("inside if");
						   invoiceNumber = rs.getString("invoiceNo");
						  // data=rs.getString("data");

						   
						}else {
							invoiceNumber="INV-0";
							System.out.println("Inside Else"+invoiceNumber);
						}
						}
						String[] data = invoiceNumber.split("-");
						System.out.println("number = "+data[1]);
						
						System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
						int result = Integer.parseInt(data[1]);	
						int invoiceNumber1= result + 1;
						String invoiceNo = String.format("INV-%s",invoiceNumber1);;
					//	SaleOrderJSON selectInvoiceNoObj = new SaleOrderJSON();
						json.setInvoiceNo(invoiceNo);
					
		
			//	String jsonString = res.toString();
				//System.out.println("going to invoiceNo......."+jsonString);
					System.out.println("going to retrive array data.......");
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
						
							System.out.println("going to insert data into sale invoice table.......");
							String querySelect=QueryConstants.SaleOrder_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getCustomerName());
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
							preparedStmt.setString(28,json.getAdvance());
							preparedStmt.setString(29,json.getDiscount());
							preparedStmt.setString(30,json.getBalance_amount());
							preparedStmt.setString(31, json.getPayment_status());	
							preparedStmt.setString(32, unit);
							preparedStmt.setString(33,json.getAddress());
							preparedStmt.setString(34,json.getGstNo());
							preparedStmt.setString(35, json.getEmail());
							preparedStmt.setInt(36, json.getCustomerId());
							preparedStmt.setString(37, json.getCompanyId());
							preparedStmt.setString(38, json.getCompanyName());
							
							
							
							preparedStmt.executeUpdate();
							System.out.println("completed adding sale invoice returing to webservice............");	
							
						
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

	public SaleOrderJSON selectinvoiceNo(SaleOrderJSON json) {		
		   
		String invoiceNumber="";
		//String data="";
		
		System.out.println("inside dao.......");
		ArrayList<SaleOrderJSON> selectInvoiceNoList = new ArrayList<SaleOrderJSON>();
	  	SaleOrderJSON res=new SaleOrderJSON();
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
			  // data=rs.getString("data");

			   
			}else {
				invoiceNumber="INV-0";
				System.out.println("Inside Else"+invoiceNumber);
			}
			}
			String[] data = invoiceNumber.split("-");
			System.out.println("number = "+data[1]);
			
			System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
			int result = Integer.parseInt(data[1]);	
			int invoiceNumber1= result + 1;
			String invoiceNo = String.format("INV-%s",invoiceNumber1);
			SaleOrderJSON selectInvoiceNoObj = new SaleOrderJSON();
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

	public SaleOrderJSON estimateinvoiceNo(SaleOrderJSON json) {
		   
			String invoiceNumber="";
			
			System.out.println("inside dao.......");
			ArrayList<SaleOrderJSON> selectEstimateInvoiceNoList = new ArrayList<SaleOrderJSON>();
		  	SaleOrderJSON res=new SaleOrderJSON();
			Connection connection=null;
			try {
				
				connection =DatabaseUtil.getDBConnection();	
	            String querySelect1=QueryConstants.EstimateOrder_Insert_SELECT;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1,json.getCompanyId());
				ResultSet rs=preparedStmt1.executeQuery();
				while(rs.next()) {
				if(rs.getString("invoiceNo")!=null) {
					System.out.println("inside if");
				   invoiceNumber = rs.getString("invoiceNo");
				   
				}else {
					invoiceNumber="EST-0";
					System.out.println("Inside Else"+invoiceNumber);
				}
				}
				String[] data = invoiceNumber.split("-");
				System.out.println("number = "+data[1]);
				
				System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
				int result = Integer.parseInt(data[1]);	
				int invoiceNumber1= result + 1;
				String invoiceNo = String.format("EST-%s",invoiceNumber1);
				SaleOrderJSON selectEstimateInvoiceNoObj = new SaleOrderJSON();
				selectEstimateInvoiceNoObj.setInvoiceNo(invoiceNo);
				selectEstimateInvoiceNoList.add(selectEstimateInvoiceNoObj);
				 res.setSelectEstimateInvoiceNoList(selectEstimateInvoiceNoList);
		        
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

	public SaleOrderJSON addestimateorder(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> estimateproductdatalist = new ArrayList<SaleOrderJSON>();	
		ArrayList<SaleOrderJSON> arrdatalist = new ArrayList<SaleOrderJSON>();	
		 

		Connection connection=null;
		String invoiceData=null;
		String productName=null;
		String size=null;
		String rate=null;
		String amount=null;
		String quantity=null;
		String total=null;
	    String unit=null;
	    String height="0";
	    String width="0";	
    	String description="-";
    	String invoiceNumber="";
		
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect1=QueryConstants.Customer_EOrderNumber;
					PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
					preparedStmt1.setInt(1,json.getOrderNumber());	
					preparedStmt1.setInt(2,json.getCustomerId());		
					preparedStmt1.setString(3,json.getCompanyId());
					preparedStmt1.executeUpdate();
					System.out.println("customer eorder number updated.......");
					System.out.println("going to insert data into Estimate statement table.......");
					String querySelect2=QueryConstants.Est_Statement_Insert;
					PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
					preparedStmt2.setString(1,json.getInvoiceNo());
					preparedStmt2.setString(2,json.getAdvance());
					preparedStmt2.setString(3,json.getDiscount());
					preparedStmt2.setString(4,json.getSubtotal1());				
					preparedStmt2.setString(5,json.getDate());
					preparedStmt2.setString(6,json.getCustomerName());
					preparedStmt2.setString(7,json.getBalance_amount());
					preparedStmt2.setString(8,json.getAddress());
					preparedStmt2.setString(9,json.getGstNo());
					preparedStmt2.setString(10,json.getEmail());
					preparedStmt2.setInt(11,json.getCustomerId());
					preparedStmt2.setString(12,json.getCompanyId());
					
					preparedStmt2.executeUpdate();
					invoiceData=json.getInvoiceData();
					System.out.println("going to retrive array data.......");
					 String querySelect3=QueryConstants.EstimateOrder_Insert_SELECT;
						PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
						preparedStmt3.setString(1,json.getCompanyId());
						ResultSet rs=preparedStmt3.executeQuery();
						while(rs.next()) {
						if(rs.getString("invoiceNo")!=null) {
							System.out.println("inside if");
						   invoiceNumber = rs.getString("invoiceNo");
						   
						}else {
							invoiceNumber="EST-0";
							System.out.println("Inside Else"+invoiceNumber);
						}
						}
						String[] data = invoiceNumber.split("-");
						System.out.println("number = "+data[1]);
						
						System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
						int result = Integer.parseInt(data[1]);	
						int invoiceNumber1= result + 1;
						String invoiceNo = String.format("EST-%s",invoiceNumber1);
					//	SaleOrderJSON selectEstimateInvoiceNoObj = new SaleOrderJSON();
						json.setInvoiceNo(invoiceNo);

						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceData.split(","));
							for(int i=0;i<aList.size();i=i+10)
							{
							System.out.println("data for the invoice in list is............"+aList.get(i));
											
							productName=aList.get(i);
							size=aList.get(i+1);
							unit=aList.get(i+2);
							rate=aList.get(i+3);
							amount=aList.get(i+4);
							quantity=aList.get(i+5);
							total=aList.get(i+6);
							height=aList.get(i+7);
							width=aList.get(i+8);
							description=aList.get(i+9);
						
							System.out.println("going to insert data into table.......");
							String querySelect=QueryConstants.EstimateOrder_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getCustomerName());
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
							preparedStmt.setString(16,json.getDate());
							preparedStmt.setString(17,json.getContactNo());					
							preparedStmt.setString(18,json.getTotalitemqty());
							preparedStmt.setString(19,json.getSubtotal1());										
							preparedStmt.setString(20,json.getAdvance());
							preparedStmt.setString(21,json.getDiscount());
							preparedStmt.setString(22,json.getBalance_amount());
							preparedStmt.setString(23,json.getPayment_status());
							preparedStmt.setString(24,unit);
							preparedStmt.setInt(25,json.getCustomerId());
							preparedStmt.setString(26,json.getCompanyId());
							preparedStmt.setString(27, json.getCompanyName());
							
						   
							
							preparedStmt.executeUpdate();
							System.out.println("completed adding sale invoice returing to webservice............");	
							
						
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

	public SaleOrderJSON saleinvoicereport(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> saleinvoicereportlist = new ArrayList<SaleOrderJSON>();	
		SaleOrderJSON res=new SaleOrderJSON();
		List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect1=QueryConstants.SELECT_GST_INV.replace("$tableName","SaleInvoiceTable");
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			//preparedStmt.setString(1,json.getDate());
			preparedStmt1.setString(1,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}
			
			
			for(int i=0;i<invList.size();i++) {
			
			String querySelect=QueryConstants.SaleInvoice_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.setString(2,invList.get(i));
	
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	SaleOrderJSON saleinvoicereportobj = new SaleOrderJSON();
	        	saleinvoicereportobj.setSaleInvoiceId(rs.getString("saleInvoiceId"));
	        	saleinvoicereportobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	saleinvoicereportobj.setDate(rs.getString("date"));
	        	saleinvoicereportobj.setCustomerName(rs.getString("customerName"));
	        	saleinvoicereportobj.setContactNo(rs.getString("contactNo"));	 
	        	saleinvoicereportobj.setBalance_amount(rs.getString("balance_amount"));
	        	saleinvoicereportobj.setSubtotal1(rs.getString("subtotal1"));
	        	saleinvoicereportobj.setPayment_status(rs.getString("payment_status"));
	        	saleinvoicereportobj.setAdvance(rs.getString("advance"));
	        	saleinvoicereportobj.setCompanyName(rs.getString("companyName"));
	        	saleinvoicereportlist.add(saleinvoicereportobj);
	        }
			}
	        System.out.println("list length...."+saleinvoicereportlist.size());	       
	        
	        res.setSaleinvoicereportlist(saleinvoicereportlist);
	        
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

	public SaleOrderJSON estimateinvoicereport(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> estimateinvoicereportlist = new ArrayList<SaleOrderJSON>();	
		SaleOrderJSON res=new SaleOrderJSON();
		List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			String querySelect1=QueryConstants.SELECT_GST_INV.replace("$tableName","EstimateInvoiceTable");
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			//preparedStmt.setString(1,json.getDate());
			preparedStmt1.setString(1,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}
			
			
			for(int i=0;i<invList.size();i++) {
			String querySelect=QueryConstants.EstimateInvoice_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.setString(2,invList.get(i));			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	SaleOrderJSON setEstimateinvoicereportobj = new SaleOrderJSON();
	        	setEstimateinvoicereportobj.setEstimateId(rs.getString("estimateId"));
	        	setEstimateinvoicereportobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	setEstimateinvoicereportobj.setDate(rs.getString("date"));
	        	setEstimateinvoicereportobj.setCustomerName(rs.getString("customerName"));
	        	setEstimateinvoicereportobj.setContactNo(rs.getString("contactNo"));	 
	        	setEstimateinvoicereportobj.setBalance_amount(rs.getString("balance_amount"));
	        	setEstimateinvoicereportobj.setSubtotal1(rs.getString("subtotal1"));
	        	setEstimateinvoicereportobj.setPayment_status(rs.getString("payment_status"));
	        	setEstimateinvoicereportobj.setAdvance(rs.getString("advance"));
	           	setEstimateinvoicereportobj.setCompanyName(rs.getString("companyName"));
		        
	        	estimateinvoicereportlist.add(setEstimateinvoicereportobj);
	        }
			}
	        System.out.println("list length...."+estimateinvoicereportlist.size());	       
	        
	        res.setEstimateinvoicereportlist(estimateinvoicereportlist);
	        
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

	public static String GetEmailId(String contactNo,String companyId) {
		SaleOrderJSON res=new SaleOrderJSON();
		Connection connection=null;
		String emailId = null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
	       
			String querySelect=QueryConstants.GET_EMAIL_ID;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,contactNo);	
			preparedStmt.setString(2,companyId);
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
