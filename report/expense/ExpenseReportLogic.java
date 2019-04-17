package report.expense;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;



import DBUtil.DatabaseUtil;

public class ExpenseReportLogic {

	
	/*
	 * FUNCTION FOR DISPLAYING DAILY REPORT DETAILS
	 */
	public static ArrayList<ExpenseReportJSON> DailyReport(ExpenseReportJSON json) {
		Connection connection=null;
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DAILY_EXP_REPORT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getDate());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				ExpenseReportJSON dailyExpense=new ExpenseReportJSON();
				dailyExpense.setId(rs.getString("expenseId"));
				dailyExpense.setCategoryName(rs.getString("categoryName"));
				dailyExpense.setUserName(rs.getString("UserName"));
				dailyExpense.setAmount(rs.getString("Amount"));
				dailyExpense.setDate(rs.getString("Date"));
				dailyExpenseList.add(dailyExpense);
				
			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dailyExpenseList;
	}

	
	/*
	 * FUNCTION FOR DELETING DAILY EXPENSE REPORT DETAILS
	 */
	public static ExpenseReportJSON DailyReportDelete(ExpenseReportJSON json) {

		Connection connection=null;
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DAILY_EXP_REPORT_DEL;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
		
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

/*
 * FUNCTION FOR UPADTING DAILY REPORT
 */
	public static ExpenseReportJSON DailyReportUpdate(ExpenseReportJSON json) {

		Connection connection=null;
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
		//	expenseId = ? , CategoryName = ? ,Username = ? , " +"Amount = ? , Date = ?
			
			String querySelect=QueryConstants.DAILY_EXP_REPORT_UPDATE;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCategoryName());
			preparedStmt.setString(3,json.getUserName());
			preparedStmt.setString(4,json.getAmount());
			preparedStmt.setString(5,json.getDate());
			preparedStmt.setString(6,json.getId());
			preparedStmt.setString(7,json.getOldCategoryName());
			preparedStmt.setString(8,json.getOldUserName());
			preparedStmt.setString(9,json.getOldAmount());
			preparedStmt.setString(10,json.getOldDate());
			preparedStmt.setString(11,json.getCompanyId());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}


	/*
	 * FUNCTION FOR DISPLAYING MONTHLY REPORT DETAILS
	 */
	public static ArrayList<ExpenseReportJSON> MonthlyReport(ExpenseReportJSON json) {
		Connection connection=null;
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.MONTHLY_EXP_REPORT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				ExpenseReportJSON dailyExpense=new ExpenseReportJSON();
				dailyExpense.setId(rs.getString("expenseId"));
				dailyExpense.setCategoryName(rs.getString("categoryName"));
				dailyExpense.setUserName(rs.getString("UserName"));
				dailyExpense.setAmount(rs.getString("Amount"));
				dailyExpense.setDate(rs.getString("Date"));
				dailyExpenseList.add(dailyExpense);
				
			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dailyExpenseList;

	}

	/*
	 * FUNCTION FOR DISPLAYING YEARLY REPORT DETAILS
	 */
	public static ArrayList<ExpenseReportJSON> YearlyReport(ExpenseReportJSON json) {
		Connection connection=null;
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.YEARLY_EXP_REPORT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getYear());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				ExpenseReportJSON dailyExpense=new ExpenseReportJSON();
				dailyExpense.setId(rs.getString("expenseId"));
				dailyExpense.setCategoryName(rs.getString("categoryName"));
				dailyExpense.setUserName(rs.getString("UserName"));
				dailyExpense.setAmount(rs.getString("Amount"));
				dailyExpense.setDate(rs.getString("Date"));
				dailyExpenseList.add(dailyExpense);
				
			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dailyExpenseList;

	}

	/*
	 * FUNCTION FOR DISPLAYING DATE WISE REPORT DETAILS
	 */
	public static ArrayList<ExpenseReportJSON> DateWiseReport(ExpenseReportJSON json) {
		Connection connection=null;
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DATE_WISE_EXP_REPORT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				ExpenseReportJSON dailyExpense=new ExpenseReportJSON();
				dailyExpense.setId(rs.getString("expenseId"));
				dailyExpense.setCategoryName(rs.getString("categoryName"));
				dailyExpense.setUserName(rs.getString("UserName"));
				dailyExpense.setAmount(rs.getString("Amount"));
				dailyExpense.setDate(rs.getString("Date"));
				dailyExpenseList.add(dailyExpense);
				
			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dailyExpenseList;
	}

}