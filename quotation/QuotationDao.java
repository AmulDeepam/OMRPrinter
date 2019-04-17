package quotation;

import java.sql.Connection;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import DBUtil.DatabaseUtil;

public class QuotationDao {
	public QuotationJSON selectCustomer(QuotationJSON json) {
		System.out.println("inside dao.......");
		ArrayList<QuotationJSON> selectcustomernamelist = new ArrayList<QuotationJSON>();	
	  	QuotationJSON res=new QuotationJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.Select_Customer_Name;
			System.out.println("customer name...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			preparedStmt.setString(1,json.getCompanyId());	
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	QuotationJSON selectCustomerNameobj = new QuotationJSON();
	        	selectCustomerNameobj.setCustomerName(rs.getString("customerName"));	
	        	selectCustomerNameobj.setOrderNumber(rs.getInt("orderNumber"));
	        	selectCustomerNameobj.setCustomerId(rs.getInt("customerId"));
	        	selectCustomerNameobj.setContactNo(rs.getString("contactNo"));
	        	selectCustomerNameobj.setEorderNumber(rs.getInt("eorderNumber"));
	        	selectCustomerNameobj.setAddress(rs.getString("address"));
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

	public QuotationJSON selectindividualsaleproduct(QuotationJSON json) {
		System.out.println("inside dao.......");
		ArrayList<QuotationJSON> selectindividualsaleproductlist = new ArrayList<QuotationJSON>();	
	  	QuotationJSON res=new QuotationJSON();
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
	        	QuotationJSON selectindividualsaleproductobj = new QuotationJSON();
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
	
	public QuotationJSON addgstquotationorder(QuotationJSON json) {
		ArrayList<QuotationJSON> productdatalist = new ArrayList<QuotationJSON>();	
		ArrayList<QuotationJSON> arrdatalist = new ArrayList<QuotationJSON>();	
		 
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
		String invoiceNumber="";
	
		try {
			       connection = DatabaseUtil.getDBConnection();
			      
					invoiceData=json.getInvoiceData();
					System.out.println("going to retrive array data.......");
					  String querySelect1=QueryConstants.GSTQuotation_Insert_SELECT;
						PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
						preparedStmt1.setString(1,json.getCompanyId());
						ResultSet rs=preparedStmt1.executeQuery();
						while(rs.next()) {
						if(rs.getString("invoiceNo")!=null) {
							System.out.println("inside if");
						   invoiceNumber = rs.getString("invoiceNo");
						   
						}else {
							invoiceNumber="QT-0";
							System.out.println("Inside Else"+invoiceNumber);
						}
						}
						String[] data = invoiceNumber.split("-");
						System.out.println("number = "+data[1]);
						
						System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
						int result = Integer.parseInt(data[1]);	
						int invoiceNumber1= result + 1;
						String invoiceNo = String.format("QT-%s", invoiceNumber1);
						//QuotationJSON selectInvoiceNoObj = new QuotationJSON();
						json.setInvoiceNo(invoiceNo);
						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceData.split(","));
							for(int i=0;i<aList.size();i=i+13)
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
	
							System.out.println("going to insert data into table.......");
							String querySelect=QueryConstants.GSTQuotation_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getCustomerName());
							preparedStmt.setString(2,invoiceNo);						
							preparedStmt.setString(3,json.getInvoiceDate());
							preparedStmt.setString(4,json.getDueDate());
							preparedStmt.setString(5,json.getSaleType());
							preparedStmt.setString(6,productName);
							preparedStmt.setString(7,json.getDescription());
							preparedStmt.setString(8,height);
							preparedStmt.setString(9,width);
							preparedStmt.setString(10,size);
							preparedStmt.setString(11,rate);
							preparedStmt.setString(12,amount);
							preparedStmt.setString(13,quantity);
							preparedStmt.setString(14,total);
							preparedStmt.setString(15,cgst);
							preparedStmt.setString(16,sgst);
							preparedStmt.setString(17,igst);
							preparedStmt.setString(18,finalAmount);
							preparedStmt.setString(19,json.getDate());
							preparedStmt.setString(20,json.getContactNo());
							preparedStmt.setString(21,json.getAddress());
							preparedStmt.setString(22,json.getTotalcgst());
							preparedStmt.setString(23,json.getTotalsgst());
							preparedStmt.setString(24,json.getTotaligst());
							preparedStmt.setString(25,json.getTotalitemqty());
							preparedStmt.setString(26,json.getSubtotal1());
							preparedStmt.setString(27,json.getTotalgst());					
							preparedStmt.setString(28,json.getAdjustment());
							preparedStmt.setString(29,json.getDiscount());
							preparedStmt.setString(30,json.getFinalAmountTotal());
							preparedStmt.setString(31, json.getPayment_status());	
							preparedStmt.setString(32, unit);
							preparedStmt.setString(33, json.getShipping());	
							preparedStmt.setString(34, json.getCompanyId());	
							preparedStmt.setString(35, json.getCompanyName());
							
							
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

	public QuotationJSON selectinvoiceNo(QuotationJSON json) {		
		   
		String invoiceNumber="";
		
		System.out.println("inside dao.......");
		ArrayList<QuotationJSON> selectInvoiceNoList = new ArrayList<QuotationJSON>();
	  	QuotationJSON res=new QuotationJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();	
            String querySelect1=QueryConstants.GSTQuotation_Insert_SELECT;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt1.executeQuery();
			while(rs.next()) {
			if(rs.getString("invoiceNo")!=null) {
				System.out.println("inside if");
			   invoiceNumber = rs.getString("invoiceNo");
			   
			}else {
				invoiceNumber="QT-0";
				System.out.println("Inside Else"+invoiceNumber);
			}
			}
			String[] data = invoiceNumber.split("-");
			System.out.println("number = "+data[1]);
			
			System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
			int result = Integer.parseInt(data[1]);	
			int invoiceNumber1= result + 1;
			String invoiceNo = String.format("QT-%s", invoiceNumber1);
			QuotationJSON selectInvoiceNoObj = new QuotationJSON();
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

	public QuotationJSON withoutgstinvoiceNo(QuotationJSON json) {
		   
			String invoiceNumber="";
			
			System.out.println("inside dao.......");
			ArrayList<QuotationJSON> selectWithoutGstInvoiceNoList = new ArrayList<QuotationJSON>();
		  	QuotationJSON res=new QuotationJSON();
			Connection connection=null;
			try {
				
				connection =DatabaseUtil.getDBConnection();	
	            String querySelect1=QueryConstants.WithoutGSTQuotation_Insert_SELECT;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1,json.getCompanyId());
				ResultSet rs=preparedStmt1.executeQuery();
				while(rs.next()) {
				if(rs.getString("invoiceNo")!=null) {
					System.out.println("inside if");
				   invoiceNumber = rs.getString("invoiceNo");
				   
				}else {
					invoiceNumber="QT-0";
					System.out.println("Inside Else"+invoiceNumber);
				}
				}
				String[] data = invoiceNumber.split("-");
				System.out.println("number = "+data[1]);
				
				System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
				int result = Integer.parseInt(data[1]);	
				int invoiceNumber1= result + 1;
				String invoiceNo = String.format("QT-%s", invoiceNumber1);
				QuotationJSON selectWithoutGstInvoiceNoObj = new QuotationJSON();
				selectWithoutGstInvoiceNoObj.setInvoiceNo(invoiceNo);
				selectWithoutGstInvoiceNoList.add(selectWithoutGstInvoiceNoObj);
				 res.setSelectWithoutGstInvoiceNoList(selectWithoutGstInvoiceNoList);
		        
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
	


	public QuotationJSON addwithoutgstquotationorder(QuotationJSON json) {
		ArrayList<QuotationJSON> withoutgstproductdatalist = new ArrayList<QuotationJSON>();	
		ArrayList<QuotationJSON> arrdatalist = new ArrayList<QuotationJSON>();	
		 

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
		String invoiceNumber="";
	
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect1=QueryConstants.WithoutGSTQuotation_Insert_SELECT;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1,json.getCompanyId());
					ResultSet rs=preparedStmt1.executeQuery();
					while(rs.next()) {
					if(rs.getString("invoiceNo")!=null) {
						System.out.println("inside if");
					   invoiceNumber = rs.getString("invoiceNo");
					   
					}else {
						invoiceNumber="QT-0";
						System.out.println("Inside Else"+invoiceNumber);
					}
					}
					String[] data = invoiceNumber.split("-");
					System.out.println("number = "+data[1]);
					
					System.out.println("got the invoiceNo details to be added............"+ invoiceNumber);
					int result = Integer.parseInt(data[1]);	
					int invoiceNumber1= result + 1;
					String invoiceNo = String.format("QT-%s", invoiceNumber1);
				//	QuotationJSON selectWithoutGstInvoiceNoObj = new QuotationJSON();
					json.setInvoiceNo(invoiceNo);
			       invoiceData=json.getInvoiceData();
					System.out.println("going to retrive array data.......");

						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceData.split(","));
						    for(int i=0;i<aList.size();i=i+9)
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
							System.out.println("going to insert data into table.......");
							String querySelect=QueryConstants.WithoutGSTQuotation_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getCustomerName());
							preparedStmt.setString(2,invoiceNo);					
							preparedStmt.setString(3,json.getInvoiceDate());
							preparedStmt.setString(4,json.getDueDate());
							preparedStmt.setString(5,json.getSaleType());
							preparedStmt.setString(6,productName);
							preparedStmt.setString(7,json.getDescription());
							preparedStmt.setString(8,height);
							preparedStmt.setString(9,width);
							preparedStmt.setString(10,size);
							preparedStmt.setString(11,rate);
							preparedStmt.setString(12,amount);
							preparedStmt.setString(13,quantity);
							preparedStmt.setString(14,total);						
							preparedStmt.setString(15,json.getDate());
							preparedStmt.setString(16,json.getContactNo());	
							preparedStmt.setString(17,json.getAddress());
							preparedStmt.setString(18,json.getTotalitemqty());
							preparedStmt.setString(19,json.getSubtotal1());										
							preparedStmt.setString(20,json.getAdjustment());
							preparedStmt.setString(21,json.getDiscount());
							preparedStmt.setString(22,json.getFinalAmountTotal());
							preparedStmt.setString(23, json.getPayment_status());
							preparedStmt.setString(24,unit);					
							preparedStmt.setString(25, json.getShipping());
							preparedStmt.setString(26, json.getCompanyId());
							preparedStmt.setString(27, json.getCompanyName());
							preparedStmt.executeUpdate();
							System.out.println("completed adding Quotation invoice returing to webservice............");	
												
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
	public QuotationJSON gstquotationreport(QuotationJSON json) {
		ArrayList<QuotationJSON> gstquotationreportlist = new ArrayList<QuotationJSON>();	
		QuotationJSON res=new QuotationJSON();
		 List<String> invList =  new ArrayList<String>();
			
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.SELECT_GST_INV.replace("$tableName","GSTQuotationTable");;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			System.out.println("LENGTH OF INVOICE LIST :\t"+invList.size());
			
			for(int i=0;i<invList.size();i++) {
			
			String querySelect1=QueryConstants.GSTQuotation_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			preparedStmt1.setString(2,invList.get(i));
	        ResultSet rs1=preparedStmt1.executeQuery();
	               
	        while(rs1.next())
	        {
	        	QuotationJSON gstquotationreportobj = new QuotationJSON();
	        	gstquotationreportobj.setGstQuotationId(rs1.getString("gstQuotationId"));
	        	gstquotationreportobj.setInvoiceNo(rs1.getString("invoiceNo"));
	        	gstquotationreportobj.setDate(rs1.getString("date"));
	        	gstquotationreportobj.setCustomerName(rs1.getString("customerName"));
	        	gstquotationreportobj.setContactNo(rs1.getString("contactNo"));	 
	        	gstquotationreportobj.setAddress(rs1.getString("address"));
	        	gstquotationreportobj.setTotalgst(rs1.getString("totalgst"));
	        	gstquotationreportobj.setSubtotal1(rs1.getString("subtotal1"));
	        	gstquotationreportobj.setPayment_status(rs1.getString("payment_status"));
	        	gstquotationreportobj.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
	         	gstquotationreportobj.setShipping(rs1.getString("shipping"));
	        	gstquotationreportobj.setCompanyName(rs1.getString("companyName"));
	        	gstquotationreportlist.add(gstquotationreportobj);
	        }
			}
	        System.out.println("list length...."+gstquotationreportlist.size());	       
	        
	        res.setGstquotationreportlist(gstquotationreportlist);
	        
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
	
	public QuotationJSON withoutgstquotationreport(QuotationJSON json) {
		ArrayList<QuotationJSON> withoutgstquotationreportlist = new ArrayList<QuotationJSON>();	
		QuotationJSON res=new QuotationJSON();
		 List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			
			
			String querySelect=QueryConstants.SELECT_GST_INV.replace("$tableName","WithoutGSTQuotationTable");
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
			
			
			for(int i=0;i<invList.size();i++) {
			
			
			String querySelect1=QueryConstants.WithoutGSTQuotation_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			preparedStmt1.setString(2,invList.get(i));
	        ResultSet rs1=preparedStmt1.executeQuery();
	               
	        while(rs1.next())
	        {
	        	QuotationJSON withoutgstquotationreportobj = new QuotationJSON();
	        	withoutgstquotationreportobj.setWithoutGstQuotationId(rs1.getInt("withoutGstQuotationId"));
	        	withoutgstquotationreportobj.setInvoiceNo(rs1.getString("invoiceNo"));
	        	withoutgstquotationreportobj.setDate(rs1.getString("date"));
	        	withoutgstquotationreportobj.setCustomerName(rs1.getString("customerName"));
	        	withoutgstquotationreportobj.setContactNo(rs1.getString("contactNo"));	 
	        	withoutgstquotationreportobj.setAddress(rs1.getString("address"));
	        	withoutgstquotationreportobj.setSubtotal1(rs1.getString("subtotal1"));
	        	withoutgstquotationreportobj.setPayment_status(rs1.getString("payment_status"));
	        	withoutgstquotationreportobj.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
	        	withoutgstquotationreportobj.setShipping(rs1.getString("shipping"));
	        	withoutgstquotationreportobj.setCompanyName(rs1.getString("companyName"));
	        	withoutgstquotationreportlist.add(withoutgstquotationreportobj);
	        }
			}
	        System.out.println("withoutgstquotationreport length...."+withoutgstquotationreportlist.size());	       
			
	        res.setWithoutgstquotationreportlist(withoutgstquotationreportlist);
	        
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
		QuotationJSON res=new QuotationJSON();
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
