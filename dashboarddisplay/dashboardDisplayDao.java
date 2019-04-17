package dashboarddisplay;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import DBUtil.DatabaseUtil;
import saleOrder.SaleOrderJSON;

public class dashboardDisplayDao {

	public dashboardDisplayJSON selectDashboard_Display_Data(dashboardDisplayJSON json) {
		System.out.println("inside dashboard Display Dao.......");
		
		

		// ArrayList<dashboardDisplayJSON> selectvendornamelist = new
		// ArrayList<dashboardDisplayJSON>();
		//dashboardDisplayJSON res = new dashboardDisplayJSON();
		Connection connection = null;

		dashboardDisplayJSON selectdashboard_Monthly_sale_Purchase_Expense = new dashboardDisplayJSON();
		System.out.println("try1.......");
		
		try {
			System.out.println("try2 .......");

			
/* Select_Monthly_SaleInvoice*/
			connection = DatabaseUtil.getDBConnection();
			String Monthly_SaleInvoice = QueryConstants.Select_Monthly_SaleInvoice;
			PreparedStatement preparedStmt = connection.prepareStatement(Monthly_SaleInvoice);
			preparedStmt.setString(1, json.getCurrent_Month());
			preparedStmt.setString(2, json.getCurrent_Year());
			preparedStmt.setString(3, json.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_SalesInvoice(rs.getString("SaleInvoice_Total_Amt"));
				
				System.out.println("sum of month saleinvoice data value...." + "SaleInvoice_Total_Amt" + "value saleinvoice"
						+ rs.getString("SaleInvoice_Total_Amt"));
		
			}
			
/* Select_Monthly_PurchaseInvoice*/
			
			System.out.println("try3 .......");
			String PurchaseInvoice = QueryConstants.Select_Monthly_PurchaseInvoice;
			PreparedStatement preparedStmt1 = connection.prepareStatement(PurchaseInvoice);
			preparedStmt1.setString(1, json.getCurrent_Month());
			preparedStmt1.setString(2, json.getCurrent_Year());
			preparedStmt1.setString(3, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();

			while (rs1.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_PurchaseInvoice(rs1.getString("PurchaseInvoice_Total_Amt"));
			
				System.out.println("sum of month Select_Monthly_PurchaseInvoice data value...."
						+ rs1.getString("PurchaseInvoice_Total_Amt"));
				System.out.println("try4 .......");
			}
			
/* Select_monthly_ExpenseInvoice*/
			String ExpenseInvoice = QueryConstants.Select_Monthly_ExpenseInvoice;
			PreparedStatement preparedStmt2 = connection.prepareStatement(ExpenseInvoice);
			preparedStmt2.setString(1, json.getCurrent_Month());
			preparedStmt2.setString(2, json.getCurrent_Year());
			preparedStmt2.setString(3, json.getCompanyId());
			ResultSet rs2 = preparedStmt2.executeQuery();

			while (rs2.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_ExpenseInvoice(rs2.getString("ExpenseInvoice_Total_Amt"));
				
				System.out.println("sum of month ExpenseInvoice_Total_Amt data value...."
						+ rs2.getString("ExpenseInvoice_Total_Amt"));
				System.out.println("try5 .......");
			}
			
/* Total_No_of_Vendors*/
			
			String Total_No_of_Vendors = QueryConstants.Select_Total_No_of_Vendors;
			PreparedStatement preparedStmt3 = connection.prepareStatement(Total_No_of_Vendors);
			preparedStmt3.setString(1, json.getCompanyId());
				ResultSet rs3 = preparedStmt3.executeQuery();

			while (rs3.next()) {

				
				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_Vendors(rs3.getString("Total_No_of_Vendors"));
				
				System.out.println("sum of month Total_No_of_Vendors data value...."
						+ rs3.getString("Total_No_of_Vendors"));
				System.out.println("try6 .......");
				
			}
			
/* Total_No_of_ProductList*/
			
			String Total_No_of_ProductList = QueryConstants.Select_Total_No_of_ProductList;
			PreparedStatement preparedStmt4 = connection.prepareStatement(Total_No_of_ProductList);
			preparedStmt4.setString(1, json.getCompanyId());
				ResultSet rs4 = preparedStmt4.executeQuery();

			while (rs4.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_ProductList(rs4.getString("Total_No_of_ProductList"));
				
				System.out.println("sum of month Total_No_of_ProductList data value...."
						+ rs4.getString("Total_No_of_ProductList"));
				System.out.println("try7 .......");
				
			}
			
			/* Select_Total_No_of_SaleInvoice*/
			
			String Total_No_of_SaleInvoice = QueryConstants.Select_Total_No_of_SaleInvoice;
			PreparedStatement preparedStmt5 = connection.prepareStatement(Total_No_of_SaleInvoice);
			preparedStmt5.setString(1, json.getCompanyId());
				ResultSet rs5 = preparedStmt5.executeQuery();

			while (rs5.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_SaleInvoice(rs5.getString("Total_No_of_SaleInvoice"));
				
				System.out.println("sum of month Total_No_of_SaleInvoice data value...."
						+ rs5.getString("Total_No_of_SaleInvoice"));
				
			}
			

			/* Select_Total_No_of_WithGST_Quotation*/
			
			String Total_No_of_WithGST_Quotation = QueryConstants.Select_Total_No_of_WithGST_Quotation;
			PreparedStatement preparedStmt6 = connection.prepareStatement(Total_No_of_WithGST_Quotation);
			preparedStmt6.setString(1, json.getCompanyId());
				ResultSet rs6 = preparedStmt6.executeQuery();

			while (rs6.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_WithGST_Quotation(rs6.getString("Total_No_of_WithGST_Quotation"));
				
				System.out.println("sum of month Total_No_of_WithGST_Quotation data value...."
						+ rs6.getString("Total_No_of_WithGST_Quotation"));
			
				
			}
			
/* Select_Total_No_of_SaleInvoice_Qty*/
			
			
			String Total_No_of_SaleInvoice_Qty = QueryConstants.Select_Total_No_of_SaleInvoice_Qty;
			PreparedStatement preparedStmt7 = connection.prepareStatement(Total_No_of_SaleInvoice_Qty);
			preparedStmt7.setString(1, json.getCurrent_Month());
			preparedStmt7.setString(2, json.getCurrent_Year());
			preparedStmt7.setString(3, json.getCompanyId());	
			ResultSet rs7 = preparedStmt7.executeQuery();

			while (rs7.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_SaleInvoice_Qty(rs7.getString("Total_No_of_SaleInvoice_Qty"));
				
				System.out.println("sum of month Total_No_of_SaleInvoice_Qty data value...."
						+ rs7.getString("Total_No_of_SaleInvoice_Qty"));
			
			
				
			}
				/*Select_Total_No_of_SaleInvoice_Qty_Estimate*/
			
			String Total_No_of_SaleInvoice_Qty_Estimate = QueryConstants.Select_Total_No_of_SaleInvoice_Qty_Estimate;
			PreparedStatement preparedStmt8 = connection.prepareStatement(Total_No_of_SaleInvoice_Qty_Estimate);
			preparedStmt8.setString(1, json.getCurrent_Month());
			preparedStmt8.setString(2, json.getCurrent_Year());
			preparedStmt8.setString(3, json.getCompanyId());	
			ResultSet rs8 = preparedStmt8.executeQuery();

			while (rs8.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_SaleInvoice_Qty_Estimate(rs8.getString("Total_No_of_SaleInvoice_Qty_Estimate"));
				
				System.out.println("sum of month Total_No_of_SaleInvoice_Qty_Estimate data value...."
						+ rs8.getString("Total_No_of_SaleInvoice_Qty_Estimate"));

			}
				/*Select_Total_No_of_Salary_paid*/
			
			String Total_No_of_Salary_paid = QueryConstants.Select_Total_No_of_Salary_paid;
			PreparedStatement preparedStmt9 = connection.prepareStatement(Total_No_of_Salary_paid);
			preparedStmt9.setString(1, json.getCurrent_Month());
			preparedStmt9.setString(2, json.getCurrent_Year());
			preparedStmt9.setString(3, json.getCompanyId());
			ResultSet rs9 = preparedStmt9.executeQuery();

			while (rs9.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_Salary_paid(rs9.getString("Total_No_of_Salary_paid"));
				
				System.out.println("sum of month setTotal_No_of_Salary_paid data value...."
						+ rs9.getString("Total_No_of_Salary_paid"));
			
		
			
			}
			
		/*Select_Total_Sales_Amount_Individual_Monthwise*/
			ArrayList<dashboardDisplayJSON> dashboard_LineChart_List = new ArrayList<dashboardDisplayJSON>();	
			
			String Sales_Amount_Individual_Monthwise = QueryConstants.Select_Total_Sales_Amount_Individual_Monthwise;
			PreparedStatement preparedStmt10 = connection.prepareStatement(Sales_Amount_Individual_Monthwise);
			preparedStmt10.setString(1, json.getCompanyId());	
			
			ResultSet rs10 = preparedStmt10.executeQuery();

			while (rs10.next()) {
				
				dashboardDisplayJSON dashboard_LineChart = new dashboardDisplayJSON();
				dashboard_LineChart.setCurrent_Year(rs10.getString("current_Year"));
				dashboard_LineChart.setCurrent_Month(rs10.getString("month_index"));
				dashboard_LineChart.setMonthly_SalesInvoice(rs10.getString("month_subtotal"));
				dashboard_LineChart_List.add(dashboard_LineChart);
				
				System.out.println("sum of month Select_Total_Sales_Amount_Individual_Monthwise data value...."+rs10.getString("month_index")+rs10.getString("month_subtotal"));
			} System.out.println("list length...."+dashboard_LineChart_List.size());	       
			selectdashboard_Monthly_sale_Purchase_Expense.setDashboard_LineChart_List(dashboard_LineChart_List);
			
			
			/*Total_Purchase_Amount_Individual_Monthwise*/
			ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_purchase = new ArrayList<dashboardDisplayJSON>();	
			
			String Total_Purchase_Amount_Individual_Monthwise = QueryConstants.Select_Total_Purchase_Amount_Individual_Monthwise;
			PreparedStatement preparedStmt11 = connection.prepareStatement(Total_Purchase_Amount_Individual_Monthwise);
				
			preparedStmt11.setString(1, json.getCompanyId());
			ResultSet rs11 = preparedStmt11.executeQuery();

			while (rs11.next()) {
				
				dashboardDisplayJSON dashboard_LineChart_purchase = new dashboardDisplayJSON();
				dashboard_LineChart_purchase.setCurrent_Year(rs11.getString("current_Year"));
				dashboard_LineChart_purchase.setCurrent_Month(rs11.getString("month_index"));
				dashboard_LineChart_purchase.setMonthly_PurchaseInvoice(rs11.getString("month_subtotal"));
				dashboard_LineChart_List_purchase.add(dashboard_LineChart_purchase);
				
				System.out.println("sum of month Total_Purchase_Amount_Individual_Monthwise data value...."+rs11.getString("month_index")+rs11.getString("month_subtotal"));
			} 
			selectdashboard_Monthly_sale_Purchase_Expense.setDashboard_LineChart_List_purchase(dashboard_LineChart_List_purchase);
			
/* Select_Total_No_of_SaleInvoice_Amount_Annually*/
			
			
			String Total_No_of_SaleInvoice_Amount_Annually = QueryConstants.Select_Total_No_of_SaleInvoice_Amount_Annually;
			PreparedStatement preparedStmt12 = connection.prepareStatement(Total_No_of_SaleInvoice_Amount_Annually);
			preparedStmt12.setString(1, json.getCompanyId());
			ResultSet rs12 = preparedStmt12.executeQuery();

			while (rs12.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_Sales_Amount_Annually(rs12.getString("Annual_Sale_Amount"));
				
				System.out.println("sum of month Total_No_of_SaleInvoice_Qty data value...."
						+ rs12.getString("Annual_Sale_Amount"));
						
			}
/* Select_Total_No_of_PurchaseInvoice_Amount_Annually*/
			
			
			String Total_No_of_PurchaseInvoice_Amount_Annually = QueryConstants.Select_Total_No_of_PurchaseInvoice_Amount_Annually;
			PreparedStatement preparedStmt13 = connection.prepareStatement(Total_No_of_PurchaseInvoice_Amount_Annually);
			preparedStmt13.setString(1, json.getCompanyId());
			ResultSet rs13 = preparedStmt13.executeQuery();

			while (rs13.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_Purchase_Amount_Annually(rs13.getString("Annual_Purchase_Amount"));
				
				System.out.println("sum of month Total_No_of_PurchaseInvoice_Amount_Annually data value...."
						+ rs13.getString("Annual_Purchase_Amount"));
						
			}
		
			/* daily_report_limtby_10 numbers*/	
				//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			/* List<String> invList =  new ArrayList<String>();;
			 
			String querySelect=QueryConstants.SELECT_DAILY_SALES_INV;
			PreparedStatement preparedStmt14=connection.prepareStatement(querySelect);
			preparedStmt14.setString(1,json.getDate());
			ResultSet rs14=preparedStmt.executeQuery();
			while(rs14.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			System.out.println("LENGTH OF INVOICE LIST :\t"+invList.size());
			
			int j =invList.size()-8 ;
			for(int i=invList.size();i<=8;i++) {*/

			ArrayList <dashboardDisplayJSON> dailyInvoiceList=new ArrayList <dashboardDisplayJSON>();
			
			
			String daily_report_limtby_10 = QueryConstants.SELECT_DAILY_SALES_INV;
			PreparedStatement preparedStmt15=connection.prepareStatement(daily_report_limtby_10);
			preparedStmt15.setString(1, json.getCompanyId());
			ResultSet rs15=preparedStmt15.executeQuery();
			while(rs15.next()) {
				dashboardDisplayJSON dailySales= new dashboardDisplayJSON();
				dailySales.setInvoiceNo(rs15.getString("invoiceNo"));
				dailySales.setDate(rs15.getString("Date"));
				dailySales.setUserName(rs15.getString("customerName"));
				dailySales.setContact(rs15.getString("contactNo"));
				dailySales.setStatus(rs15.getString("Payment_status"));
				dailySales.setSubTotal(rs15.getString("subtotal1"));
				dailyInvoiceList.add(dailySales); 
				
				selectdashboard_Monthly_sale_Purchase_Expense.setDailyInvoiceList(dailyInvoiceList);
				
			}
			
				connection.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return selectdashboard_Monthly_sale_Purchase_Expense;

	}

	

}
